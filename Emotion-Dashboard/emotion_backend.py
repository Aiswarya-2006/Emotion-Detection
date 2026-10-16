"""
emotion_backend.py
------------------
Sample Python backend to push emotion detections to Firebase Realtime Database.
Install dependencies:
  pip install firebase-admin

Replace YOUR_SERVICE_ACCOUNT_KEY.json with your downloaded Firebase service account key.
Replace YOUR_DATABASE_URL with your Firebase Realtime Database URL.
"""

import firebase_admin
from firebase_admin import credentials, db
import datetime
import random
import time

# --- Firebase Init ---
cred = credentials.Certificate("YOUR_SERVICE_ACCOUNT_KEY.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com"
})

EMOTIONS = ["happy", "sad", "angry", "neutral", "surprise", "fear", "disgust"]

def push_emotion(emotion: str, confidence: float):
    ref = db.reference("emotions")
    ref.push({
        "emotion": emotion,
        "confidence": round(confidence, 4),
        "time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })
    print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] Pushed: {emotion} ({confidence:.2%})")

# --- Simulated loop (replace with your real AI model output) ---
if __name__ == "__main__":
    print("EmotionAI backend running... Pushing to Firebase every 2s")
    while True:
        emotion = random.choice(EMOTIONS)
        confidence = random.uniform(0.55, 0.99)
        push_emotion(emotion, confidence)
        time.sleep(2)
