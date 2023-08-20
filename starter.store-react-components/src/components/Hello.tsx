import React from 'react';
import { useQuery, gql } from '@apollo/client';

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;
export interface HelloProps {
  name: string;
  backgroundColor?: string;
}

export function Hello({ name, backgroundColor = '#db1457' }: HelloProps) {
  const { loading, error, data } = useQuery(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div
      style={{
        backgroundColor,
        padding: '10px',
        color: 'white',
        fontSize: '2em',
      }}
    >
      {data.hello},{' '}
      <span>
        <u>{name}</u>
      </span>
      !
    </div>
  );
}
