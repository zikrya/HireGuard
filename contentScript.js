let selectionEnabled = false;

// Listen for clicks to select text if selection mode is enabled
document.addEventListener('click', function(event) {
    if (selectionEnabled) {
        event.preventDefault();
        event.stopPropagation();
        const selectedText = event.target.innerText;
        chrome.storage.local.set({selectedText: selectedText});  // Save the selected text in local storage
        selectionEnabled = false; // Disable selection mode after the text is selected
        alert("Text selected. Reopen the extension to see it.");
    }
});

// Listen for messages from the popup to enable selection mode
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "enableSelection") {
        selectionEnabled = true;
        alert("Selection mode enabled: Click on the text you want to select.");
    }
});