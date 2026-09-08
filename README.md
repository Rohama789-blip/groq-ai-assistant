# 🤖 Groq AI Assistant

A modern AI-powered web assistant built with **Python, Flask, and Groq AI**.

## ✨ Features

- 💬 Basic AI Chat
- 📚 RAG Chat using custom knowledge
- ⚡ Fast Groq AI responses
- 🎨 Professional dark UI
- 📱 Responsive design
- 🗑️ Clear conversation
- 🔐 Secure API key configuration

## 🛠️ Technologies

- Python
- Flask
- Groq AI
- HTML5
- CSS3
- JavaScript
- Gunicorn

## 📁 Project Structure

    groq-ai-assistant/
    │
    ├── app.py
    ├── requirements.txt
    ├── .env
    ├── .gitignore
    ├── README.md
    │
    ├── templates/
    │   └── index.html
    │
    ├── static/
    │   ├── style.css
    │   └── script.js
    │
    └── sample_docs/
        └── knowledge.txt

## ⚙️ Installation

Clone the repository:

    git clone https://github.com/YOUR_USERNAME/groq-ai-assistant.git

Go to the project folder:

    cd groq-ai-assistant

Create a virtual environment:

    python -m venv venv

Activate it on Windows:

    venv\Scripts\activate

Install dependencies:

    pip install -r requirements.txt

## 🔑 Environment Variables

Create a `.env` file in the project folder:

    GROQ_API_KEY=your_groq_api_key
    GROQ_MODEL=openai/gpt-oss-20b

Never upload your `.env` file to GitHub.

## ▶️ Run the Application

Start the Flask application:

    python app.py

Then open:

    http://127.0.0.1:5000

## 💬 Basic Chat

Basic Chat allows users to ask general questions and receive AI-powered responses.

Example questions:

- Explain Artificial Intelligence
- What is Machine Learning?
- Give me Python project ideas
- Explain RAG in simple words

## 📚 RAG Chat

RAG Chat answers questions using information from:

    sample_docs/knowledge.txt

You can replace this file with your own:

- Company information
- Course notes
- FAQs
- Project documentation
- Knowledge base

## 🔄 How RAG Works

    User Question
          ↓
    Knowledge Document
          ↓
    Groq AI
          ↓
    AI Response

The assistant uses the provided document as its knowledge source.

## 🌐 Deployment

The application can be deployed online using platforms such as Render.

Production start command:

    gunicorn app:app

Required environment variables:

    GROQ_API_KEY=your_groq_api_key
    GROQ_MODEL=openai/gpt-oss-20b

After deployment, the application can be accessed through a public URL.

## 🔐 Security

- API keys are stored in `.env`
- `.env` is excluded using `.gitignore`
- API keys should never be committed to GitHub

## 🔮 Future Improvements

- 📄 PDF document upload
- 🧠 Vector database integration
- 💾 Chat history
- 👤 User authentication
- 🎤 Voice input
- 🌍 Multi-language support

## 📌 Project Summary

Groq AI Assistant is a Flask-based AI web application that provides fast AI conversations and document-based question answering through RAG.

Built with **Python + Flask + Groq AI 🤖**

---

