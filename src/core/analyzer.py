import os
import cv2
import time
import numpy as np
import threading
from datetime import datetime

from deepface import DeepFace
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

from src.config import Config
from firebase_config import emotion_ref


class EmotionAnalyzer:

    def __init__(self):

        # DeepFace model
        self.deepface_model = "emotion"

        # Custom FER model
        self.custom_model = None
        self.load_custom_model()

        # Emotion state
        self.current_emotion = "neutral"
        self.emotion_probs = {
            e: 0.0 for e in Config.EMOTIONS
        }

        # Thread safety
        self.lock = threading.Lock()

        # Runtime control
        self.running = False
        self._analysis_running = False

        # Firebase upload control
        self.previous_emotion = None
        self.last_upload_time = 0

        # Upload cooldown (seconds)
        self.upload_interval = 5

        # Confidence threshold
        self.confidence_threshold = 0.60

    def load_custom_model(self):

        try:

            if os.path.exists(Config.MODEL_PATH):

                self.custom_model = load_model(
                    Config.MODEL_PATH,
                    compile=False
                )

                print("✅ Custom FER Model Loaded.")

            else:

                print(
                    f"⚠️ Custom model not found at "
                    f"{Config.MODEL_PATH}. Using DeepFace only."
                )

        except Exception as e:

            print(f"❌ Error loading custom model: {e}")

    def start(self):
        self.running = True

    def stop(self):
        self.running = False

    def analyze(self, face_img):

        if not self.running:
            return

        # Prevent thread flooding
        if self._analysis_running:
            return

        threading.Thread(
            target=self._analyze_thread,
            args=(face_img,),
            daemon=True
        ).start()
    def _analyze_thread(self, face_img):

        self._analysis_running = True

        try:

            # Validate image
            if face_img is None or face_img.size == 0:
                return

            final_probs = {}

            if self.custom_model:

                roi = cv2.resize(face_img, (48, 48))

                roi = roi.astype("float32") / 255.0

                roi = img_to_array(roi)

                roi = np.expand_dims(roi, axis=0)

                preds = self.custom_model.predict(
                    roi,
                    verbose=0
                )[0]

                final_probs = {
                    label: float(prob)
                    for label, prob in zip(
                        Config.EMOTIONS,
                        preds
                    )
                }

            else:

                try:

                    result = DeepFace.analyze(
                        face_img,
                        actions=['emotion'],
                        enforce_detection=False,
                        silent=True
                    )

                    if isinstance(result, list):

                        result = result[0]

                    emotion_data = result.get(
                        "emotion",
                        {}
                    )

                    final_probs = {
                        k.lower(): float(v) / 100.0
                        for k, v in emotion_data.items()
                    }

                except Exception as e:

                    print(
                        f"❌ DeepFace analysis error: {e}"
                    )

                    return

            if not final_probs:
                return

            dominant_emotion = max(
                final_probs,
                key=final_probs.get
            )

            confidence = final_probs[
                dominant_emotion
            ]

            # Ignore weak predictions
            if confidence < self.confidence_threshold:
                return

            # Stabilize emotions
            if confidence < 0.70:
                dominant_emotion = "neutral"

            # Update shared state
            with self.lock:

                self.emotion_probs = final_probs
                self.current_emotion = dominant_emotion
            current_time = time.time()

            should_upload = (
                dominant_emotion != self.previous_emotion
                and current_time - self.last_upload_time
                > self.upload_interval
            )

            # Avoid neutral spam
            if (
                dominant_emotion == "neutral"
                and self.previous_emotion == "neutral"
            ):
                should_upload = False

            if should_upload:

                data = {
                    "emotion": dominant_emotion,
                    "confidence": round(
                        float(confidence),
                        3
                    ),
                    "time": datetime.now().isoformat()
                }

                try:

                    emotion_ref.push(data)

                    print(
                        "✅ Uploaded to Firebase:",
                        data
                    )

                    self.previous_emotion = (
                        dominant_emotion
                    )

                    self.last_upload_time = (
                        current_time
                    )

                except Exception as firebase_error:

                    print(
                        "❌ Firebase Upload Error:",
                        firebase_error
                    )

        except Exception as e:

            print(f"❌ Analysis Error: {e}")

        finally:

            self._analysis_running = False

    def get_results(self):

        with self.lock:

            return (
                self.current_emotion,
                self.emotion_probs
            )