import React, { Component } from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from './ckeditor';
import PropTypes from 'prop-types';

//TODO Add Katex rendering
class Editor extends Component {
    update = (data) => {
        this.context.updateCurrentValues({ [this.props.path]: data });
    };

    render () {
        return (
            <div className="form-group row editor">
                <label className="control-label col-sm-3">{this.props.label}</label>
                <div className="col-sm-9">
                    <CKEditor 
                    editor={ ClassicEditor }
                    data={this.props.value}
                    onChange={ (event, editor) => {
                        const data = editor.getData();
                        this.update(data);
                    } }/>
                </div>
            </div>
        );
    }
}

Editor.contextTypes = {
    updateCurrentValues: PropTypes.func,
};

export default Editor;

