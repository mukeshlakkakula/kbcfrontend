# KBC Game (React + Node.js + Socket.io)

A real-time KBC (Kaun Banega Crorepati) style quiz game built using React on the frontend, Node.js with Express and Socket.io on the backend.

## Features

- Real-time quiz game where players can join and answer multiple-choice questions.
- Socket.io used for real-time communication between players and the server.
- Players are updated with new questions after they submit their answers.
- Displays feedback for wrong answers and moves to the next question upon correct answers.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express, Socket.io
- **Real-time Communication**: Socket.io

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (v12+)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the repository**:

   ```bash
   for Frontend
   git clone https://github.com/mukeshlakkakula/kbcfrontend.git


   for Backend
   git clone https://github.com/mukeshlakkakula/kbcgamecmpassignment.git
   ```

2. **Navigate into the project directory**:

   ``

   ```

   ```

3. **Install dependencies**:

   Navigate into both the frontend and backend directories and install the required npm packages.

   - Backend dependencies (Node.js, Express, Socket.io):

     ```bash
     cd Backend
     npm install
     ```

   - Frontend dependencies (React, Socket.io-client):

     ```bash
     cd ../Frontend
     npm install
     ```

### Running the Application

#### Backend (Server)

1. Navigate to the `Backend` directory:

   ```bash
   cd Backend
   ```

2. Start the server using `nodemon` or `node`:

   ```bash
   nodemon index.js
   ```

   The server should be running on `http://localhost:4000`.

#### Frontend (Client)

1. Navigate to the `Frontend` directory:

   ```

   ```

2. Start the React development server:

   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3001`.

### Game Flow

1. Open the frontend in your browser at `http://localhost:3001`.
2. Enter your name and click "Join" to join the quiz game.
3. Answer the multiple-choice questions as they are presented.
4. Correct answers will move the game to the next question. Incorrect answers will prompt a "Try Again" message.

### Project Structure

```
kbc-game/
├── Backend/              # Backend code for the game (Node.js, Express, Socket.io)
│   ├── index.js          # Main server file
│   └── package.json      # Backend dependencies
├── Frontend/             # Frontend code for the game (React.js)
│   ├── public/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── MobileScreen.js # Quiz game screen component
│   │   └── index.js      # React entry point
│   └── package.json      # Frontend dependencies
└── README.md             # Project README file
```

### Backend (Server) Logic

- **Server (`index.js`)**: The server handles incoming player connections, emits new questions, and processes player answers.

  Key functionalities:

  - Serve quiz questions in real-time.
  - Emit feedback on correct or incorrect answers.
  - Allow new players to join and participate in the game.

### Frontend (Client) Logic

- **MobileScreen (`MobileScreen.js`)**: The main component where the player interacts with the game. It handles:
  - Joining the game.
  - Displaying questions and answer options.
  - Sending the selected answer to the backend.

### Handling CORS

Since the frontend and backend are running on different ports, CORS (Cross-Origin Resource Sharing) is handled using the `cors` middleware in the backend.

The backend is configured to allow requests from `http://localhost:3001` using:

```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
```

### Socket.io Communication

- The server listens for the following events:
  - `joinGame`: Triggered when a new player joins the game.
  - `submitAnswer`: Triggered when a player submits an answer.
- The server emits:
  - `question`: Sends a new question to all players.
  - `correctAnswer`: Broadcasts when a player answers correctly.
  - `wrongAnswer`: Sends feedback when a player answers incorrectly.

### Error Handling

If all questions are answered, a "Game Over" message is sent to all players, as indicated in the backend code:

```js
if (currentQuestionIndex >= questions.length) {
  io.emit("gameOver");
}
```

### Troubleshooting

- **CORS errors**: Ensure that the backend server allows requests from your frontend by properly configuring CORS.
- **Connection issues**: Make sure both the frontend and backend are running on the correct ports (`3001` for the frontend and `5000` for the backend).
