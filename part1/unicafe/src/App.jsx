import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good}></StatisticLine>
        <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
        <StatisticLine text="bad" value={props.bad}></StatisticLine>
        <StatisticLine text="all" value={props.all}></StatisticLine>
        <StatisticLine text="average" value={props.average}></StatisticLine>
        <StatisticLine
          text="positive"
          value={props.positivePercentage}
        ></StatisticLine>
      </tbody>
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [positivePercentage, setPostivePercentage] = useState(0);
  const [average, setAverage] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    const updatedAll = all + 1;
    setGood(updatedGood);
    setAll(updatedAll);
    handleAverage(updatedGood, bad, updatedAll);
    handlePositivePercantage(updatedGood, updatedAll);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    const updatedAll = all + 1;
    setBad(updatedBad);
    setAll(updatedAll);
    handleAverage(good, updatedBad, updatedAll);
    handlePositivePercantage(good, updatedAll);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    handlePositivePercantage(good, all + 1);
  };

  const handleAverage = (updatedGood, updatedBad, updatedAll) => {
    const score = updatedGood - updatedBad;
    setAverage(score / updatedAll);
  };

  const handlePositivePercantage = (updatedGood, updatedAll) => {
    const percantage = (updatedGood / updatedAll) * 100;
    setPostivePercentage(percantage);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood}></Button>
      <Button text="neutral" handleClick={handleNeutral}></Button>
      <Button text="bad" handleClick={handleBad}></Button>
      <h1>statistics</h1>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        average={average}
        all={all}
        positivePercentage={positivePercentage}
      ></Statistics>
    </>
  );
}

export default App;
