import React from 'react-native';

const Pedometer = React.NativeModules.PedometerAndroid;

export default () => {
  return new Promise((resolve, reject) => {
    Pedometer.getHistory((result) => {
      try {
        result = JSON.parse(result);
        result = Object.keys(result).map((key) => {
          let date = new Date(key);
          date.setHours(0);
          return {
            steps: result[key].steps,
            date: date
          }
        });
        resolve(result);
      } catch(err) {
        reject(err);
      };
    }, (err) => {
      reject(err);
    });
  });
}
