# AI Meal Planning Agent

**Authors:** Yassine Aichi & Ionut Diaconu

A multi-agent AI system for personalized meal planning and nutrition optimization, built with Google's Gemini API and a modular pipeline architecture.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [User Profiles](#user-profiles)
- [Testing](#testing)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Project Structure](#project-structure)

---

## Overview

This project implements an intelligent meal planning system that generates personalized weekly meal plans based on nutritional goals, budget constraints, and dietary preferences. The system uses a multi-agent architecture where specialized AI agents collaborate to evaluate, select, and schedule meals.

### Key Highlights

- **Multi-Agent Pipeline**: Four specialized agents work together (Nutritionist, Budget, Curator, Scheduler)
- **Real-Time Pricing**: Scrapes prices from Belgian supermarkets (Carrefour, Colruyt, Albert Heijn, Delhaize)
- **Natural Language Input**: Accepts both structured requests and conversational input
- **Predefined Profiles**: Ready-to-use profiles for students, athletes, families, and more
- **Full Observability**: Prometheus metrics, structured logging, and distributed tracing

---

## Features

### Multi-Agent System

| Agent | Responsibility |
|-------|----------------|
| **NutritionistAgent** | Evaluates meals for calorie balance, protein content, and macro distribution |
| **BudgetAgent** | Scores meals against weekly budget constraints with household size scaling |
| **RecipeCuratorAgent** | Uses LLM to intelligently select optimal meals based on combined scores |
| **SchedulerAgent** | Builds weekly meal plans and generates consolidated shopping lists |

### Nutrition Evaluation

- Calorie range optimization (400-700 kcal per meal)
- Protein content validation (minimum 25g per meal)
- Carbohydrate and fat limit checks
- Overall nutritional balance scoring (0.0 - 1.0)

### Budget Management

- Weekly budget allocation to daily limits
- Real-time ingredient pricing from supermarkets
- Household size scaling for cost calculations
- Cost-to-budget ratio scoring


### Recipe Selection

- Weighted scoring: Nutrition (40%) + Budget (60%)
- LLM-powered intelligent selection based on user preferences
- Automatic fallback to tool-based selection if LLM fails
- Dietary restriction and allergy filtering

### Weekly Scheduling

- 7-day meal distribution
- Breakfast, lunch, and dinner slot assignment
- Consolidated shopping list generation
- Total weekly cost calculation

### Input Methods

1. **Structured Request** - Explicit parameters (calories, budget, preferences)
2. **Natural Language** - Conversational input matched to profiles
3. **Profile-Based** - Predefined user profiles for quick planning

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FastAPI Server                           │
├─────────────────────────────────────────────────────────────────┤
│                         API Routes                              │
│  /plan  /plan/natural  /plan/profile  /profiles  /health        │
├─────────────────────────────────────────────────────────────────┤
│                        MainAgent                                │
│                  (Orchestration Layer)                          │
├─────────────────────────────────────────────────────────────────┤
│                    Agent Pipeline                               │
│  ┌──────────────┐  ┌──────────────┐                             │
│  │ Nutritionist │  │    Budget    │  (Parallel Evaluation)      │
│  │    Agent     │  │    Agent     │                             │
│  └──────────────┘  └──────────────┘                             │
│          │                │                                     │
│          └───────┬────────┘                                     │
│                  ▼                                              │
│         ┌──────────────┐                                        │
│         │   Curator    │  (LLM-based Selection)                 │
│         │    Agent     │                                        │
│         └──────────────┘                                        │
│                  │                                              │
│                  ▼                                              │
│         ┌──────────────┐                                        │
│         │  Scheduler   │  (Weekly Plan Generation)              │
│         │    Agent     │                                        │
│         └──────────────┘                                        │
├─────────────────────────────────────────────────────────────────┤
│                     Supporting Services                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                 │
│  │    RAG     │  │   Price    │  │  Logging   │                 │
│  │   System   │  │  Service   │  │  Metrics   │                 │
│  └────────────┘  └────────────┘  └────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Installation

### Prerequisites

- Python 3.11+
- Docker & Docker Compose (for deployment)
- Google Gemini API key

### Setup

1. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or
   .\venv\Scripts\activate   # Windows
   ```

2. **Install dependencies**
   ```bash
   # Production only
   pip install -r requirements.txt

   # Development (includes testing & linting)
   pip install -r requirements-dev.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

   Required variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   DATABASE_URL=postgresql://user:pass@localhost/db
   ```

   Optional variables:
   ```
   REDIS_URL=redis://localhost:6379
   LOG_LEVEL=INFO
   ENABLE_METRICS=true
   ```

---

## Usage

### Run the API Server

```bash
python src/api/main.py
```

The server starts at `http://localhost:8000`

### Example Requests

**Structured Request:**
```bash
curl -X POST http://localhost:8000/api/plan \
  -H "Content-Type: application/json" \
  -d '{
    "daily_calories": 2000,
    "weekly_budget": 50,
    "household_size": 1,
    "dietary_restrictions": ["vegetarian"],
    "preferences": ["quick meals", "high protein"]
  }'
```

**Natural Language:**
```bash
curl -X POST http://localhost:8000/api/plan/natural \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I am a student with a tight budget, need quick healthy meals"
  }'
```

**Profile-Based:**
```bash
curl -X POST http://localhost:8000/api/plan/profile \
  -H "Content-Type: application/json" \
  -d '{
    "profile_id": "student_budget"
  }'
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/plan` | POST | Create meal plan from structured request |
| `/api/plan/natural` | POST | Create meal plan from natural language |
| `/api/plan/profile` | POST | Create meal plan using predefined profile |
| `/api/profiles` | GET | List available user profiles |
| `/api/profiles/suggest` | POST | Get profile suggestions for a request (asks user to choose) |
| `/api/ingredient/{name}` | GET | Get ingredient price information |
| `/api/recipe/cost` | POST | Calculate recipe cost from ingredients |
| `/api/health` | GET | Health check endpoint |
| `/metrics` | GET | Prometheus metrics endpoint |

API documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## User Profiles

| Profile ID | Target Audience | Daily Calories | Weekly Budget | Key Features |
|------------|-----------------|----------------|---------------|--------------|
| `common_person` | General (default) | 2000 kcal | 80 EUR | Balanced, healthy, variety |
| `student_budget` | Students | 2000 kcal | 50 EUR | Quick, cheap meals |
| `fitness_enthusiast` | Athletes | 2800 kcal | 110 EUR | High protein |
| `vegetarian_single` | Vegetarians | 1800 kcal | 65 EUR | No meat |
| `weight_loss` | Dieters | 1500 kcal | 70 EUR | Low calorie, low carb |

**Note:** The `common_person` profile is used as the default when no specific profile matches your request.

---

## Testing

```bash
# Run all tests
pytest tests/

# Unit tests only (fast, no API calls)
pytest tests/unit/

# Integration tests (requires app running)
pytest tests/integration/

# End-to-end tests (requires real Gemini API key)
pytest -m e2e

# With coverage report
pytest --cov=src tests/
```

### Test Structure

```
tests/
├── unit/                  # Unit tests for individual components
│   ├── test_agent.py     # Agent core tests
│   └── test_tools.py     # Tool class tests
├── integration/           # Integration tests
│   └── test_api.py       # API endpoint tests
└── e2e/                   # End-to-end tests
    └── test_full_flow.py # Full pipeline tests
```

---

## Deployment

### Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f agent

# Stop services
docker-compose down
```

Services started:
- **Agent API** - Port 8000
- **PostgreSQL** - Port 5432
- **Redis** - Port 6379
- **Prometheus** - Port 9090
- **Grafana** - Port 3000

### Docker Only

```bash
# Build image
docker build -t meal-planner-agent .

# Run container
docker run -p 8000:8000 --env-file .env meal-planner-agent
```

---

## Monitoring

### Prometheus Metrics

Available at `/metrics`:
- `agent_requests_total` - Total requests by status and agent type
- `agent_duration_seconds` - Request duration histogram
- `agent_tokens_total` - Token usage by type and model
- `agent_cost_dollars` - API cost tracking
- `agent_active_requests` - Concurrent request gauge
- `llm_calls_total` - LLM API call counter
- `tool_calls_total` - Tool invocation counter

### Grafana Dashboards

Pre-configured dashboard at `deployment/grafana/dashboards/meal-planner.json`

Access Grafana at `http://localhost:3000` (default credentials: admin/admin)

### Structured Logging

JSON-formatted logs with:
- Agent lifecycle events (started, step, completed, failed)
- LLM call tracking
- Tool invocation logging
- Request tracing

---

## Project Structure

```
src/
├── agent/                  # Multi-agent system
│   ├── core.py            # BaseAgent class and LLM utilities
│   ├── main_agent.py      # MainAgent orchestrator
│   ├── nutrition_agent.py # Nutritional evaluation
│   ├── budget_agent.py    # Budget constraint handling
│   ├── curator_agent.py   # Recipe selection with LLM
│   ├── scheduler_agent.py # Weekly schedule building
│   ├── tools.py           # Tool classes for agents
│   └── prompts.py         # Version-controlled prompts
├── api/                    # REST API layer
│   ├── main.py            # FastAPI application
│   ├── routes.py          # API endpoints
│   └── models.py          # Pydantic request/response models
├── scrapers/               # Price data collection
│   ├── base_scraper.py    # Abstract scraper interface
│   ├── ah_scraper.py      # Albert Heijn scraper
│   ├── colruyt_scraper.py # Colruyt scraper
│   ├── carrefour_scraper.py # Carrefour scraper
│   ├── delhaize_scraper.py # Delhaize scraper
│   └── price_service.py   # Price aggregation service
├── rag/                    # Recipe retrieval system
│   └── retriever.py       # RAG implementation
├── monitoring/             # Observability
│   ├── logging.py         # Structured logging
│   ├── metrics.py         # Prometheus metrics
│   └── tracer.py          # Distributed tracing
└── utils/                  # Shared utilities
    └── config.py          # Configuration management
```

---

## Technologies Used

- **LLM Backend**: Google Gemini API
- **Web Framework**: FastAPI + Uvicorn
- **Data Validation**: Pydantic
- **Database**: PostgreSQL + SQLAlchemy
- **Caching**: Redis
- **Vector Store**: ChromaDB (for RAG)
- **Web Scraping**: Selenium + BeautifulSoup
- **Monitoring**: Prometheus + Grafana
- **Logging**: Structlog
- **Containerization**: Docker + Docker Compose

---

## License

This project was developed as part of the Data 6 course at Karel de Grote University College.

---

**Authors:** Yassine Aichi & Ionut Diaconu