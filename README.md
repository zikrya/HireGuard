# HireVault

## Overview
HireGuard is a Chrome extension that helps users verify the legitimacy of job offers and recruiter communications. It leverages artificial intelligence to analyze job-related emails and provides feedback on potential red flags. This detective-themed tool is designed to be engaging and informative, making it a valuable asset for job seekers aiming to avoid scams.

## Features
- **AI-Powered Email Analysis:**  Utilizes OpenAI's GPT models to intelligently evaluate the content of job offers and recruiter emails.
- **Real-Time Results:** Delivers immediate feedback on the legitimacy of emails, with detailed notes on suspicious elements.

## Tech Stack
- **JavaScript/Express** for backend logic and API fetching
- **HTML/CSS** for frontend design
- **OpenAI GPT-3.5 Turbo** for AI integration and email content analysis

## Installation Instructions
### Prerequisites
- Google Chrome Browser
- Basic knowledge of Chrome's developer settings.
- Node.js
### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/zikrya/HireGuard.git
2. Navigate to chrome://extensions/ in Google Chrome.
3. Click on Load unpacked and select the directory where you cloned HireGuard.

### How to Use
1. Open the Extension: Click on the HireGuard icon in the Chrome toolbar after installation.
2. Enter Email Content: Copy and paste the content of a job offer or recruiter email into the textarea provided in the popup.
3. Analyze: Click the Legit Check? button to start the analysis. The extension processes the input and displays potential red flags and an overall legitimacy score.
4. View Results: Results are displayed directly below the input area in the form of easy-to-understand notes and indicators.

### Backend Implemnetaion
1. Install Node.js and npm.
2. Run the follow commands
   ```bash
   npm install
   npm start
