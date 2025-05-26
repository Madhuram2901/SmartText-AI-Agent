// CSS for the in-page popup
const popupStyles = `
/* Variables */
:root {
    --primary: #0071E3; /* Apple blue - slightly darker for better contrast */
    --secondary: #30B94D; /* Apple green - adjusted for legibility */
    --accent: #FF6D00; /* Apple orange - more vibrant */
    --light: #F5F5F7; /* Apple light gray background */
    --lighter: #FFFFFF; /* Pure white */
    --dark: #1D1D1F; /* Apple dark */
    --text: #1D1D1F; /* Text color - darker for better contrast */
    --text-secondary: #86868B; /* Apple secondary text */
    --border: #BD8C44; /* Gold/bronze border color */
    --button-bg: #E8E8ED; /* Button background - darker than light background */
    --shadow: rgba(0, 0, 0, 0.1);
    --border-radius: 8px; /* Apple-like rounded corners */
}

/* Popup Container */
.style-popup {
    position: absolute;
    z-index: 10000;
    background-color: transparent;
    will-change: left, top;
}

.style-popup.hidden {
    display: none;
}

/* Popup Content */
.popup-content {
    background: var(--lighter);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
    width: 380px;
    max-width: 95vw;
}

/* Popup Header */
.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    cursor: grab;
    user-select: none;
}

.popup-header:active {
    cursor: grabbing;
}

/* Popup Title */
.popup-title {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.01em;
    margin: 0;
}

/* Close Button */
.close-btn {
    background: none;
    border: none;
    color: var(--text);
    font-size: 1.6rem;
    cursor: pointer;
    padding: 0 8px;
    border-radius: 50%;
    line-height: 1;
}

.close-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

/* Text Display Area */
.text-display {
    background-color: var(--light);
    border-radius: var(--border-radius);
    padding: 12px;
    margin-bottom: 12px;
    min-height: 60px;
    max-height: 120px;
    overflow-y: auto;
    border: 1px solid var(--border);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.95rem;
    line-height: 1.4;
    color: var(--text);
}

.text-display:hover {
    background-color: #E2E2E7;
}

/* Input Section */
.input-section {
    margin-bottom: 15px;
}

.style-input {
    width: 100%;
    padding: 12px;
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    background-color: var(--lighter);
    outline: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.9rem;
    color: var(--text);
    box-sizing: border-box;
    transition: all 0.2s ease;
}

.style-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
    transition: all 0.2s ease;
}

/* Style Buttons */
.style-buttons {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
}

.style-btn {
    padding: 8px 14px;
    border-radius: 18px;
    border: none;
    background-color: var(--button-bg);
    color: var(--text);
    cursor: pointer;
    flex-grow: 1;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.style-btn:hover {
    background-color: #DCDCE1;
    color: var(--text);
    transform: scale(1.02);
}

.style-btn.active {
    background-color: var(--primary);
    color: white;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 113, 227, 0.3);
}

.apply-btn {
    background-color: var(--primary) !important;
    color: white !important;
    margin-top: 12px;
    width: 100%;
    font-weight: 600;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 113, 227, 0.25);
}
`;

// Create popup element
let popup = null;

// Initialize popup if it doesn't exist
function createPopup() {
  if (popup) return;
  
  // Create the popup HTML structure
  popup = document.createElement('div');
  popup.className = 'style-popup hidden';
  popup.innerHTML = `
    <div class="popup-content">
      <div class="popup-header">
        <h2 class="popup-title">SmartText</h2>
        <button class="close-btn">&times;</button>
      </div>
      
      <div class="text-display" id="convertedText"></div>
      
      <div class="input-section">
        <input type="text" class="style-input" id="style-input" placeholder="Type your custom instruction here...">
      </div>
      
      <div class="style-buttons">
        <button class="style-btn" data-tone="formal">Formal</button>
        <button class="style-btn" data-tone="casual">Casual</button>
        <button class="style-btn" data-tone="funny">Funny</button>
        <button class="style-btn" data-tone="professional">Professional</button>
      </div>
    </div>
  `;
  
  // Inject styles
  const style = document.createElement('style');
  style.textContent = popupStyles;
  document.head.appendChild(style);
  
  // Add Google Fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=Cormorant+Garamond&family=Montserrat:wght@400;500&display=swap';
  document.head.appendChild(fontLink);
  
  // Add popup to page
  document.body.appendChild(popup);
  
  setupPopupEventListeners();
}

