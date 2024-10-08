import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("https://kbcgamecmpassignment.onrender.com/");

const MobileScreen = () => {
  const [playerName, setPlayerName] = useState("");
  const [joined, setJoined] = useState(false);
  const [question, setQuestion] = useState(null);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    socket.on("question", (newQuestion) => {
      setQuestion(newQuestion);
      setMessage("");
    });

    socket.on("wrongAnswer", () => {
      setMessage("Incorrect! Try again.");
    });

    socket.on("gameOver", (completionMessage) => {
      setGameOver(true);
      setMessage(completionMessage);
    });

    return () => {
      socket.off("question");
      socket.off("wrongAnswer");
      socket.off("gameOver");
    };
  }, []);

  const handleJoin = () => {
    if (playerName.trim()) {
      socket.emit("joinGame", playerName);
      setJoined(true);
    } else {
      setMessage("Please enter your name to join.");
    }
  };

  const handleAnswerSubmit = (answer) => {
    socket.emit("submitAnswer", { playerName, answer });
  };

  if (gameOver) {
    return (
      <div className="mobile-screen">
        <h2>{message}</h2>
        <Link to="/">
          <button onClick={() => {}}>Back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mobile-screen">
      {!joined ? (
        <div className="join-screen">
          <h2>Enter your name to join the game:</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleJoin}>Join</button>
          {message && <p className="error-message">{message}</p>}
        </div>
      ) : (
        <div className="question-screen">
          <h2>
            {question
              ? question.question
              : "Due to free hosting on render, the backend is taking time to start for the first time, just wait a moment it will definitely start.Waiting for question..."}
          </h2>
          <div className="options">
            {question && question.options
              ? question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSubmit(option[0])}
                    className="option-button"
                  >
                    {option}
                  </button>
                ))
              : "No options available"}
          </div>
          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default MobileScreen;
