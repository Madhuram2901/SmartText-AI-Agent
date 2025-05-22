document.addEventListener('mouseup', () => {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      chrome.runtime.sendMessage({ action: "textSelected", text: selectedText });
    }
});
chrome.runtime.onMessage.addListener((message) => {
if (message.action === "displayResult") {
    let range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(message.result));
}
});