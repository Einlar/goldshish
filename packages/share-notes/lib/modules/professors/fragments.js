import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
    fragment professorFragment on Professor {
        _id
        professorName
        course {
            courseName
        }
    }
`);