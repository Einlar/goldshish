import { addStrings, registerLocale } from 'meteor/vulcan:core';

registerLocale({
    id: 'en',
    aliases: ['en_US', 'en_UK'],
    label: 'English',
    domains: ['http://localhost:3000'],
    required:true
});

addStrings('en', {
    'string': 'Translation',
});