// Set up all the event listeners for the popup
function setupPopupEventListeners() {
  if (!popup) return;
  
  const header = popup.querySelector('.popup-header');
  const closeBtn = popup.querySelector('.close-btn');
  const styleInput = popup.querySelector('#style-input');
  const convertedText = popup.querySelector('#convertedText');
  
  // Draggable functionality
  let isDragging = false;
  let offsetX, offsetY;
  
  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - popup.getBoundingClientRect().left;
    offsetY = e.clientY - popup.getBoundingClientRect().top;
    
    header.style.cursor = 'grabbing';
    e.preventDefault(); // Prevent text selection during drag
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
    if (header) {
      header.style.cursor = 'grab';
    }
  });
  
  // Close button
  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });
  
  // Style buttons
  popup.querySelectorAll('.style-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('apply-btn')) return;
      
      // Remove active class from all buttons
      popup.querySelectorAll('.style-btn').forEach(btn => {
        if (!btn.classList.contains('apply-btn')) {
          btn.classList.remove('active');
        }
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      
      let tone = button.getAttribute('data-tone');
      const text = selectedTextContent;
      
      if (!text) {
        convertedText.textContent = "No text selected.";
        return;
      }
      
      // Show loading state
      convertedText.textContent = "Processing...";
      
      fetch('http://localhost:5000/convert-tone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text, tone: tone })
      })
      .then(res => res.json())
      .then(data => {
        convertedText.textContent = data.result;
        resultText = data.result; // Store for replacement
        addApplyButton();
      })
      .catch(err => {
        convertedText.textContent = "Error converting text.";
        console.error('Error:', err);
      });
    });
  });
  
  // Custom instruction input
  styleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const customInstruction = styleInput.value.trim();
      
      if (!customInstruction) return;
      
      const text = selectedTextContent;
      
      if (!text) {
        convertedText.textContent = "No text selected.";
        return;
      }
      
      // Show loading state
      convertedText.textContent = "Processing...";
      
      fetch('http://localhost:5000/convert-tone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: text, 
          tone: 'custom',
          customInstruction: customInstruction 
        })
      })
      .then(res => res.json())
      .then(data => {
        convertedText.textContent = data.result;
        resultText = data.result; // Store for replacement
        // Clear the input
        styleInput.value = '';
        addApplyButton();
      })
      .catch(err => {
        convertedText.textContent = "Error converting text.";
        console.error('Error:', err);
      });
    }
  });
}

// Add apply button if not already present
function addApplyButton() {
  if (popup && !popup.querySelector('.apply-btn')) {
    const buttonsContainer = popup.querySelector('.style-buttons');
    if (buttonsContainer) {
      const applyBtn = document.createElement('button');
      applyBtn.className = 'style-btn apply-btn';
      applyBtn.textContent = 'Apply';
      buttonsContainer.appendChild(applyBtn);
      
      applyBtn.addEventListener('click', () => {
        if (selectedRange && resultText) {
          selectedRange.deleteContents();
          selectedRange.insertNode(document.createTextNode(resultText));
          
          // Hide popup after applying
          popup.classList.add('hidden');
        }
      });
    }
  }
}

// Store the selected text and range for later use
let selectedTextContent = '';
let selectedRange = null;
let resultText = null;

// Listen for text selection
document.addEventListener('mouseup', (e) => {
  // Don't process if we're clicking inside our popup
  if (popup && (e.target === popup || popup.contains(e.target))) {
    return;
  }
  
  const selection = window.getSelection();
  selectedTextContent = selection.toString().trim();
  
  if (selectedTextContent) {
    // Store the range for later replacement
    selectedRange = selection.getRangeAt(0);
    
    // Create popup if it doesn't exist
    createPopup();
    
    // Position the popup to the right of the selection
    const rect = selectedRange.getBoundingClientRect();
    
    // Calculate available space to the right
    const availableRightSpace = window.innerWidth - (rect.right + window.scrollX);
    const popupWidth = 380; // Width of our popup
    
    // Determine if we have enough space on the right
    if (availableRightSpace >= popupWidth + 20) { // 20px buffer
      // Position to the right with a 10px gap
      popup.style.left = (rect.right + window.scrollX + 10) + 'px';
      popup.style.top = (rect.top + window.scrollY) + 'px';
    } else {
      // Not enough space on right, position below
      popup.style.left = (rect.left + window.scrollX) + 'px';
      popup.style.top = (rect.bottom + window.scrollY + 10) + 'px';
    }
    
    // Show the popup
    popup.classList.remove('hidden');
    
    // Update the text display with selected text
    const textDisplay = popup.querySelector('.text-display');
    if (textDisplay) {
      textDisplay.textContent = selectedTextContent;
    }
    
    // Save selected text to chrome storage for the popup
    chrome.runtime.sendMessage({ 
      action: "textSelected", 
      text: selectedTextContent 
    });
  }
});

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "applyResult") {
    if (selectedRange) {
      selectedRange.deleteContents();
      selectedRange.insertNode(document.createTextNode(message.result));
    }
  }
});