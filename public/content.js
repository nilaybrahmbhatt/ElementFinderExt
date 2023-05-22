// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.action === "getSelectedText") {
//         var selectedText = window.getSelection().toString();
//         chrome.runtime.sendMessage({ action: "sendSelectedText", selectedText: selectedText });
//     }
// });

const script = document.createElement('script');
script.src = chrome.runtime.getURL('dist/assets/index.js');
script.async = true;
document.body.appendChild(script);
