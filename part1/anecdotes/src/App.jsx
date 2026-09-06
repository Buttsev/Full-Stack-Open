import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const onButtonClicked = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "900px",
        margin: "0 auto",
        gap: "1em",
      }}
    >
      <h2>Anecdote of the day </h2>
      <p style={{ minHeight: "2em", lineHeight: "1em", margin: "0" }}>
        {anecdotes[selected]}
      </p>
      <p style={{ margin: "0" }}>has {votes[selected]} votes</p>

      <div>
        <button
          onClick={() => {
            const copy = [...votes];
            copy[selected] += 1;
            setVotes(copy);
          }}
          style={{ width: "30%", alignSelf: "flex-start" }}
        >
          Vote
        </button>
        <button
          style={{ width: "30%", alignSelf: "flex-start" }}
          onClick={onButtonClicked}
        >
          Next anecdote
        </button>
      </div>

      {Math.max(...votes) === 0 ? (
        <h2>there is no voted anecdote</h2>
      ) : (
        <div>
          <h2>Top rated anecdote</h2>
          <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        </div>
      )}
    </div>
  );
};

export default App;
