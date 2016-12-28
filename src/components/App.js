import React, { Component, PropTypes } from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends Component {
    render() {
        return(
            <div className="container-fluid">
                <Header loading={this.props.loading} />
                { this.props.children }
            </div>
        );
    }
}

App.PropTypes = {
    children: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        loading: state.ajaxCallsInProgress > 0
    }
}

export default connect(mapStateToProps)(App);
