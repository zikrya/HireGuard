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
        loadingBar.classList.remove('hidden');
        loadingBar.style.width = '0%';

        setTimeout(() => { loadingBar.style.width = '50%'; }, 500);

        const userInput = "Let me know if you think this email about a job offer, or job posting seems legit to you. Please start off with the word Legit (if you think it's alright) or Sounds Suspicious (if you found anything wrong about) and then you can give the reasonings why " + document.getElementById('userInput').value;
        fetch('https://hireguard.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: [{ role: "user", content: userInput }] })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("message").textContent = data.choices[0].message.content;
            loadingBar.style.width = '100%';
            setTimeout(() => { loadingBar.classList.add('hidden'); }, 500);
        })
        .catch(error => {
            console.error('Error:', error);
            loadingBar.classList.add('hidden');
        });
    });
});
