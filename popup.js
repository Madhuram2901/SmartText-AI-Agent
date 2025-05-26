document.addEventListener('DOMContentLoaded', () => {
  const styleInput = document.getElementById('style-input');
  const convertedText = document.getElementById('convertedText');

  // Add Apply button if it doesn't exist
  function addApplyButton() {
    if (!document.querySelector('.apply-btn')) {
      const buttonsContainer = document.querySelector('.style-buttons');
      const applyBtn = document.createElement('button');
      applyBtn.className = 'style-btn apply-btn';
      applyBtn.textContent = 'Apply';
      buttonsContainer.appendChild(applyBtn);

      applyBtn.addEventListener('click', () => {
        const result = convertedText.textContent;
        if (result && result !== 'No text selected.' && result !== 'Processing...') {
          chrome.runtime.sendMessage({ action: "applyResult", result: result });
        }
      });
    }
  }

  // Load selected text from Chrome storage
  chrome.storage.local.get(['selectedText'], (data) => {
    if (data.selectedText) {
      convertedText.textContent = data.selectedText;
    } else {
      convertedText.textContent = "No text selected.";
    }
  });

  // Handle predefined tone buttons
  document.querySelectorAll('.style-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.style-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');

      const tone = button.getAttribute('data-tone');

      chrome.storage.local.get(['selectedText'], (data) => {
        if (!data.selectedText) {
          convertedText.textContent = "No text selected.";
          return;
        }

        convertedText.textContent = "Processing...";

        const payload = {
          text: data.selectedText,
          tone: tone,
          customInstruction: ""
        };

        console.log("Sending to backend:", payload);

        fetch('http://localhost:5000/convert-tone', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(async res => {
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.error || 'Server error occurred');
            }
            return data;
          })
          .then(data => {
            if (data.result) {
              convertedText.textContent = data.result;
              addApplyButton();
            } else if (data.error) {
              convertedText.textContent = `Error: ${data.error}`;
              console.error("API Error:", data.error);
            } else {
              convertedText.textContent = "Unexpected error: Invalid response format";
              console.error("Unexpected response:", data);
            }
          })
          .catch(err => {
            convertedText.textContent = `Error: ${err.message}`;
            console.error("Fetch Error:", err);
          });
      });
    });
  });

  // Handle custom tone via style input
  styleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const customInstruction = styleInput.value.trim();
      if (!customInstruction) return;

      chrome.storage.local.get(['selectedText'], (data) => {
        if (!data.selectedText) {
          convertedText.textContent = "No text selected.";
          return;
        }

        convertedText.textContent = "Processing...";

        const payload = {
          text: data.selectedText,
          tone: 'custom',
          customInstruction: customInstruction
        };

        console.log("Sending to backend:", payload);

        fetch('http://localhost:5000/convert-tone', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(async res => {
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.error || 'Server error occurred');
            }
            return data;
          })
          .then(data => {
            if (data.result) {
              convertedText.textContent = data.result;
              styleInput.value = '';
              addApplyButton();
            } else if (data.error) {
              convertedText.textContent = `Error: ${data.error}`;
              console.error("API Error:", data.error);
            } else {
              convertedText.textContent = "Unexpected error: Invalid response format";
              console.error("Unexpected response:", data);
            }
          })
          .catch(err => {
            convertedText.textContent = `Error: ${err.message}`;
            console.error("Fetch Error:", err);
          });
      });
    }
  });
});
