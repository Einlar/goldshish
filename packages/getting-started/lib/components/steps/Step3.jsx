import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import StepWrapper from './StepWrapper.jsx';
import { useLocation } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

// React Hooks

const text = `
Before moving on, you should make sure you're familiar with [React Hooks](https://reactjs.org/docs/hooks-overview.html). Hooks are special React functions that give your components access to "superpowers" like managing their own state, loading and modifying data, or manipulating the URL.

We'll dig into Vulcan hooks later, but for now let's just refresh our memory by trying out React Router's \`useLocation\` hook. 

Find the file for the \`Step3.jsx\` component (in other words, the one you're looking at right now!) and uncomment the \`const { pathname } = useLocation();\` line.
`;

const after = `
This illustrate an important Vulcan principle: even though Vulcan has many of its own internal APIs, whenever possible we try to rely on standard ecosystem tools like React Router, [Apollo Client](https://www.apollographql.com/docs/react/) (for getting data to and from our GraphQL endpoint), React itself, and many other npm packages. No need to reinvent the wheel!
`;

const Step = () => {
  const items = {};
  // items.pathname = useLocation().pathname; // uncomment on #Step3
  return (
    <StepWrapper title={Step.title} text={text} after={after} check={() => !!items.pathname}>
      {items.pathname && (
        <SyntaxHighlighter style={okaidia}>{`The current path is: ${items.pathname}`}</SyntaxHighlighter>
      )}
    </StepWrapper>
  );
};

Step.title = 'React Hooks';

export default Step;
