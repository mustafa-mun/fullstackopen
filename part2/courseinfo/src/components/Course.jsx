const Header = (props) => <h2>{props.course}</h2>;

const Content = (props) => {
  return (
    <>
      {props.parts.map((item, index) => {
        return (
          <Part
            key={index}
            part={item.name}
            exerciseCount={item.exercises}
          ></Part>
        );
      })}
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

const Total = (props) => {
  let sum = props.parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <>
      <strong>total of {sum} exercises</strong>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      {course.map((item, index) => {
        return (
          <div key={index}>
            <Header course={item.name}></Header>
            <Content parts={item.parts}></Content>
            <Total parts={item.parts}></Total>
          </div>
        );
      })}
    </>
  );
};

export default Course;
