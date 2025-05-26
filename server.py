from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/convert-tone', methods=['POST'])
def convert_tone():
    try:
        data = request.json
        print("Received JSON:", data)  # 🔍 Print request data

        if not data:
            return jsonify({'error': 'No JSON data received'}), 400

        text = data.get('text')
        tone = data.get('tone')
        custom_instruction = data.get('customInstruction', '')

        if not text:
            return jsonify({'error': 'No text provided'}), 400
        if not tone:
            return jsonify({'error': 'No tone provided'}), 400

        if tone == "custom" and custom_instruction:
            prompt = f"Rewrite this text based on the following instruction: {custom_instruction}. Text: {text}. Keep it concise and avoid line breaks."
        else:
            prompt = f"Rewrite this text in a {tone} tone: {text}. Keep it concise and avoid line breaks."

        print("Sending to Mistral:", prompt)

        try:
            response = requests.post("http://localhost:11434/api/generate", json={
                "model": "mistral",
                "prompt": prompt,
                "stream": False
            })
            response.raise_for_status()
            response_data = response.json()
            print("Response from Mistral:", response_data)
            
            if 'response' not in response_data:
                print("Unexpected response format:", response_data)
                return jsonify({'error': 'Unexpected response format from Ollama'}), 500
                
            return jsonify({'result': response_data['response']})
        except requests.exceptions.RequestException as e:
            print("⚠️ Ollama API Error:", str(e))
            return jsonify({'error': f'Ollama API error: {str(e)}'}), 500
    except Exception as e:
        print("⚠️ Server Error:", str(e))
        return jsonify({'error': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
