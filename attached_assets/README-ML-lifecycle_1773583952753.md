# **Credit Card Fraud Detection — Machine Learning Lifecycle Project**

## **Overview**

This project implements a full **machine learning lifecycle** for detecting fraudulent credit card transactions using the [Kaggle Credit Card Fraud Dataset](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud).  
 It follows an end-to-end workflow from **problem definition** through **data preparation, modeling, evaluation, and deployment**, all documented in Jupyter notebooks.

The goal is to build an accurate and explainable fraud detection model while addressing the challenges of **extreme class imbalance** and **limited feature interpretability** (due to PCA transformation).

---

**Dataset not included due to size.**  
 **Original data available at:** [https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)

Place `creditcard.csv` in `/data/` if you wish to retrain the model (Section 5).

---

## **Project Structure**

`fraud_detection_complete_notebook.ipynb      # Full lifecycle notebook (all sections)`  
`notebooks/                                   # Individual notebooks by section`  
`│`  
`├── 1_problem_definition_and_setup.ipynb`  
`├── 2_data_understanding_and_preparation.ipynb`  
`├── 3_exploratory_data_analysis.ipynb`  
`├── 4_data_preprocessing_and_feature_engineering.ipynb`  
`├── 5_model_selection_and_training.ipynb`  
`├── 6_model_evaluation.ipynb`  
`├── 7_deployment_and_conclusion.ipynb`  
`│`  
`data/`  
`├── creditcard.csv                           # Original dataset (optional)`  
`├── section5_final_model.pkl                 # Trained Random Forest + SMOTE model`  
`├── section5_final_summary.csv               # Final model performance summary`  
`├── section5_tuning_summary.csv              # Hyperparameter tuning results`  
`├── section5_model_results_quick.csv         # Baseline model comparison`  
`├── section5_X_train.pkl / section5_X_test.pkl`  
`├── section5_y_train.pkl / section5_y_test.pkl`  
`└── processed/                               # Intermediate preprocessing outputs`

`reports/figures/`  
`├── preprocessing_summary.png`  
`├── amount_analysis.png`  
`├── confusion_matrix.png`  
`├── importance_features.png`  
`├── precision_recall_curve.png`  
`├── shap1.png`  
`└── shap2.png`

`README.md`    
`.gitignore`    
`requirements.txt`    
`app.py                                        # FastAPI deployment script`

---

## **Individual Notebooks Overview**

To make the project easier to navigate, each notebook corresponds to a specific stage in the ML lifecycle.

| Notebook | Description |
| ----- | ----- |
| **1\_problem\_definition\_and\_setup.ipynb** | Introduces the problem, project scope, and configuration setup. |
| **2\_data\_understanding\_and\_preparation.ipynb** | Loads raw data, explores basic statistics, and introduces controlled missingness/outliers. |
| **3\_exploratory\_data\_analysis.ipynb** | Performs EDA — class imbalance, distribution plots, correlation, and V-feature analysis. |
| **4\_data\_preprocessing\_and\_feature\_engineering.ipynb** | Applies scaling, feature transformations, and train/test split. Saves clean data. |
| **5\_model\_selection\_and\_training.ipynb** | Trains multiple models (LogReg, RF, XGB), applies SMOTE, tunes hyperparameters, and saves the final model. |
| **6\_model\_evaluation.ipynb** | Evaluates model performance (ROC/PR curves, confusion matrix, feature importance, SHAP). |
| **7\_deployment\_and\_conclusion.ipynb** | Demonstrates FastAPI deployment and concludes the ML lifecycle with insights and recommendations. |

Each notebook begins with a configuration cell (imports, paths, random seed) and, if needed, loads intermediate `.pkl` files from `/data/processed/` to ensure independence and reproducibility.

---

## **Dataset**

* **Source:** [Kaggle Credit Card Fraud Dataset](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)

* **Size:** 284,807 transactions × 31 columns

* **Target variable:** `Class` (0 \= legitimate, 1 \= fraud)

* **Class imbalance:** \~0.17% fraud cases

**Notes:**

* Features `V1`–`V28` are PCA-transformed; interpretability is limited.

* `Amount` and `Time` are original features retained for analysis.

---

## **Model Summary**

| Model | Sampling | ROC AUC | PR AUC |
| ----- | ----- | ----- | ----- |
| Random Forest | SMOTE | **0.9721** | **0.8375** |
| XGBoost | None | 0.9650 | 0.8343 |
| Logistic Regression | SMOTE | 0.9601 | 0.6875 |
| Dummy Classifier | None | 0.5000 | 0.0017 |

**Final Model:** Random Forest \+ SMOTE  
 **Test Performance:**

* ROC AUC: 0.9721

* PR AUC: 0.8373

* Precision: 0.886

* Recall: 0.788

* F1-Score: 0.834

* Accuracy: 0.9995

---

## **Reproducibility Guide**

### **Option 1 — Quick Reproduction (recommended for grading)**

Create a virtual environment and install dependencies:

 `python -m venv venv`  
`source venv/bin/activate  # or venv\Scripts\activate on Windows`  
`pip install -r requirements.txt`

1. 

Open the notebook:

 `jupyter notebook notebooks/`

2. 

Run **notebooks 1–4 and 6–7** (skip 5 to avoid 10h retraining).  
 The pre-trained model is already stored as:

 `data/section5_final_model.pkl`

3.   
4. All evaluation and plots will load automatically.

### **Option 2 — Full Reproduction (from scratch)**

* Run all notebooks sequentially (1–7).

* Training and tuning (Notebook 5\) take \~8–10 hours on CPU.

* Intermediate artifacts are saved automatically in `/data/processed/`.

---

## **Deployment**

The project includes a **FastAPI-based deployment module** (`app.py`) for real-time prediction.

### **API Overview**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/health` | GET | Health check (`{"status": "ok"}`) |
| `/predict_proba` | POST | Returns the fraud probability for a single transaction |
| `/predict_label` | POST | Returns label and probability (threshold-based) |
| `/predict_label_batch` | POST | Accepts multiple transactions and returns predictions for each |

### **Run Locally**

`uvicorn app:app --reload`

Then visit:  
 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### **Example Input**

`{`  
  `"items": [`  
    `{"V1": -1.23, "V2": 0.45, "V3": 0.67, "Amount": 123.45, "Time": 10000},`  
    `{"V1": 0.56, "V2": -0.98, "V3": 1.12, "Amount": 50.00, "Time": 20000}`  
  `]`  
`}`

---

## **Notes**

* PCA features limit interpretability.

* The full lifecycle (EDA → Modeling → Evaluation → Deployment) is implemented.

* The final Random Forest model is stored as a reusable pipeline (`.pkl`).

* Section 5 was executed once and serialized to save time.

---

## **Limitations & Future Work**

1. PCA-transformed features limit feature-level interpretation.

2. Dataset is static (no time drift captured).

3. Future improvements:

   * Train on raw transaction data with interpretable features.

   * Explore cost-sensitive learning or anomaly detection.

   * Experiment with deep learning models (e.g., autoencoders or GNNs).

---

## **Authors**

* **Ionut**

* **Gabriel**

* **Alex**

Course: *Data Analysis and Machine Learning (DAI5)*
