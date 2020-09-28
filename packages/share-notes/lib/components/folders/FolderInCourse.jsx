import React, { Component } from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import Form from 'react-bootstrap/Form';

import isString from 'lodash/isString';
import PropTypes from 'prop-types';

function getNested(obj, ...args) {
    return args.reduce((obj, level) => obj && obj[level], obj)
}

class FolderInCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {courseId: "", folderId: getNested(this.props, 'document', 'folderId') || ""};
    }

    update = (data) => {
        this.state.folderId = data;

        this.context.updateCurrentValues({ [this.props.path]: data });
    };

    render () {
        const noneOption = {
            label: 'Select a folder',
            value: '',
            disabled: true,
          };
        let otherOptions =
        Array.isArray(this.props.options) && this.props.options.length
            ? this.props.options
            : [];

        const options = [noneOption, ...otherOptions];
        
        const courseId = (isString(getNested(this.props, 'currentValues', 'courseId'))) ? this.props.currentValues.courseId : "";

        //Update courseId
        if (courseId != this.state.courseId) {
            this.state.courseId = courseId;
            this.update(""); //Reset current folder
        }

        console.log("Current courseId", courseId);

        console.log("gotted: ", options);
        return (
            <div className="form-group row editor">
                <label className="control-label col-sm-3">{this.props.label}</label>
                <div className="col-sm-9">
                    <Components.FormItem>
                        <Form.Control as="select" value={this.state.folderId} onChange={(event) => this.update(event.target.value)}>
                            { 
                                options.map( (item, key) => { 
                                    const { group, label, courseid, ...rest } = item;
                                    return (<option key={key} {...rest} style={ (courseid === courseId || courseId === "") ? { display: "block" } : { display: "none" } }>{label}</option>);
                                    }
                                )
                            }
                        </Form.Control>
                    </Components.FormItem>
                </div>
            </div>
        );
    }
};

{/* style={ (courseid === courseId || courseId === "") ? { display: "block" } : { display: "none" } } */}

FolderInCourse.contextTypes = {
    updateCurrentValues: PropTypes.func,
};

registerComponent({ name: 'FolderInCourse', component: FolderInCourse });

export default FolderInCourse;