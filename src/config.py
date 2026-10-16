class Config:

    CAMERA_ID = 0

    CAMERA_WIDTH = 1280
    CAMERA_HEIGHT = 720

    WINDOW_NAME = "Real-Time Emotion Detection"

    ANALYSIS_THROTTLE = 15

    MODEL_PATH = "fer2013_mini_XCEPTION.102-0.66.hdf5"

    EMOTIONS = [
        "angry",
        "disgust",
        "fear",
        "happy",
        "sad",
        "surprise",
        "neutral"
    ]

    EMOTION_COLORS = {
        "angry": (0, 0, 255),
        "disgust": (0, 128, 0),
        "fear": (128, 0, 128),
        "happy": (0, 255, 255),
        "sad": (255, 0, 0),
        "surprise": (0, 165, 255),
        "neutral": (255, 255, 255)
    }