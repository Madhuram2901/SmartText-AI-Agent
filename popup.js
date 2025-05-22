document.addEventListener('DOMContentLoaded', () => {
  const styleInput = document.getElementById('style-input');
  const convertedText = document.getElementById('convertedText');
  
  // Add apply button to the UI
  function addApplyButton() {
    if (!document.querySelector('.apply-btn')) {
      const buttonsContainer = document.querySelector('.style-buttons');
      const applyBtn = document.createElement('button');
      applyBtn.className = 'style-btn apply-btn';
      applyBtn.textContent = 'Apply';
      buttonsContainer.appendChild(applyBtn);
      
      // Add event listener to apply button
      applyBtn.addEventListener('click', () => {
        const result = convertedText.textContent;
        if (result && result !== 'No text selected.' && result !== 'Processing...') {
          chrome.runtime.sendMessage({ action: "applyResult", result: result });
        }
      });
    }
  }
  
  // Retrieve selected text from storage when popup opens
  chrome.storage.local.get(['selectedText'], (data) => {
    if (data.selectedText) {
      convertedText.textContent = data.selectedText;
    } else {
      convertedText.textContent = "No text selected.";
    }
  });
  
  // Style buttons
  document.querySelectorAll('.style-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      document.querySelectorAll('.style-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      
      let tone = button.getAttribute('data-tone');
      chrome.storage.local.get(['selectedText'], (data) => {
        if (!data.selectedText) {
          convertedText.textContent = "No text selected.";
          return;
        }
        
        // Show loading state
        convertedText.textContent = "Processing...";
        
        fetch('http://localhost:5000/convert-tone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: data.selectedText, tone: tone })
        })
        .then(res => res.json())
        .then(data => {
          convertedText.textContent = data.result;
          addApplyButton();
        })
        .catch(err => {
          convertedText.textContent = "Error converting text.";
          console.error('Error:', err);
        });
      });
    });
  });
  
  // Custom instruction input
  styleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const customInstruction = styleInput.value.trim();
      
      if (!customInstruction) return;
      
      chrome.storage.local.get(['selectedText'], (data) => {
        if (!data.selectedText) {
          convertedText.textContent = "No text selected.";
          return;
        }
        
        // Show loading state
        convertedText.textContent = "Processing...";
        
        fetch('http://localhost:5000/convert-tone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: data.selectedText, 
            tone: 'custom',
            customInstruction: customInstruction 
          })
        })
        .then(res => res.json())
        .then(data => {
          convertedText.textContent = data.result;
          // Clear the input
          styleInput.value = '';
          addApplyButton();
        })
        .catch(err => {
          convertedText.textContent = "Error converting text.";
          console.error('Error:', err);
        });
      });
    }
  });
});