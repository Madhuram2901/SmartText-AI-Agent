How to Use the SmartText AI Chrome Extension
Prerequisites
  •	Google Chrome browser
  •	Python 3 installed on your system
  •	Ollama installed and running with the mistral model (or your preferred LLM)
  •	All project files downloaded to your computer
________________________________________

1. Setup
A. Start the Local AI Server
  1.	Install Python dependencies (if not already):
    pip install -r requirements.txt

2. Start Ollama (in a separate terminal):

    ollama serve
    If the mistral model isn’t installed, run:
        ollama pull mistral

3. Run the mistral model:
    ollama run mistral

4.	Run the Flask server:
    python server.py



You should see:
* Running on http://localhost:5000/
________________________________________
B. Load the Extension in Chrome
1.	Open Chrome and go to chrome://extensions/
2.	Enable Developer mode (top right)
3.	Click Load unpacked
4.	Select the folder containing your extension files (where manifest.json is located)
________________________________________
2. Using the Extension
1.	Select any text on a webpage.
2.	Right-click and choose Convert Tone from the context menu, or use the floating SmartText popup if it appears.
3.	The SmartText popup will display your selected text.
4.	Choose a tone (Formal, Casual, Funny, Professional) or enter a custom instruction.
5.	Wait a few moments—the rewritten text will appear in the popup.
6.	Click Apply to use the rewritten text, or copy it as needed.
________________________________________
3. Troubleshooting
•	"Error converting text."
Ensure both the Flask server and Ollama are running.
•	No response or connection refused:
Confirm that port 5000 is free and your firewall allows local connections.
•	Still having issues?
Check the browser console (press F12) and your terminal for error messages.
________________________________________
4. Security & Privacy
•	All text processing happens locally on your computer.
•	No data is sent to the cloud.

