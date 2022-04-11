import { IHelloRespond } from '@synergizer/common';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/App';

const a: IHelloRespond = { message: 'Hi' };
console.log(a);
ReactDOM.render(<App />, document.getElementById('root'));
