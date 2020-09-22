import { addGraphQLMutation, addGraphQLResolvers } from 'meteor/vulcan:core';
import { getPolicyAndSignature } from './aws_s3';

const resolver = {
  Mutation: {
    async policyAndSignatureMutation(root, args, context) {
      return await getPolicyAndSignature(args, context);
    },
  },
};
addGraphQLResolvers(resolver);
addGraphQLMutation('policyAndSignatureMutation : JSON');
