from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/convert-tone', methods=['POST'])
def convert_tone():
    data = request.json
    text = data['text']
    tone = data['tone']

    # Create the prompt for Mistral
    prompt = f"Rewrite this text in a {tone} tone: {text}, and also keep it concise. Avoid writing /n in the output text"

    # Send request to Ollama's API
    ollama_url = "http://localhost:11434/api/generate"
    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }
    response = requests.post(ollama_url, json=payload)

    if response.status_code == 200:
        result = response.json().get('response', 'Error: No response from model')
        return jsonify({'result': result})
    else:
        return jsonify({'error': 'Failed to connect to Mistral model'}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=5000)