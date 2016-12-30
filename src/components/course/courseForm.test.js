import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import CourseForm from './CourseForm';

const setup = (saving) => {
    const props = {
        course: {}, saving: saving, errors: {},
        onSave: () => {},
        onChange: () => {}
    }

    return shallow(<CourseForm {...props} />);
}

describe('CourseForm', () => {
    it('should render form and h1', () => {
        const wrapper = setup(false);

        expect(wrapper.find('form').length).toBe(1);
    });

    it('should label the save button with "Save" when not saving', () => {
        const wrapper = setup(false);
        expect(wrapper.find('input').props().value).toBe('Save');
    });

    it('should label the save button with "Saving..." when saving', () => {
        const wrapper = setup(true);
        expect(wrapper.find('input').props().value).toBe('Saving...');
    });
});
