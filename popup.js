document.getElementById('analyzeButton').addEventListener('click', function() {
    const userInput = document.getElementById('textInput').value;
    if (!userInput) {
        alert('Please paste the content into the textarea!');
        return;
    }

    // Here you would normally call the API to analyze the text
    console.log("Analyzing: ", userInput);
    document.getElementById('result').innerText = "Analysis complete! (Placeholder result)";
});
