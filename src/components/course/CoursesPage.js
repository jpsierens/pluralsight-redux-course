import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends Component {
    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }
    render() {
        const {courses} = this.props;
        return(
            <div className="container-fluid">
                <h1>Courses</h1>
                <input
                type="submit"
                value="Add Course"
                className="btn btn-primary"
                onClick={() => browserHistory.push('/course')} />

                <CourseList courses={courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

// if you dont pass mapDispatchToProps, the dispatcher function
// from the store gets passed on to the component (i.e. CoursesPage)
export default connect(mapStateToProps)(CoursesPage);
