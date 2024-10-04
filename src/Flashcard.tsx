import React from "react";
import { WordData } from "./types";

interface FlashcardProps {
  wordData: WordData;
  showSynonyms: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ wordData, showSynonyms }) => {
  return (
    <div className="flashcard">
      <h1>{wordData.word}</h1>
      {showSynonyms && (
        <p>{wordData.synonyms.join(", ")}</p>
      )}
    </div>
  );
};

export default Flashcard;
