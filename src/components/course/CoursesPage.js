import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createCourse } from '../../actions/courseActions';

class CoursesPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: { title: '' }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }
    onClickSave() {
        // injected from connect
        const { dispatch } = this.props;
        const { course } = this.state;
        dispatch(createCourse(course));
    }
    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({ course: course });
    }
    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }
    render() {
        return(
            <div className="container-fluid">
                <h1>Courses</h1>

                {this.props.courses.map(this.courseRow)}

                <h2>Add Course</h2>
                <input
                type="text"
                onChange={this.onTitleChange}
                value={this.state.course.title} />

                <input
                type="submit"
                value="Save"
                onClick={this.onClickSave} />
            </div>
        );
    }
}

CoursesPage.PropTypes = {
    children: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

// if you dont pass mapDispatchToProps, the dispatcher function
// from the store gets passed on to the component (i.e. CoursesPage)
export default connect(mapStateToProps)(CoursesPage);
