import React from 'react';
import StepWrapper from './StepWrapper.jsx';
import schema from '../../modules/schema.js';

export const title = 'Relations';

const text = [
  `
Let's keep learning how to harness the power of GraphQL. One of GraphQL's coolest features is that you're not limited to the fields that are in your database. In fact, GraphQL couldn't care less about your database: it only follows what *you* specify. 

This means that even though the \`Movies\` objects in our database only contains a \`userId\` field of type \`String\`, we can make our corresponding GraphQL \`Movie\` type contain a \`user\` field of type \`User\` as well!

In Vulcan, this is done automatically through [relations](http://docs.vulcanjs.org/relations.html).

Find the \`userId\` field in your \'lib/modules/schema.js\' file and add the following property to it:
`,
  `
~~~js
relation: {
  fieldName: 'user',
  typeName: 'User',
  kind: 'hasOne'
}
~~~
`,
  `
We're specifying three things here:

1. First, our new “virtual” field will be named \`user\` instead of \`userId\`. Having different names is important to avoid confusion when it comes time to querying our API, since \`userId\` is a string but \`user\` will be an object. 
2. Then, we specify that this new \`user\` field should be of type \`User\`. That type already exists because it was auto-generated by the \`Users\` collection.
3. Finally, we specify what **kind** of relation this will be, in this case a movie "has one" associated user so we use \`hasOne\`.

One more thing: we need to ask for that \`user\` field in our \`MovieFragment\` fragment. Go to \`lib/modules/fragments.js\` and modify the fragment like so:
`,
  `
~~~js
fragment MovieFragment on Movie {
  _id
  createdAt
  name
  user{
    displayName
  }
}
~~~
`,
];

const after = `
If you're seeing every user's \`displayName\` next to their review, this means our custom field resolver worked! 

And as you can see, the *graph* part of *GraphQL* means we can traverse our API graph using nested structures and leveraging each type's existing resolvers, without needing to actually store each user's \`displayName\` inside our \`Movies\` documents. 

Also, while we've used Vulcan's \`hasOne\` relation here, you can also have \`hasMany\` relations by storing an array of IDs instead of a single one. 

And this is out of this tutorial's scope, but note that you're not limited to internal relations by any means: thanks to API-only fields, you can also have completely arbitrary field resolvers that return any data you want, or even hit a third-party API!
`;

const Step = () => <StepWrapper title={Step.title} text={text} after={after} check={() => !!schema.userId.relation} />;

export const checks = [
  { file: '/lib/modules/schema.js', string: 'relation' },
  { file: '/lib/modules/fragments.js', string: 'displayName' },
];

export default Step;
