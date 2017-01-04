
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

export class ManageCoursePage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false
        }
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.course.id !== nextProps.course.id) {
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }
    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }
    saveCourse(event) {
        event.preventDefault();
        this.setState({saving:true});
        this.props.actions.saveCourse(this.state.course).then(() => {
            this.setState({saving:false});
            toastr.success('Course Saved!');
            browserHistory.push('/courses');
        }).catch(err => {
            toastr.error(err);
            this.setState({saving:false});
        });
    }
    render() {
        return(
            <div>
                <CourseForm
                onSave={this.saveCourse}
                onChange={this.updateCourseState}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
                allAuthors={this.props.authors}/>
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
    const course = courses.filter(c => c.id === id);
    if (course) return course[0];
    return null;
}

// here you can do data transformations to the data coming from the reducer
// to make it usable in the presentational components.
function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;
    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    const authorsFormattedForDropdown = state.authors.map(a => {
        return {value: a.id, text: `${a.firstName} ${a.lastName}`}
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
