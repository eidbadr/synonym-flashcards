import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import "./App.css";

interface WordData {
  word: string;
  synonyms: string[];
}

const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState<WordData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showSynonyms, setShowSynonyms] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("de-DE");
  const [displayTime, setDisplayTime] = useState<number>(3000);

  // Helper function to shuffle the words array
  const shuffleArray = (array: WordData[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    fetch("/words.txt")
      .then((response) => response.text())
      .then((text) => {
        const lines = text.split("\n");
        const parsedData: WordData[] = [];
        for (let i = 0; i < lines.length; i += 3) {
          const word = lines[i].trim();
          const synonyms = lines[i + 1]?.trim().split(", ");
          if (word && synonyms) {
            parsedData.push({ word, synonyms });
          }
        }
        setFlashcards(shuffleArray(parsedData)); // Shuffle the flashcards
      });
  }, []);

  useEffect(() => {
    fetch("/config.json")
      .then((response) => response.json())
      .then((config) => {
        setLanguage(config.language || "de-DE");
      });
  }, []);

  const speakWord = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSynonyms((prev) => !prev);
      if (showSynonyms) {
        setCurrentIndex((prevIndex) =>
          prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, displayTime);

    return () => clearInterval(interval);
  }, [showSynonyms, flashcards.length, displayTime]);

  useEffect(() => {
    if (flashcards.length > 0) {
      speakWord(flashcards[currentIndex].word);
    }
  }, [currentIndex, flashcards, language]);

  const currentWord = flashcards[currentIndex];
  const timeLabel = language === "de-DE" ? "Sekunden" : "Seconds";

  return (
    <div className="app">
      <div className="toggle-buttons">
        <button onClick={() => setDisplayTime(2000)} className={displayTime === 2000 ? "active" : ""}>2 {timeLabel}</button>
        <button onClick={() => setDisplayTime(3000)} className={displayTime === 3000 ? "active" : ""}>3 {timeLabel}</button>
        <button onClick={() => setDisplayTime(5000)} className={displayTime === 5000 ? "active" : ""}>5 {timeLabel}</button>
      </div>
      {currentWord && (
        <Flashcard wordData={currentWord} showSynonyms={showSynonyms} />
      )}
    </div>
  );
};

export default App;
