import { S3Collections } from '../modules';
import { addToFragmentMatcher, addCallback } from 'meteor/vulcan:core';

function AddS3FragmentMatcher() {
  addToFragmentMatcher({
    kind: 'UNION',
    name: 'S3',
    possibleTypes: S3Collections.map(collection => ({name: collection.options.collectionName}))
  });
  return {};
}
addCallback('apolloclient.init.before', AddS3FragmentMatcher);
