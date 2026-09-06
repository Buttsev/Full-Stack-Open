const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.courseparts.parts.map((part) => {
        return (
          <Part
            key={new Date() + part.name}
            name={part.name}
            exercise={part.exercises}
          />
        );
      })}
    </div>
  );
};

const Total = (props) => {
  let sum = 0;
  props.courseparts.parts.forEach((part) => {
    sum += part.exercises;
  });
  return <p>Total number of exercises is {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content courseparts={course} />
      <Total courseparts={course} />
    </div>
  );
};

export default App;
