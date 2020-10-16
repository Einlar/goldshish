
import Users from 'meteor/vulcan:users';

/*
  Let's create a new "mods" group that can edit and delete any posts
*/

Users.createGroup("verifiedEmail");
// Users.groups.invited.can(["login"]); // mods can edit anybody's posts