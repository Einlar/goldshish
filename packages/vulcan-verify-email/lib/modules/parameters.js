import { Accounts } from 'meteor/accounts-base';
import { addCallback } from 'meteor/vulcan:core';

async function sendVerificationEmail({ document: user }) {
Accounts.sendVerificationEmail(user._id);
}

addCallback('user.create.async', sendVerificationEmail);