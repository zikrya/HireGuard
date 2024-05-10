document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: () => document.body.innerText
        }, (results) => {
            if (chrome.runtime.lastError || !results || !results.length) {
                console.error('Script execution failed:', chrome.runtime.lastError);
                return;
            }

            const pageText = results[0].result;
            document.getElementById('userInput').value = pageText;
            console.log("Text fetched: ", pageText);
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
