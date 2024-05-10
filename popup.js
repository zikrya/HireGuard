document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let url = tabs[0].url;

        // Create a button for user-driven selection on job board pages
        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select Content';
        document.body.appendChild(selectButton);

        // Show the button only on specified job board pages
        if (url.includes('indeed') || url.includes('linkedin') || url.includes('glassdoor')) {
            selectButton.style.display = 'block';
            selectButton.addEventListener('click', function() {
                chrome.tabs.sendMessage(tabs[0].id, {action: "enableSelection"});
            });
        } else {
            // Automatically extract content for non-job board pages such as emails
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: () => document.body.innerText,
            }, (results) => {
                if (chrome.runtime.lastError || !results || !results.length) {
                    console.error('Script execution failed:', chrome.runtime.lastError);
                    return;
                }
                document.getElementById('userInput').value = results[0].result;
                console.log("Text fetched: ", results[0].result);
            });
        }

        chrome.runtime.onMessage.addListener(function(message) {
            if (message.type === 'selectedText') {
                document.getElementById('userInput').value = message.text;
            }
        });
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const userInput = "Let me know if you think this email about a job offer, or job posting seems legit to you. Please start off with the word Legit (if you think it's alright) or Sounds Suspicious (if you found anything wrong about) and then you can give the reasonings why " + document.getElementById('userInput').value;
        fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: [{ role: "user", content: userInput }] })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("message").textContent = data.choices[0].message.content;
        })
        .catch(error => console.error('Error:', error));
    });
});
