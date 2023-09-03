import * as React from 'react';
import StackNavigator from './Nav/Stack';
import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
const App = () => {
  return (
   <StackNavigator />
  );
};

export default App;