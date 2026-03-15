export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  badge?: string;
  link?: string;
  featured?: boolean;
  tech: string[];
  shortDesc: string;
  overview: string;
  highlights: { label: string; value: string }[];
  sections: { heading: string; body: string }[];
  collaborators?: string[];
  course?: string;
}

export const projects: Project[] = [
  {
    slug: "ml-lifecycle",
    title: "Credit Card Fraud Detection",
    subtitle: "Machine Learning Full Lifecycle",
    badge: "Academic",
    tech: ["Python", "scikit-learn", "XGBoost", "SMOTE", "FastAPI", "SHAP", "Jupyter"],
    shortDesc: "An end-to-end ML project covering data prep, model training, evaluation, and deployment — applied to credit card fraud detection on a highly imbalanced real-world dataset.",
    overview: "This project implements a full machine learning lifecycle for detecting fraudulent credit card transactions. It follows an end-to-end workflow from problem definition through data preparation, modelling, evaluation, and deployment — all documented across structured Jupyter notebooks. The core challenge was dealing with extreme class imbalance: only 0.17% of transactions are fraudulent.",
    highlights: [
      { label: "Dataset", value: "284,807 transactions" },
      { label: "Fraud rate", value: "~0.17%" },
      { label: "Best model", value: "Random Forest + SMOTE" },
      { label: "ROC AUC", value: "0.9721" },
      { label: "PR AUC", value: "0.8375" },
      { label: "F1 Score", value: "0.834" },
    ],
    sections: [
      {
        heading: "The Problem",
        body: "Credit card fraud detection is a classic imbalanced classification problem. With only 0.17% fraud cases, a naive model that predicts everything as legitimate achieves 99.8% accuracy but catches no fraud at all. The goal was to build a model that maximises recall (catching real fraud) while keeping precision high enough to avoid overwhelming fraud analysts with false positives.",
      },
      {
        heading: "Approach & Lifecycle",
        body: "The project is structured across 7 notebooks, each covering a distinct phase: problem definition, data understanding, exploratory analysis, preprocessing, model training, evaluation, and deployment. Features V1–V28 are PCA-transformed, which limits interpretability but simplifies preprocessing. SMOTE was applied to oversample the minority class during training, which significantly improved recall on the test set.",
      },
      {
        heading: "Model Comparison",
        body: "Four models were compared — Logistic Regression, Random Forest, XGBoost, and a Dummy Classifier baseline. Random Forest with SMOTE came out on top with ROC AUC of 0.9721 and a PR AUC of 0.8375. XGBoost without resampling was a close second. SHAP was used post-hoc to interpret feature importance despite the PCA-transformed inputs.",
      },
      {
        heading: "Deployment",
        body: "The final model was serialised as a reusable scikit-learn pipeline and served through a FastAPI application with three endpoints: probability prediction, label prediction (threshold-based), and batch prediction. This covered the full lifecycle from raw data to a running API.",
      },
    ],
    collaborators: ["Ionut Diaconu", "Gabriel", "Alex"],
    course: "Data Analysis and Machine Learning (DAI5)",
  },
  {
    slug: "reinforcement-learning",
    title: "Reinforcement Learning Agent",
    subtitle: "Deep RL on MountainCar-v0",
    badge: "Academic",
    tech: ["Python", "Stable Baselines3", "Gymnasium", "DQN", "TensorBoard", "YAML"],
    shortDesc: "Teaching an agent to solve the MountainCar problem using Deep Q-Networks, custom reward shaping, and hyperparameter tuning with Stable Baselines3.",
    overview: "This project implements Deep Reinforcement Learning on the classic MountainCar-v0 environment. A car sits in a valley and must reach the flag on the right hill — but its engine isn't powerful enough to drive straight up. It has to swing back and forth to build momentum first. The default reward is -1 per timestep, which is extremely sparse and makes it very hard for the agent to learn. The project compares a baseline agent against one trained with a custom reward function designed to guide the learning process.",
    highlights: [
      { label: "Environment", value: "MountainCar-v0" },
      { label: "Algorithm", value: "DQN (Deep Q-Network)" },
      { label: "Framework", value: "Stable Baselines3" },
      { label: "Key challenge", value: "Sparse reward problem" },
      { label: "Training runs", value: "3 per configuration" },
      { label: "Extension", value: "Hyperparameter tuning" },
    ],
    sections: [
      {
        heading: "The Challenge",
        body: "The default MountainCar reward gives -1 for every timestep until the goal is reached. With no positive feedback signal, the agent has almost no way to learn the swinging strategy required to build momentum. This makes it one of the harder exploration problems in standard RL benchmarks.",
      },
      {
        heading: "Custom Reward Design",
        body: "To address the sparse reward problem, a custom reward wrapper was built. It combines four signals: a position reward (encouraging rightward progress), a velocity reward (rewarding momentum in either direction), a directional bonus (extra reward for rightward velocity when on the right side), and a height reward based on potential energy. A large goal bonus was added for reaching the target. This gives the agent much richer feedback during training.",
      },
      {
        heading: "Results & Extension",
        body: "The custom reward agent learned the swinging strategy significantly faster than the baseline. An extension experiment then explored hyperparameter tuning — varying the learning rate across multiple runs to study its effect on convergence speed and final performance. TensorBoard was used to visualise training curves across all runs.",
      },
    ],
    collaborators: ["Yassine Aichi", "Ionut Diaconu"],
    course: "Applied Computer Science – Data & AI",
  },
  {
    slug: "sentiment-analysis",
    title: "Aspect-Based Sentiment Analysis",
    subtitle: "Comparing Lexicon, Transformer & LLM approaches",
    badge: "Academic",
    tech: ["Python", "spaCy", "VADER", "HuggingFace", "Ollama", "Mistral 7B", "FastAPI"],
    shortDesc: "A systematic comparison of three ABSA approaches — rule-based lexicon, transformer fine-tune, and a local LLM — on identifying aspect-level sentiment in text.",
    overview: "This project implements and compares three different approaches to Aspect-Based Sentiment Analysis (ABSA): a lexicon-based method using spaCy and VADER, a transformer-based approach using a fine-tuned DeBERTa model via HuggingFace, and an LLM-based approach using Mistral 7B running locally through Ollama. Rather than just classifying overall sentiment, ABSA identifies specific aspects mentioned in a text and determines the sentiment toward each one separately.",
    highlights: [
      { label: "Task", value: "Aspect-Based Sentiment Analysis" },
      { label: "Approaches", value: "3 (Lexicon, Transformer, LLM)" },
      { label: "LLM used", value: "Mistral 7B (local, via Ollama)" },
      { label: "Transformer", value: "DeBERTa v3 base ABSA" },
      { label: "Unified API", value: "All three share the same interface" },
    ],
    sections: [
      {
        heading: "What is ABSA?",
        body: "Standard sentiment analysis tells you whether a text is positive, negative, or neutral overall. Aspect-Based Sentiment Analysis goes further: it identifies the specific aspects being discussed and determines the sentiment toward each one. For example: \"The pizza was delicious but the service was terrible\" → pizza: POSITIVE, service: NEGATIVE. This is much more useful for applications like product review analysis.",
      },
      {
        heading: "The Three Approaches",
        body: "LexiconABSA uses spaCy for dependency parsing to identify aspects, then VADER to score sentiment. It's fast, runs entirely locally, and requires no API. TransformerABSA uses a DeBERTa model fine-tuned specifically for ABSA via the HuggingFace API — more accurate but requires an internet connection and API key. LLMABSA uses Mistral 7B running locally through Ollama, prompted to extract aspect-sentiment pairs in a structured format. It's the most flexible but slowest.",
      },
      {
        heading: "Design Decision: Unified API",
        body: "A key design goal was making all three implementations interchangeable behind a common interface. Every analyzer exposes the same analyze() and analyze_batch() methods and returns the same AspectSentiment dataclass. This made systematic comparison straightforward and would make it easy to swap implementations in a real application.",
      },
    ],
    collaborators: ["Yassine Aichi", "Ionut Diaconu"],
    course: "Applied Computer Science – Data & AI 6",
  },
  {
    slug: "computer-vision",
    title: "Intel Image Classification",
    subtitle: "Deep Learning — Transfer Learning & Grad-CAM",
    badge: "Academic",
    tech: ["Python", "PyTorch", "TorchVision", "ResNet50", "Grad-CAM", "TensorBoard", "scikit-learn"],
    shortDesc: "Scene classification across 6 natural categories using ResNet50 transfer learning, a CNN trained from scratch, and Grad-CAM visualizations — on the Intel Image Classification dataset.",
    overview: "This deep learning project tackles natural scene image classification using the Intel Image Classification dataset from Kaggle. The dataset contains around 14,000 training images and 3,000 test images spread across six categories: buildings, forest, glacier, mountain, sea, and street. The project compares two training strategies — fine-tuning a pre-trained ResNet50 against a CNN built from scratch — and uses Grad-CAM to visualise which regions of each image the model focuses on when making predictions.",
    highlights: [
      { label: "Dataset", value: "Intel Image Classification" },
      { label: "Training images", value: "14,034" },
      { label: "Test images", value: "3,000" },
      { label: "Classes", value: "6 (scene types)" },
      { label: "Base model", value: "ResNet50 (ImageNet)" },
      { label: "Training hardware", value: "Tesla T4 (Colab)" },
    ],
    sections: [
      {
        heading: "The Dataset",
        body: "The Intel Image Classification dataset contains 150×150 RGB images split evenly across six natural scene categories: buildings, forest, glacier, mountain, sea, and street. The dataset is well-balanced across classes — each class has roughly 2,200–2,500 training images and 430–550 test images. Images were resized to 224×224 for ResNet compatibility and normalised using ImageNet mean and standard deviation.",
      },
      {
        heading: "Transfer Learning with ResNet50",
        body: "The primary model is ResNet50 pre-trained on ImageNet. The early convolutional layers were frozen to retain their general feature extraction capability, and the final classification head was replaced with a new layer for 6 classes. A second round of training then unfroze the final ResNet layers for fine-tuning. This approach benefits from over 1 million ImageNet images the model has already learned from, giving a strong head start on natural scene patterns.",
      },
      {
        heading: "CNN from Scratch",
        body: "For comparison, a custom CNN was also built and trained from scratch without any pre-trained weights. This allows direct comparison of how much value transfer learning adds — particularly relevant when working with a dataset of this size. Hyperparameter tuning tested learning rates of 0.0001, 0.001, and 0.01 across both architectures.",
      },
      {
        heading: "Grad-CAM Visualisation",
        body: "Gradient-weighted Class Activation Mapping (Grad-CAM) was applied to the trained ResNet50 to produce heat maps highlighting which regions of each image drove the model's prediction. This makes the model interpretable — you can see that it correctly focuses on sky and ice for glaciers, tree canopy for forests, and road surfaces for street scenes, rather than learning spurious patterns.",
      },
    ],
    collaborators: ["Ionut Diaconu", "Robert", "Fares"],
    course: "Applied Computer Science — Deep Learning",
  },
  {
    slug: "ai-agents",
    title: "AI Meal Planning Agent",
    subtitle: "Multi-agent system with Gemini, FastAPI & real-time pricing",
    badge: "Academic",
    tech: ["Python", "Google Gemini", "FastAPI", "PostgreSQL", "Redis", "ChromaDB", "Docker", "Prometheus", "Selenium"],
    shortDesc: "A multi-agent AI system that generates personalised weekly meal plans based on nutrition goals, budget constraints, and dietary preferences — with live supermarket pricing.",
    overview: "This project implements an intelligent meal planning system using a multi-agent architecture. Four specialised AI agents collaborate in a pipeline: a Nutritionist Agent evaluates meals for calorie and macro balance, a Budget Agent scores options against weekly spend constraints using real-time Belgian supermarket prices, a Curator Agent uses Gemini LLM to make the final selection, and a Scheduler Agent builds the complete weekly plan with a shopping list. The system accepts structured requests, natural language input, or predefined user profiles.",
    highlights: [
      { label: "Architecture", value: "4-agent pipeline" },
      { label: "LLM", value: "Google Gemini API" },
      { label: "Pricing data", value: "Live Belgian supermarkets" },
      { label: "Supermarkets", value: "Carrefour, Colruyt, Albert Heijn, Delhaize" },
      { label: "Input modes", value: "Structured, natural language, profiles" },
      { label: "Observability", value: "Prometheus + Grafana" },
    ],
    sections: [
      {
        heading: "Multi-Agent Architecture",
        body: "The system is built around four agents that run in sequence. The Nutritionist and Budget agents run in parallel to evaluate each meal candidate, then hand off to the Curator agent which uses Gemini to make intelligent selections based on the combined scores and user preferences. Finally, the Scheduler builds the 7-day plan and shopping list. A MainAgent orchestrates the entire pipeline.",
      },
      {
        heading: "Real-Time Supermarket Pricing",
        body: "One of the more interesting parts of this project is the live price scraping from four Belgian supermarkets: Carrefour, Colruyt, Albert Heijn, and Delhaize. Ingredient prices are fetched in real time using Selenium and BeautifulSoup, allowing the Budget Agent to give accurate cost estimates rather than using static data. This makes budget constraints actually meaningful.",
      },
      {
        heading: "RAG for Recipe Retrieval",
        body: "The system uses a RAG (Retrieval-Augmented Generation) setup with ChromaDB as the vector store to retrieve relevant recipes from a knowledge base. This grounds the LLM's suggestions in a real set of recipes rather than generating entirely hallucinated meal plans.",
      },
      {
        heading: "Observability & Deployment",
        body: "The full system runs in Docker Compose with Prometheus metrics and Grafana dashboards for monitoring agent performance, token usage, and API costs. Structured JSON logging tracks every agent step for debugging. The API is documented via Swagger UI.",
      },
    ],
    collaborators: ["Yassine Aichi", "Ionut Diaconu"],
    course: "Data 6 — Karel de Grote University College",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
