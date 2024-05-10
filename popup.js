document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('analyzeButton').addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: () => document.body.innerText
        }, (results) => {
          // Check for errors
          if (chrome.runtime.lastError || !results || !results.length) {
            console.error('Script execution failed:', chrome.runtime.lastError);
            return;
          }

          const pageText = results[0].result;

  document.getElementById('textInput').value = pageText;
  console.log("Text fetched: ", pageText);
  });
  });
  });
  });