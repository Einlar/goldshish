/*
Display a single file
*/
import React, { PureComponent } from 'react';
import { Components } from 'meteor/vulcan:lib';

class BasicFile extends PureComponent {
  clearFile = e => {
    e.preventDefault();
    this.props.clearFile(this.props.index);
  };

  render() {
    const { removeMessage = 'remove', document, name, index } = this.props;

    //Find a way to load the "resolverName" programmatically
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '16px' }}>
          {
            typeof document.files === 'undefined' ? name : (name || document.files[index].name)
          /* Could cause a memory leak, but whatever */} 
          </span>
        <a href="javascript:void(0)" onClick={this.clearFile}>
          {removeMessage}
        </a>
      </div>
    );
  }
}

export default BasicFile;
