chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getText") {
    var selectedText = window.getSelection().toString();
    chrome.runtime.sendMessage({ action: "updateText", text: selectedText });
  }
});
