import firebase_admin
from firebase_admin import credentials, db

try:
    cred = credentials.Certificate("firebase-key.json")

    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://emotion-detection-d51d2-default-rtdb.firebaseio.com/"
    })

    print("✅ Firebase initialized successfully")

    emotion_ref = db.reference("emotions")

    print("✅ Firebase reference created")

except Exception as e:
    print("❌ Firebase Initialization Error:")
    print(e)