const Header = (props) => {
    return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
    return (<p>
        {props.name} {props.exercise}
    </p>);
};

const Content = (props) => {
    return (<div>
        {props.courseparts.parts.map((part) => {
            return (<Part
                key={new Date() + part.name}
                name={part.name}
                exercise={part.exercises}
            />);
        })}
    </div>);
};


const Total = (props) => {
    const initVal = 0;
    let sum = props.courseparts.parts.reduce((acc, curr) => acc + curr.exercises, initVal);

    return <b>Total number of exercises is {sum}</b>;
};


const Course = (courses) => {

    return (<div>
        {courses.course.map((course) => {
            return (<div key={course.id}>
                <Header course={course}/>
                <Content courseparts={course}/>
                <Total courseparts={course}/>
            </div>)
        })}
    </div>)
}
export default Course