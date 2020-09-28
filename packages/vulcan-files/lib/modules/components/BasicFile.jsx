/*
Display a single file
*/
import React, { PureComponent } from 'react';
import { Components } from 'meteor/vulcan:lib';
import isString from "lodash/get";

class BasicFile extends PureComponent {
  clearFile = e => {
    e.preventDefault();
    this.props.clearFile(this.props.index);
  };

  render() {
    const { removeMessage = 'remove', document, name, index, value } = this.props;

    //Find a way to load the "resolverName" programmatically
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '16px' }}>
          {
            isString(value) ? name : (typeof _.find(document.files, (d) => d._id == value) !== 'undefined' ? _.find(document.files, (d) => d._id == value).name : name)
          } 
          </span>
        <a href="javascript:void(0)" onClick={this.clearFile}>
          {removeMessage}
        </a>
      </div>
    );
  }
}

export default BasicFile;
