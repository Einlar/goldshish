# Vulcan Verify Email
A vulcan package that handles email verification

---
Updates on this branch:

adds user to a verifiedEmail group, so you can check easily in Vulcan apps if the user email is indeed verified. Without this, it looks like you have to mess around with Meteor to check if the user is verified (`user.emails[0].verified;` ), like this:

```
const user = await Meteor.users.findOne({ _id: userId });

const verified = user.emails[0].verified;
        if (verified) {
          await addUserToGroup(user)
          return 2
        }
```

Added a resendVerification graphql endpoint thing. If the link has expired, this can be use to trigger a new email verification sent to them. (this is used in my updated VerifyEmail component)

If the current logged in user has already verified their email, the component will add the user to the verifiedEmail group automatically

There's some parts of it that are tied to my app, like tailwind.css and my header component, so just added it as a new branch for now (edited)

---
## How it works

Install this package like other vulcan packages. Once it's installed, it'll send an email verification email to new members that sign up.

This is triggered in `/lib/modules/parameters.js`. It hooks into the user create callback, and uses Accounts package to send the email:

```
async function sendVerificationEmail({ document: user }) {
Accounts.sendVerificationEmail(user._id);
}

addCallback('user.create.async', sendVerificationEmail);
```

When the new member opens the email, they'll find a link that directs to `/verify-email/jaiejgiaerjgpaie`. That `verify-email/key`route is set in the `routes.js`

The component `VerifyEmal.jsx` calls a graphql mutation to check if the email key is valid. See that mutation in `modules/mutations.jsx` - it was pretty much copied form the `AuthPassword.js` in the Vulcan Users package!

## Modify it!

You can modify the mutation to add the user to a new group, such as verifiedMembers. 

The component at the route is just plain text, so you might want to copy that to your own package and customise it so it looks nice.
