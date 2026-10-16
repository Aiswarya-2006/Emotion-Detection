from firebase_config import emotion_ref

data = {
    "emotion": "happy",
    "confidence": 0.95,
    "time": "test"
}

result = emotion_ref.push(data)

print("Uploaded Successfully")
print(result.key)