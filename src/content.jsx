import React from "react";

const content = () => {
  return (
    <>
      <h1>Welcome to the Pokémon Gaming Hub!</h1>
      <div className="hello">
        <img src="/pokemon_town.png" alt="Pokemon Logo" />
        <div className="details">
          <h3>Pokémon: Trial of Champions</h3>
          <p>
            In <em>Pokémon: Trial of Champions</em>, players must prove their
            intuition and knowledge of Pokémon stats in a high-stakes selection
            challenge! Given three trials, the player is presented with two
            randomly chosen Pokémon and must select the one with the higher{" "}
            <strong>Base Experience</strong>.
          </p>

          <h3>Gameplay Mechanics:</h3>
          <ul>
            <li>Each round, two Pokémon appear on the screen.</li>
            <li>
              The player must choose the Pokémon they believe has the higher
              Base Experience.
            </li>
            <li>
              If the player chooses correctly, they advance to the next trial.
            </li>
            <li>
              If the player selects incorrectly, they lose a trial attempt.
            </li>
            <li>
              The game ends when the player either completes all three trials
              successfully or runs out of attempts.
            </li>
          </ul>

          <h3>Win Condition:</h3>
          <ul>
            <li>
              Successfully selecting the higher Base Experience Pokémon in all
            three trials earns the player the title of Pokémon Champion.
            </li>
          </ul>

          <p>
            Can you trust your instincts and claim victory in the{" "}
            <em>Trial of Champions</em>? Try your luck and test your Pokémon
            knowledge now!
          </p>
        </div>
      </div>
    </>
  );
};

export default content;
