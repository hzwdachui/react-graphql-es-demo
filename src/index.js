import React from "react";
import ReactDOM from "react-dom";
// import { App } from "./components";
import AppComponent from './AppComponent/query.component';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://localhost:9100/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// ReactDOM.render(
//   <ApolloProvider client={client}><App /></ApolloProvider>,
//   document.getElementById("root")
// );

const App = () => (
  <ApolloProvider client={client}>
      <div>
          <h1>🚀 GraphQL / ApolloClient</h1>
          <ul>
              <AppComponent></AppComponent>
          </ul>
      </div>
  </ApolloProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
