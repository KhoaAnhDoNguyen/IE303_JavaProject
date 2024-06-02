from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Khởi tạo API key
openai.api_key = ""
#"Because of Information Security, we will not show the key here. If you wanna try, please contact with Anh Khoa. Thank you!"

@app.route("/chat", methods=["POST"])

def chat():
    data = request.get_json()
    user_input = data.get("message", "").lower()

    # Gọi API ChatGPT 3.5 để xử lý đầu vào của người dùng
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
            {"role": "system", "content": "Your response must be limited to 2 lines."},
            {"role": "system", "content": "Your response must not be rude."},
            {"role": "system", "content": "Your response must be in English or German depending on the language from the query."},
            {"role": "system", "content": "You are a chatbot of Anh Khoa."},
            {"role": "system", "content": "If asked 'Xin chào, bạn là ai', reply 'Xin chào, tôi là ChatBot của Anh Khoa. Tôi có thể giúp gì cho bạn?'."},
            {"role": "system", "content": "If asked 'Hôm nay là ngày bao nhiêu?', reply 'Hôm nay là ngày 2/6.'."},
            {"role": "user", "content": user_input}
        ]
        )
        chatbot_response = response.choices[0].message['content'].strip()
        return jsonify({"response": chatbot_response})

    except openai.error.OpenAIError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
