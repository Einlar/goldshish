import { addGraphQLResolvers, addGraphQLMutation, updateMutator } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Accounts } from 'meteor/accounts-base';

//craete customer mutation
addGraphQLMutation('verifyUserEmail(token: String): JSON');
addGraphQLMutation('resendVerification(userId: String): JSON');


const resolver = {
  Mutation: {
    async verifyUserEmail(root, args, context) {

      // if (context && context.userId) {
      //     throw new Error('User already logged in');
      //   }
      const { input } = args;
      const { token } = args;
      if (!token) {
        throw new Error('Empty token');
      }
      var userId = null
      if (context.userId) {
        userId = context.userId
      }
      return await verifyEmail(token, userId);


    },
    async resendVerification(root, args, context) {

      //if there's no user it's always false
      if (!context.currentUser) {
        throw new Error('No user logged in');
        return false
      } else {
        const userId = context.currentUser._id

        const user = await Meteor.users.findOne({ _id: userId });
        if (!(user.emails && user.emails.length)) {
          throw new Error("User email not found, couldn't authenticate after password change");
        }
        const verified = user.emails[0].verified;

        if (verified) {
          await addUserToGroup(user)

          return 2
        }

        if (userId) {
          Accounts.sendVerificationEmail(userId);
          return true
        } else {
          throw new Error('No user id');
          return false
        }

      }

    }

  },
};


addGraphQLResolvers(resolver);


/**
 * https://github.com/meteor/meteor/blob/devel/packages/accounts-password/password_server.js#L917
 * @param {*} email
 */
async function verifyEmail(token, uid) {

  if (uid) {
    //first check if the user is already veririfed
    const userCheck = await Meteor.users.findOne({ _id: uid });
    if (!(userCheck.emails && userCheck.emails.length)) {
      throw new Error("User email not found, couldn't authenticate after password change");
    }
    const verified = userCheck.emails[0].verified;

    if (verified) {
      await addUserToGroup(userCheck)
      return 2
    }
  }


  const user = await Meteor.users.findOne(
    { 'services.email.verificationTokens.token': token },
    {
      fields: {
        services: 1,
        emails: 1,
      },
    }
  );
  if (!user) throw new Error('Verify email link expired or invalid');
  const userId = user._id;

  //or check validiy
  // check validity
  const tokenRecord = user.services.email.verificationTokens.find(t => t.token == token);
  if (!tokenRecord)
    return {
      userId: userId,
      error: new Error('Verify email link expired'),
    };

  // find user based on token email
  const emailsRecord = user.emails.find(e => e.address == tokenRecord.address);
  if (!emailsRecord) {
    return {
      userId: userId,
      error: new Error('Verify email link is for unknown address'),
    };
  }

  // By including the address in the query, we can use 'emails.$' in the
  // modifier to get a reference to the specific object in the emails
  // array. See
  // http://www.mongodb.org/display/DOCS/Updating/#Updating-The%24positionaloperator)
  // http://www.mongodb.org/display/DOCS/Updating#Updating-%24pull
  await Meteor.users.update(
    { _id: user._id, 'emails.address': tokenRecord.address },
    { $set: { 'emails.$.verified': true }, $pull: { 'services.email.verificationTokens': { address: tokenRecord.address } } }
  );
  // add user to group
  const addedToGroup = await addUserToGroup(user)
  console.log(addedToGroup)
  return { verified: addedToGroup };
};


async function addUserToGroup(user) {
  //if the user has groups, and they are not in verifiedEmail
  if ((user.groups && user.groups.indexOf('verifiedEmail') == -1)
    //or the user has no existing groups
    || !user.groups) {
    let updatedGroups = null
    //if no existing group, create new gruop array with verified email
    if (!user.groups) {
      updatedGroups = ['verifiedEmail']
    } else {
      //otherwise, use the weird notation to add to existing groups array
      updatedGroups = [...user.groups, 'verifiedEmail'];
    }
    //finally, update the user with new group
    await updateMutator({
      collection: Users,
      documentId: user._id,
      data: { groups: updatedGroups },
      validate: false
    });
  } else {
    //the user already belongs to the group
    return true
  }

}