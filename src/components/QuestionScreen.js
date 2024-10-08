import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("https://kbcgamecmpassignment.onrender.com/");

const QuestionScreen = () => {
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("newPlayer", (playerName) => {
      setPlayers((prevPlayers) => [...prevPlayers, playerName]);
    });

    socket.on("correctAnswer", (playerName) => {
      setMessage(`Congratulations ${playerName}! You answered correctly.`);
    });

    socket.on("question", (newQuestion) => {
      setMessage("");
      setQuestion(newQuestion);
    });

    return () => {
      socket.off("newPlayer");
      socket.off("correctAnswer");
      socket.off("question");
    };
  }, []);

  return (
    <div className="main-screen">
      <h1>KBC Style Game</h1>
      <QRCodeSVG value={`${window.location.href}mobile`} size={150} />
      <h3>Scan the QR code to join the game!</h3>
      <div className="players-list">
        <h2>Players:</h2>
        {players.map((player, index) => (
          <p key={index}>{player}</p>
        ))}
        <Link to="/mobile">
          <button>Play</button>
        </Link>
      </div>
      {question && (
        <div className="question-section">
          <h2>{question.question}</h2>
          <div className="options">
            {question.options &&
              question.options.map((option, index) => (
                <button key={index}>{option}</button>
              ))}
          </div>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default QuestionScreen;
