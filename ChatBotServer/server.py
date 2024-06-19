from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

#"Because of Information Security and OpenAI's privacy policy, we will not show the key here. If you wanna try, please contact with Anh Khoa. Thank you!"
#'My facebook url: https://www.facebook.com/profile.php?id=100014098020695 ' 

