import React from 'react';
import { Components } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';
import MoviesUsers from './MoviesUsers.jsx';
import MoviesMarkAsWatched from './MoviesMarkAsWatched.jsx';

const MoviesApp2 = () => (
  <div className="app-content">
    <div className="movies-app">
      <MoviesUsers />
      <Components.Datatable
        collection={Movies}
        columns={[
          'name',
          'review',
          // Uncomment on #Step18
          // { name: 'isWatched', component: MoviesMarkAsWatched }
        ]}
        // options={{ input: { sort: { name: 'asc' } } }} // uncomment on #Step17
      />
    </div>
  </div>
);

export default MoviesApp2;
