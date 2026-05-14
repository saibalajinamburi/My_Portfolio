// projects-data.js
// Projects mapped to ML → MLOps → Agentic AI framework

const projectsData = [
    {
        title: "SupportPulse — Enterprise AI Support Triage Platform",
        category: "ml genai",           // Uses LLMs (Gemma) + ML — classifies as BOTH
        type: "End-to-End MLOps System",
        role: "MLOps & AI Engineer",
        flagship: true,
        cardColor: "blue",
        techStack: [
            { name: "Python", icon: "fab fa-python", color: "#3776AB" },
            { name: "Gemma (LLM)", icon: null, color: "#5C3EE8" },
            { name: "FastAPI", icon: null, color: "#009688" },
            { name: "ChromaDB", icon: null, color: "#FF6F00" },
            { name: "MLflow", icon: null, color: "#0194E2" },
            { name: "Docker", icon: "fab fa-docker", color: "#2496ED" }
        ],
        hasProblem: true,
        problemLabel: "Problem:",
        problemDate: "May 2026 – Present",
        problemText: "Support teams are overwhelmed by duplicate tickets, manual routing errors, and SLA breaches, leading to slow response times and inefficient resource allocation.",
        bullets: [
            "Architected a multi-layer AI system: LLM Cascade for classification, LightGBM for SLA prediction, and ChromaDB for semantic retrieval",
            "Implemented a local-first LLM strategy using Gemma2:2b and Gemma4:e4b fallback to ensure data privacy and high accuracy",
            "Built a production-grade MLOps lifecycle: MLflow tracking, Feast Feature Store, and Great Expectations data validation",
            "Developed real-time observability with Prometheus and Grafana dashboards for latency, throughput, and error monitoring",
            "Established automated CI/CD pipelines via GitHub Actions to build and push Docker containers to GHCR",
            "Deployed a live recruiter demo on Hugging Face Spaces and integrated remote experiment tracking on DagsHub"
        ],
        hasExtraContent: true,
        metrics: [
            { value: "95%", label: "Classification accuracy", positive: true },
            { value: "2ms", label: "Query latency (ChromaDB)", positive: true },
            { value: "38", label: "Automated unit tests", positive: true }
        ],
        githubLink: "https://github.com/saibalajinamburi/SupportPulse",
        viewCodeLink: "https://huggingface.co/spaces/saibalajiomg/SupportPulse",
        dagshubLink: "https://dagshub.com/saibalajinamburi/SupportPulse",
        architectureSummary: "Multi-layer AI triage system: FastAPI routes requests → Gemma LLM Cascade classifies intent → LightGBM predicts SLA breach risk → ChromaDB semantic search retrieves similar past tickets → MLflow + Feast handle experiment tracking & feature storage → Prometheus + Grafana provide real-time observability. Deployed via Docker → GitHub Actions CI/CD → GHCR container registry."
    },
    {
        title: "DentalSolutions — AI-Powered Dental Care App",
        category: "ml",              // CV model + full-stack mobile — purely ML
        type: "Full-stack AI Health Application",
        role: "Lead Developer",
        flagship: false,
        cardColor: "peach",
        techStack: [
            { name: "Flutter", icon: "fab fa-flutter", color: "#02569B" },
            { name: "PHP", icon: "fab fa-php", color: "#777BB4" },
            { name: "MySQL", icon: "fas fa-database", color: "#4479A1" },
            { name: "Python (AI)", icon: "fab fa-python", color: "#3776AB" },
            { name: "TensorFlow", icon: null, color: "#FF6F00" }
        ],
        hasProblem: true,
        problemLabel: "Independent Design:",
        problemDate: "Mar 2024 (Internship)",
        problemText: "Designed and implemented a complex AI-enabled mobile application entirely from scratch based on clinical requirements from dentists.",
        bullets: [
            "Built a patient-doctor engagement platform with appointment booking, doctor search, and WhatsApp integration",
            "Developed an AI-powered module to analyze dental X-ray images and classify results using TensorFlow/Keras",
            "Integrated Flutter mobile frontend with a PHP backend API and MySQL database for real-time data management",
            "Demonstrated full-stack proficiency by managing the entire lifecycle from medical requirements to deployment-ready code"
        ],
        hasExtraContent: true,
        metrics: [
            { value: "Full-stack", label: "E2E implementation", positive: true },
            { value: "Live", label: "Play Store deployment", positive: true }
        ],
        githubLink: "https://github.com/SaiBalaji-N/DentalSolutions_APP",
        viewCodeLink: "https://play.google.com/store/apps/details?id=com.simats.dentalsolutions",
        architectureSummary: "Flutter mobile frontend → REST API (PHP/XAMPP) → MySQL database for appointments & patient records. Python inference server (TensorFlow/Keras) accepts dental X-ray images and returns classification predictions (skin thickness in mm). All components containerised and connected via HTTP, with WhatsApp deep-link integration for direct doctor–patient messaging."
    },
    {
        title: "ResearchIQ — Automated Research Insight Engine",
        category: "ml",              // NLP + MLOps — classical ML / fine-tuning
        type: "NLP & MLOps Pipeline",
        role: "ML Engineer",
        cardColor: "purple",
        techStack: [
            { name: "Python", icon: "fab fa-python", color: "#3776AB" },
            { name: "PyTorch", icon: null, color: "#EE4C2C" },
            { name: "FastAPI", icon: null, color: "#009688" },
            { name: "MLflow", icon: null, color: "#0194E2" },
            { name: "DagsHub", icon: null, color: "#F4812D" }
        ],
        hasProblem: true,
        problemLabel: "Objective:",
        problemDate: "Oct 2024 – Mar 2025",
        problemText: "Automate classification and insight extraction from scientific papers across domains using BERT, RoBERTa & CNNs with full MLOps tracking on DagsHub.",
        bullets: [
            "Developed an end-to-end NLP pipeline for automated classification and summarization of scientific research papers",
            "Implemented multi-model evaluation using BERT, RoBERTa, and custom CNN architectures for domain-specific taxonomy",
            "Built a production-ready API using FastAPI with full Pydantic validation and asynchronous request handling",
            "Configured automated experiment tracking and model registry using MLflow and DagsHub",
            "Deployed interactive UI via Hugging Face Spaces for real-time model inference and paper search"
        ],
        metrics: [
            { value: "94%", label: "F1-score on arXiv dataset", positive: true },
            { value: "Live", label: "Public HF deployment", positive: true }
        ],
        githubLink: "https://github.com/saibalajinamburi/researchiq",
        viewCodeLink: "https://huggingface.co/spaces/saibalajiomg/researchiq",
        dagshubLink: "https://dagshub.com/saibalajinamburi/researchiq/experiments",
        architectureSummary: "arXiv paper ingestion → text preprocessing & tokenisation → multi-model fine-tuning (BERT / RoBERTa / CNN) → MLflow experiment tracking on DagsHub → best model promoted to registry → FastAPI REST inference server → Hugging Face Spaces frontend for interactive classification & search."
    },
    {
        title: "Real-time Market Intelligence Engine",
        category: "ml",              // Financial ML — no LLMs, purely ML
        type: "Financial AI System",
        role: "AI Systems Engineer",
        cardColor: "amber",
        techStack: [
            { name: "Python", icon: "fab fa-python", color: "#3776AB" },
            { name: "Random Forest", icon: null, color: "#F7931E" },
            { name: "VADER (NLP)", icon: null, color: "#4CAF50" },
            { name: "Streamlit", icon: null, color: "#FF4B4B" },
            { name: "BeautifulSoup", icon: null, color: "#607D8B" }
        ],
        hasProblem: true,
        problemLabel: "Critical Fix:",
        problemDate: "Jan 2024 (1 month)",
        problemText: "Eliminated 'Synthetic Data Delusion' and 'Temporal Look-Ahead Bias' by replacing stateless scripts with a stateful ingestion engine and TimeSeriesSplit validation.",
        bullets: [
            "Ingests live market data from CoinGecko and news from CoinTelegraph/CoinDesk via RSS and BeautifulSoup scraping",
            "Implemented a Stateful Accumulation Engine to deduplicate raw articles and build a permanent, organic dataset",
            "Structured relative stationary derivatives (EMA ratios, volatility) to insulate model against absolute market phases",
            "Built a backtesting engine to calculate Max Drawdowns and Strategy Returns compared against a Baseline Hold strategy",
            "Developed explainable ML predictions that convert regression values into narrative risk assessments for users"
        ],
        metrics: [
            { value: "Real-time", label: "News ingestion", positive: true },
            { value: "55%", label: "Realistic Win-Rate", positive: true }
        ],
        githubLink: "https://github.com/saibalajinamburi/Real-time-market-intelligence-engine",
        architectureSummary: "CoinGecko API + BeautifulSoup (CoinTelegraph/CoinDesk) → Stateful Accumulation Engine (dedup + persist) → VADER sentiment extraction → Feature engineering (EMA ratios, volatility, pct returns) → Random Forest with TimeSeriesSplit validation → Backtesting engine (Max Drawdown, Win-Rate vs Baseline Hold) → Streamlit dashboard with explainable narrative predictions."
    },
    {
        title: "Automated Research Paper Classifier",
        category: "ml",              // LightGBM + HF embeddings — ML pipeline
        type: "Automated ML Pipeline",
        role: "ML Developer",
        cardColor: "teal",
        techStack: [
            { name: "Python", icon: "fab fa-python", color: "#3776AB" },
            { name: "LightGBM", icon: null, color: "#2E8B57" },
            { name: "FastAPI", icon: null, color: "#009688" },
            { name: "Docker (GPU)", icon: "fab fa-docker", color: "#2496ED" },
            { name: "MLflow", icon: null, color: "#0194E2" }
        ],
        hasProblem: true,
        problemLabel: "Objective:",
        problemDate: "Feb – Apr 2025",
        problemText: "Build a GPU-accelerated, containerised pipeline that auto-ingests arXiv papers, generates embeddings, classifies them via LightGBM and serves via REST API.",
        bullets: [
            "Built a fully automated MLOps pipeline using arXiv API for data ingestion and Hugging Face Transformers for embeddings",
            "Trained a LightGBM classifier with 75.2% accuracy on quantum domain papers, tracked via MLflow Model Registry",
            "Deployed as a GPU-accelerated REST API using FastAPI and NVIDIA PyTorch CUDA Docker images",
            "Implemented automated CI/CD workflows via GitHub Actions for seamless pipeline integration and quality control"
        ],
        metrics: [
            { value: "75.2%", label: "Pipeline accuracy", positive: true },
            { value: "GPU", label: "Accelerated API", positive: true }
        ],
        githubLink: "https://github.com/saibalajinamburi/Automated-Research-Paper-Classifier",
        architectureSummary: "arXiv Atom API → data_ingestion.py (paginated scraper) → preprocess.py (all-MiniLM-L6-v2, 384-dim embeddings) → X.npy + y.npy → train.py (LightGBM + MLflow tracking) → models/classifier.pkl → FastAPI inference server (app/main.py) → NVIDIA PyTorch CUDA Docker container → GitHub Actions CI/CD pipeline."
    }
];
