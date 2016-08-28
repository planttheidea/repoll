import 'babel-polyfill';

import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';

import repoll from '../src';

const restartInterval = (interval) => {
  interval.start();
};

@repoll({testFunc: 2000, doesNotExist: 5000}, {autoStart: true})
class App extends Component {
  componentDidMount() {
    console.log('mounted, starting stuff');

    this.repollIntervals.testFunc.start();
  }

  counter = 0;

  testFunc = (interval) => {
    this.counter++;

    if (this.counter < 3) {
      console.log(interval);
    } else {
      interval.stop();

      this.counter = 0;

      console.log('counter reset, waiting 2 seconds');

      setTimeout(() => {
        restartInterval(interval);
      }, 2000);
    }

    console.log(this.repollIntervals);
  };

  render() {
    return (
      <div>
        App
      </div>
    );
  }
}

try {
  const TestFunctionalFailure = repoll({foo: 2000})(() => {
    return (
      <div>
        Should not render
      </div>
    );
  });
} catch (exception) {
  console.error(exception);
}

const div = document.createElement('div');

div.id = 'app-container';

render((
  <App/>
), div);

document.body.appendChild(div);