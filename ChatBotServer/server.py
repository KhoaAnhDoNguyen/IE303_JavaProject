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
            {"role": "system", "content": "Your response must be in bullet point format, and limit in 2 points."},
            {"role": "system", "content": "Your response must not be rude."},
            {"role": "system", "content": "Your response must be in Vietnamese."},
            {"role": "system", "content": "You are a chatbot of Anh Khoa."},
            {"role": "system", "content": "If asked 'Xin chào, bạn là ai' or similar questions, reply 'Xin chào, tôi là ChatBot của Anh Khoa. Tôi có thể giúp gì cho bạn?'."},
            {"role": "system", "content": "If asked 'Gợi ý cho tôi 1 vài bộ phim tình cảm về tình cảm gia đình' or similar questions, reply 'Một vài bộ phim hay nói về tình cảm gia đình bạn có thể tham khảo. Ví dụ: \nLật mặt 7, \nNhà bà nữ'."},
            {"role": "user", "content": user_input}
        ]
        )
        chatbot_response = response.choices[0].message['content'].strip()
        return jsonify({"response": chatbot_response})

    except openai.error.OpenAIError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
