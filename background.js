
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'textSelected') {
        // Store the selected text or handle it as needed
        console.log("Selected Text:", message.text);
    }
});