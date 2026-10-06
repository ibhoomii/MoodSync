import os
import joblib
import pandas as pd

from datasets import load_dataset
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)
import matplotlib.pyplot as plt
import seaborn as sns


# ============================================================
# 1. LOAD DATASET
# ============================================================

print("Loading Emotion dataset...")

dataset = load_dataset("dair-ai/emotion")

train_df = pd.DataFrame(dataset["train"])
val_df = pd.DataFrame(dataset["validation"])
test_df = pd.DataFrame(dataset["test"])

print("\nDataset loaded successfully!")
print("Training samples:", len(train_df))
print("Validation samples:", len(val_df))
print("Test samples:", len(test_df))


# ============================================================
# 2. LABEL MAPPING
# ============================================================

label_names = [
    "sadness",
    "joy",
    "love",
    "anger",
    "fear",
    "surprise"
]

train_df["emotion"] = train_df["label"].apply(
    lambda x: label_names[x]
)

val_df["emotion"] = val_df["label"].apply(
    lambda x: label_names[x]
)

test_df["emotion"] = test_df["label"].apply(
    lambda x: label_names[x]
)


# ============================================================
# 3. TEXT DATA
# ============================================================

X_train = train_df["text"]
y_train = train_df["emotion"]

X_val = val_df["text"]
y_val = val_df["emotion"]

X_test = test_df["text"]
y_test = test_df["emotion"]


# ============================================================
# 4. TF-IDF FEATURE EXTRACTION
# ============================================================

print("\nCreating TF-IDF features...")

vectorizer = TfidfVectorizer(
    lowercase=True,
    stop_words="english",
    ngram_range=(1, 2),
    max_features=30000,
    sublinear_tf=True
)

X_train_tfidf = vectorizer.fit_transform(X_train)

X_val_tfidf = vectorizer.transform(X_val)

X_test_tfidf = vectorizer.transform(X_test)

print("TF-IDF features created.")
print("Feature count:", len(vectorizer.get_feature_names_out()))


# ============================================================
# 5. TRAIN LOGISTIC REGRESSION
# ============================================================

print("\nTraining Logistic Regression...")

model = LogisticRegression(
    max_iter=1000,
    C=2.0,
    random_state=42
)

model.fit(X_train_tfidf, y_train)

print("Training completed!")


# ============================================================
# 6. VALIDATION
# ============================================================

val_predictions = model.predict(X_val_tfidf)

val_accuracy = accuracy_score(
    y_val,
    val_predictions
)

print("\n==============================")
print("VALIDATION RESULTS")
print("==============================")

print(
    f"Validation Accuracy: {val_accuracy * 100:.2f}%"
)


# ============================================================
# 7. TEST
# ============================================================

test_predictions = model.predict(X_test_tfidf)

test_accuracy = accuracy_score(
    y_test,
    test_predictions
)

print("\n==============================")
print("TEST RESULTS")
print("==============================")

print(
    f"Test Accuracy: {test_accuracy * 100:.2f}%"
)

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        test_predictions,
        target_names=label_names
    )
)


# ============================================================
# 8. CONFUSION MATRIX
# ============================================================

cm = confusion_matrix(
    y_test,
    test_predictions,
    labels=label_names
)

plt.figure(figsize=(8, 6))

sns.heatmap(
    cm,
    annot=True,
    fmt="d",
    xticklabels=label_names,
    yticklabels=label_names
)

plt.title("Emotion Classification Confusion Matrix")

plt.xlabel("Predicted Emotion")

plt.ylabel("Actual Emotion")

plt.tight_layout()

os.makedirs("../models", exist_ok=True)

plt.savefig(
    "models/confusion_matrix.png",
    dpi=300
)

plt.close()

print("\nConfusion matrix saved.")


# ============================================================
# 9. SAVE MODEL
# ============================================================

joblib.dump(
    model,
    "models/emotion_model.pkl"
)

joblib.dump(
    vectorizer,
    "models/tfidf_vectorizer.pkl"
)

print("\nModel saved:")
print("models/emotion_model.pkl")
print("models/tfidf_vectorizer.pkl")

print("\nTraining pipeline completed successfully!")