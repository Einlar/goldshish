import { addStrings, registerLocale } from 'meteor/vulcan:core';

registerLocale({
    id: 'en',
    aliases: ['en_US', 'en_UK'],
    label: 'English',
    domains: ['http://localhost:3000', 'http://goldshish.it', 'https://goldshish.it', 'https://www.goldshish.it'],
    required:true
});

addStrings('en', {
    'string': 'Translation',
    'accounts.sign_up' : 'New account',
    'accounts.sign_in' : 'Login'
});