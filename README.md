# Wildlife Conflict Index Tracker

A modern web application built with React, Vite, and Chart.js to help wildlife experts evaluate conflict indicators across various districts. 

## Features
- **Dynamic Survey Interface**: Allows experts to rate indicators (0-5) across Spatial, Management, Environmental, Economic, Social, and Tourism domains.
- **Index Calculation Engine**: Automatically calculates the weighted index for each district based on expert responses.
- **Analytics Dashboard**: Visualizes the aggregated results using beautiful, color-coded Chart.js bar graphs.
- **Serverless Data Storage**: Configured for Firebase Firestore (with LocalStorage fallback if not yet configured).

## How to Run Locally

### 1. Install Dependencies
Make sure you have Node.js installed. Open a terminal in this folder and run:
```bash
npm install
```

### 2. Start the Development Server
Run the following command:
```bash
npm run dev
```

### 3. Open in Browser
The terminal will display a local URL. Because this project is configured for GitHub Pages deployment under the repository name, the URL will contain the base path. Open your browser to:

[http://localhost:5174/wildlife-conflict-index/](http://localhost:5174/wildlife-conflict-index/)
*(or whichever port the terminal output specifies, commonly 5173 or 5174)*

## Firebase Configuration (Optional)
To persist data across different devices securely and for free:
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Copy `.env.example` to `.env.local` and fill in your app's credentials.
3. Restart the `npm run dev` server.
