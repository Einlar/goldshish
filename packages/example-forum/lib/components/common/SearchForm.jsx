import { registerComponent, Components, Utils } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { intlShape } from 'meteor/vulcan:i18n';
import { withRouter, Link } from 'react-router';

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function() {
  var timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      pathname: props.router.location.pathname,
      search: props.router.location.query.query || '',
    };
  }

  // note: why do we need this?
  componentWillReceiveProps(nextProps) {
    this.setState({
      search: this.props.router.location.query.query || '',
    });
  }

  search(e) {
    const value = e.target.value;
    const router = this.props.router;
    const routerQuery = _.clone(router.location.query);
    delete routerQuery.query;

    const query = value === '' ? routerQuery : { ...routerQuery, query: value };
    this.setState({ search: value });

    delay(() => {
      // only update the route if the path hasn't changed in the meantime
      if (this.state.pathname === router.location.pathname) {
        router.push({ pathname: Utils.getRoutePath('posts.list'), query: query });
      }
    }, 700);
  }

  render() {
    const resetQuery = _.clone(this.props.location.query);
    delete resetQuery.query;

    return (
      <div className="search-form">
        <Components.FormElement>
          <Components.FormComponentText
            inputProperties={{
              name: 'searchQuery',
              value: this.state.search,
              placeholder: this.context.intl.formatMessage({ id: 'posts.search' }),
              type: 'text',
              layout: 'elementOnly',
              onChange: this.search,
            }}
          />
          {this.state.search !== '' ? (
            <Link className="search-form-reset" to={{ pathname: '/', query: resetQuery }}>
              <Components.Icon name="close" />
            </Link>
          ) : null}
        </Components.FormElement>
      </div>
    );
  }
}

SearchForm.contextTypes = {
  intl: intlShape,
};

registerComponent({ name: 'SearchForm', component: SearchForm, hocs: [withRouter] });
