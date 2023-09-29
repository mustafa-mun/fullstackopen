const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p key={props.index}>
        {props.part} {props.exerciseCount}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((item, index) => {
        return (
          <Part
            key={index}
            part={item.part}
            exerciseCount={item.exerciseCount}
          ></Part>
        );
      })}
    </>
  );
};

const Total = (props) => {
  let sum = 0;
  props.parts.forEach((item) => {
    sum += item.exerciseCount;
  });
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        part: "Fundamentals of React",
        exerciseCount: 10,
      },
      {
        part: "Using props to pass data",
        exerciseCount: 7,
      },
      {
        part: "State of a component",
        exerciseCount: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

export default App;
