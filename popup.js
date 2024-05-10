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

  document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const userInput = document.getElementById('userInput').value;
        const data = {
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userInput }
            ]
        };
        fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json().catch(() => ({ error: "Failed to parse JSON response" })))
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert(data.error);
            } else {
                alert(JSON.stringify(data));
            }
        })
        .catch(error => console.error('Error:', error));
    });
});