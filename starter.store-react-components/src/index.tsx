import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { Hello as HelloComponent, HelloProps } from './components/Hello';
import { Configuration } from './utils/configuration';

const client = new ApolloClient({
  uri: Configuration.serverUrl,
  cache: new InMemoryCache(),
});

export { Thing } from './components/Things';

export function Hello(helloProps: HelloProps) {
  return (
    <ApolloProvider client={client}>
      <HelloComponent
        name={helloProps.name}
        backgroundColor={helloProps.backgroundColor}
      />
    </ApolloProvider>
  );
}
