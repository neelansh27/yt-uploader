# YT-Uploader

A web application built with the MERN stack that allows users to schedule uploads to YouTube. The app also uses AI to automatically generate titles, descriptions, and tags for scheduled videos.

## Features

* Schedule YouTube video uploads for a future time.
* AI-powered generation of video metadata:
  * Description
  * Tags
* User authentication and secure sessions.
* Frontend interface for creating, scheduling, viewing uploads.
* Backend services handling YouTube API interactions, scheduling tasks, and AI generation.

---

## Tech Stack

* **Frontend**: React with TypeScript
* **Backend**: Node.js, Express with TypeScript
* **Database**: MongoDB
* **AI Service**: Gemini For generation of description and tags
* **YouTube API**: For uploading and scheduling videos
* **Authentication & Sessions**: OAuth 2.0 + secure session handling

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js (>= 18)
* npm or yarn
* MongoDB (local or remote)
* YouTube API credentials (OAuth client ID and secret)
* API key for the AI model

### Installation

Clone the repo:

```bash
git clone https://github.com/neelansh27/yt-uploader.git
cd yt-uploader
```

Install dependencies for both frontend and backend:

```bash
# backend
cd backend
npm install

# frontend
cd ../frontend
npm install
```

### Configuration

Create a `.env` file in the **backend** directory with the following variables:

```env
OAUTH_CLIENT_ID=your_youtube_oauth_client_id
OAUTH_CLIENT_SECRET=your_youtube_oauth_client_secret
MODEL_API_KEY=your_ai_model_api_key
FRONTEND_URL=http://localhost:3000
MONGO_URL=your_mongodb_url
SESSION_SECRET=your_secure_random_string
```

* `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` are obtained from the Google Cloud Console (YouTube Data API).
* `MODEL_API_KEY` is the key for your AI provider.
* `FRONTEND_URL` is the URL where the frontend is running
* `MONGO_URL` is your MongoDB connection string.
* `SESSION_SECRET` is a random secure string for session encryption.

### Running the App

In separate terminals:

```bash
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start
```

The backend should be available at **[http://localhost:3000](http://localhost:3000)** and frontend at **[http://localhost:5173](http://localhost:5173)** (or configured port).

---

## Usage

1. Log in with your Google account (OAuth).
2. Upload or schedule a new YouTube video.
3. Let the AI automatically generate tags and description.
4. The backend handles the scheduled upload to YouTube.
5. View and manage your scheduled uploads in the dashboard.

---

## Project Structure

```
├── backend
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── src
│   │   ├── config
│   │   ├── index.ts
│   │   ├── lib
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routers
│   │   └── services
│   ├── tsconfig.json
│   └── types
│       └── express
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   └── src
│      ├── App.css
│      ├── App.tsx
│      ├── assets
│      ├── components
│      ├── context
│      ├── index.css
│      ├── main.tsx
│      └── vite-env.d.ts
└── README.md
```

---
## Contributing

* Fork the repository
* Create a feature branch — git checkout -b feature/YourFeature
* Make your changes
* Ensure code is tested and linted
* Submit a Pull Request
