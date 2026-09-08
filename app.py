
import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from groq import Groq

# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
KNOWLEDGE_FILE = "sample_docs/knowledge.txt"


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)


# =========================================================
# GROQ CLIENT
# =========================================================

if not API_KEY:
    raise ValueError(
        "GROQ_API_KEY is missing. Please add it to your .env file."
    )

client = Groq(api_key=API_KEY)


# =========================================================
# LOAD KNOWLEDGE FILE
# =========================================================

def load_knowledge():

    if not os.path.exists(KNOWLEDGE_FILE):
        return ""

    try:

        with open(
            KNOWLEDGE_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return file.read()

    except Exception as error:

        print("Knowledge file error:", error)

        return ""


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():

    return render_template("index.html")


# =========================================================
# CHAT API
# =========================================================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No data received."
            }), 400


        message = data.get("message", "").strip()

        mode = data.get(
            "mode",
            "basic"
        )


        if not message:

            return jsonify({
                "error": "Message cannot be empty."
            }), 400


        # =================================================
        # BASIC CHAT
        # =================================================

        if mode == "basic":

            messages = [

                {
                    "role": "system",
                    "content": (
                        "You are a helpful, intelligent and friendly "
                        "AI assistant. Give clear, accurate and useful "
                        "answers. Explain difficult concepts simply. "
                        "Use proper formatting when useful."
                    )
                },

                {
                    "role": "user",
                    "content": message
                }

            ]


        # =================================================
        # RAG CHAT
        # =================================================

        elif mode == "rag":

            document = load_knowledge()


            if not document:

                return jsonify({
                    "error": (
                        "Knowledge file was not found or is empty."
                    )
                }), 404


            messages = [

                {
                    "role": "system",
                    "content": (
                        "You are a document-based AI assistant. "
                        "Answer the user's question using ONLY "
                        "the information provided in the document. "
                        "Do not invent or assume information. "
                        "If the answer is not available in the "
                        "document, clearly say that the information "
                        "is not available in the provided document."
                    )
                },

                {
                    "role": "user",
                    "content": (
                        f"DOCUMENT:\n\n"
                        f"{document}\n\n"
                        f"QUESTION:\n"
                        f"{message}"
                    )
                }

            ]


        else:

            return jsonify({
                "error": "Invalid chat mode."
            }), 400


        # =================================================
        # GROQ REQUEST
        # =================================================

        response = client.chat.completions.create(

            model=MODEL,

            messages=messages,

            temperature=0.3,

            max_tokens=2048

        )


        reply = response.choices[0].message.content


        return jsonify({

            "reply": reply,

            "mode": mode,

            "model": MODEL

        })


    except Exception as error:

        print("Groq Error:", error)

        return jsonify({

            "error": str(error)

        }), 500


# =========================================================
# CLEAR CHAT
# =========================================================

@app.route("/clear", methods=["POST"])
def clear():

    return jsonify({

        "success": True,

        "message": "Conversation cleared."

    })


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )
