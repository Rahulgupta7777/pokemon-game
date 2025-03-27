import React, { useState, useEffect } from "react";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export default function PokemonTrialGame() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [trialsLeft, setTrialsLeft] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("Select the Pokémon with higher Base Experience!");
  const [gameWon, setGameWon] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  async function fetchRandomPokemon() {
    let id1 = Math.floor(Math.random() * 898) + 1;
    let id2;
    
    do {
      id2 = Math.floor(Math.random() * 898) + 1;
    } while (id1 === id2); // Ensure they are different
    
    const [poke1, poke2] = await Promise.all([
      fetch(API_URL + id1).then((res) => res.json()),
      fetch(API_URL + id2).then((res) => res.json())
    ]);

    setPokemon1(poke1);
    setPokemon2(poke2);
    setMessage("Select the Pokémon with higher Base Experience!");
  }

  function handleSelection(choice) {
    if (!pokemon1 || !pokemon2 || gameOver) return;

    const correct = (pokemon1?.base_experience || 0) > (pokemon2?.base_experience || 0) ? "left" : "right";

    if (choice === correct) {
      setMessage(`✅ Correct! ${pokemon1.name.toUpperCase()}: ${pokemon1.base_experience} XP vs ${pokemon2.name.toUpperCase()}: ${pokemon2.base_experience} XP`);
      
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === 3) {
          setGameWon(true);
          setMessage("🏆 Congratulations! You have won! You are the Pokémon expert! Play Again?");
        }
        return newCount;
      });

      setTrialsLeft((prevTrials) => {
        const newTrials = prevTrials - 1;
        if (newTrials === 0 && count + 1 < 3) {
          setGameOver(true);
          setMessage("💀 Game Over! Click restart to play again.");
        }
        return newTrials;
      });

    } else {
      setTrialsLeft((prevTrials) => {
        const newTrials = Math.max(prevTrials - 1, 0);
        if (newTrials === 0) {
          setGameOver(true);
          setMessage("💀 Game Over! Click restart to play again.");
        } else {
          setMessage(`❌ Wrong! ${pokemon1.name.toUpperCase()}: ${pokemon1.base_experience} XP vs ${pokemon2.name.toUpperCase()}: ${pokemon2.base_experience} XP`);
        }
        return newTrials;
      });
    }

    setTimeout(fetchRandomPokemon, 500); // Small delay before switching Pokémon
  }

  function restartGame() {
    setTrialsLeft(3);
    setGameOver(false);
    setGameWon(false);
    setCount(0);
    fetchRandomPokemon();
  }

  return (
    <div className="game-container">
      <nav className="game-navbar">Pokémon: Trial of Champions</nav>
      <div className="trial-info">Trials Left: {trialsLeft}</div>
      {gameOver ? (
        <div className="game-over">
          <p>{message}</p>
          <button onClick={restartGame} className="restart-button">Restart</button>
        </div>
      ) : gameWon ? (
        <div className="game-won">
          <p>{message}</p>
          <button onClick={restartGame} className="play-again-button">Play Again</button>
        </div>
      ) : (
        <>
          <div className="pokemon-container">
            {pokemon1 && pokemon2 && (
              <>
                <div className="pokemon-card" onClick={() => handleSelection("left")}> 
                  <img src={pokemon1?.sprites?.front_default || ""} alt={pokemon1?.name || "Unknown"} />
                  <p>{pokemon1?.name?.toUpperCase() || "Unknown"}</p>
                </div>
                <p className="vs-text">VS</p>
                <div className="pokemon-card" onClick={() => handleSelection("right")}> 
                  <img src={pokemon2?.sprites?.front_default || ""} alt={pokemon2?.name || "Unknown"} />
                  <p>{pokemon2?.name?.toUpperCase() || "Unknown"}</p>
                </div>
              </>
            )}
          </div>
          <p className="message">{message}</p>
        </>
      )}
    </div>
  );
}
