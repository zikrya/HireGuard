document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('analyzeButton').addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: () => document.body.innerText
        }, async (results) => {
          if (chrome.runtime.lastError || !results || !results.length) {
            console.error('Script execution failed:', chrome.runtime.lastError);
            return;
          }

          const pageText = results[0].result;
          document.getElementById('textInput').value = pageText;
          console.log("Text fetched: ", pageText);

          // Here, make the API call
          const response = await fetch('https://api.openai.com/v1/engines/gpt-4/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'sk-proj-lXArUT5esqOGMf7nvdvJT3BlbkFJET4Bp3ZVdh12x7fm6qTj'  // Replace YOUR_API_KEY_HERE with your actual OpenAI API key
            },
            body: JSON.stringify({
              prompt: pageText,  // Or format your prompt with specific instructions
              max_tokens: 150
            })
          });
          const data = await response.json();
          console.log(data);
          document.getElementById('result').textContent = data.choices[0].text.trim();
        });
      });
    });
  });