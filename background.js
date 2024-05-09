// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getText") {
      chrome.runtime.sendMessage({type: "textFromPage", text: request.text});
    }
  });