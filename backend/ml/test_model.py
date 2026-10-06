import joblib

# Load trained model
model = joblib.load("../models/emotion_model.pkl")
vectorizer = joblib.load("../models/tfidf_vectorizer.pkl")

print("MoodSync Emotion Model")
print("======================")
print("Type 'exit' to stop.\n")

while True:

    text = input("Enter a sentence: ")

    if text.lower() == "exit":
        break

    # Convert text to TF-IDF
    text_tfidf = vectorizer.transform([text])

    # Predict emotion
    prediction = model.predict(text_tfidf)[0]

    # Get confidence
    probabilities = model.predict_proba(text_tfidf)[0]
    confidence = max(probabilities)

    print(f"\nEmotion: {prediction.upper()}")
    print(f"Confidence: {confidence * 100:.2f}%\n")