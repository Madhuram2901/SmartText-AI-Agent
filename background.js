chrome.runtime.onInstalled.addListener(() => {
chrome.contextMenus.create({
    id: "toneConverter",
    title: "Convert Tone",
    contexts: ["selection"]
});
});
chrome.contextMenus.onClicked.addListener((info) => {
if (info.menuItemId === "toneConverter" && info.selectionText) {
    chrome.storage.local.set({ selectedText: info.selectionText });
    chrome.action.openPopup();
}
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
if (message.action === "textSelected") {
    chrome.storage.local.set({ selectedText: message.text });
}
});