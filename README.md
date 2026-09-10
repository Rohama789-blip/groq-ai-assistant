# 🤖 Groq AI Assistant

> A modern AI-powered web assistant built with **Python, Flask, JavaScript, and Groq AI**, featuring both general AI chat and RAG-based question answering.

**🚀 Fast AI · 📚 RAG · 🎨 Modern UI · 📱 Responsive**

---

## 🌐 Live Demo

🚀 **Firebase Hosting:**
`https://grok-project-rk.web.app/`
---

## ✨ Features

* 💬 **Basic AI Chat** — Ask general questions and get AI-powered responses
* 📚 **RAG Chat** — Ask questions using custom knowledge documents
* ⚡ **Fast Responses** powered by Groq AI
* 🎨 **Professional Dark UI**
* 📱 **Responsive Design** for desktop and mobile
* 🗑️ **Clear Conversation** functionality
* 🔐 **Secure API Key Configuration**
* 🧠 **Custom Knowledge Base Support**
* 🌐 **Firebase Hosting Ready**
* 🚀 **Production-ready Flask backend**

---

## 🖥️ Tech Stack

| Technology          | Purpose                   |
| ------------------- | ------------------------- |
| 🐍 Python           | Backend programming       |
| 🌐 Flask            | Web application framework |
| ⚡ Groq AI           | AI inference              |
| 📄 HTML5            | Frontend structure        |
| 🎨 CSS3             | UI styling                |
| ⚙️ JavaScript       | Frontend interaction      |
| 🚀 Gunicorn         | Production server         |
| 🔥 Firebase Hosting | Frontend deployment       |

---

## 📁 Project Structure

```text
groq-ai-assistant/
│
├── app.py
├── requirements.txt
├── .env
├── .gitignore
├── firebase.json
├── .firebaserc
├── README.md
│
├── public/
│   ├── index.html
│   ├── 404.html
│   │
│   └── static/
│       ├── style.css
│       └── script.js
│
└── sample_docs/
    └── knowledge.txt
```

> **Note:** `.env` contains private credentials and should never be uploaded to GitHub.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rohama789-blip/groq-ai-assistant.git
```

### 2. Open the project

```bash
cd groq-ai-assistant
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
```

### 🔐 Security

Never upload your `.env` file to GitHub.

Make sure `.gitignore` contains:

```text
.env
venv/
__pycache__/
*.pyc
```

---

## ▶️ Run the Backend

Start the Flask application:

```bash
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

---

## 💬 Basic AI Chat

The Basic Chat mode allows users to have a general conversation with the AI assistant.

### Example Questions

* Explain Artificial Intelligence
* What is Machine Learning?
* Give me Python project ideas
* Explain RAG in simple words
* What is Data Science?
* How does Flask work?

---

## 📚 RAG Chat

The RAG mode allows the assistant to answer questions using information from a custom knowledge document.

Default knowledge source:

```text
sample_docs/knowledge.txt
```

You can replace the document with your own knowledge base, such as:

* 📖 Course notes
* 🏢 Company information
* ❓ Frequently Asked Questions
* 📋 Project documentation
* 📚 Study material
* 🧠 Custom knowledge

---

## 🔄 How RAG Works

```text
        User Question
              │
              ▼
     Knowledge Document
              │
              ▼
        Relevant Context
              │
              ▼
           Groq AI
              │
              ▼
        AI Generated Answer
```

The assistant uses the provided knowledge source to generate context-aware answers.

---

## 🌐 Deployment

### Frontend — Firebase Hosting

The static frontend is configured for Firebase Hosting.

```bash
firebase login
```

Then deploy:

```bash
firebase deploy
```

Firebase serves the files from:

```text
public/
```

### Backend — Production Server

For production deployment, the Flask backend can be run using Gunicorn:

```bash
gunicorn app:app
```

Required environment variables:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
```

> The Firebase frontend and Flask backend must be connected through the appropriate backend API URL for online AI requests.

---

## 🔐 Security

This project follows basic security practices:

* 🔑 API keys are stored in environment variables
* 🚫 `.env` is excluded from Git
* 🔒 Secret credentials should never be committed
* 🛡️ API credentials should remain private
* 📦 Dependencies are managed through `requirements.txt`

---

## 🚀 Future Improvements

Planned improvements include:

* 📄 PDF document upload
* 🧠 Vector database integration
* 💾 Persistent chat history
* 👤 User authentication
* 🎤 Voice input
* 🌍 Multi-language support
* 📎 Multiple document support
* 🔍 Improved semantic search
* ☁️ Complete cloud deployment

---

## 📌 Project Summary

**Groq AI Assistant** is a Flask-based AI web application designed to provide fast AI conversations and knowledge-based question answering.

It combines:

**Python + Flask + Groq AI + JavaScript + Firebase**

to create a modern AI assistant with both general chat and RAG capabilities.

---
