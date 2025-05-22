document.querySelectorAll('.tone-btn').forEach(button => {
    button.addEventListener('click', () => {
      let tone = button.getAttribute('data-tone');
      chrome.storage.local.get(['selectedText'], (data) => {
        if (!data.selectedText) {
          document.getElementById('convertedText').value = "No text selected.";
          return;
        }
        fetch('http://localhost:5000/convert-tone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: data.selectedText, tone: tone })
        })
        .then(res => res.json())
        .then(data => {
          document.getElementById('convertedText').value = data.result;
          chrome.runtime.sendMessage({ action: "displayResult", result: data.result });
        })
        .catch(err => {
          document.getElementById('convertedText').value = "Error converting text.";
          console.error('Error:', err);
        });
      });
    });
  });