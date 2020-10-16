import { addRoute } from 'meteor/vulcan:core';

addRoute({name: 'verifyEmail', path: '/verify-email/:token', componentName: 'AccountsVerifyEmail'});

