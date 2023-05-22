

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getSelectedText") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
            console.log(tab);
            chrome.tabs.sendMessage(tab[0].id, { action: "getSelectedText" });
        });
    }
});
