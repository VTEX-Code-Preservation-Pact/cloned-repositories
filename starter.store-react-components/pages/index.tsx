import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello, Thing } from '../.';

const App = () => {
  return (
    <div>
      <Thing />
      <Hello name={'VTEX'} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
