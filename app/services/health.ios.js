import React from 'react-native';

const {
	BHealthKit
} = React.NativeModules;

let auth;
function requestAuth() {
	return new Promise((resolve, reject) => {
		BHealthKit.askForPermissionToReadTypes([BHealthKit.Type.StepCount], (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(true);
			}
		});
	});
}
function requestData() {
	let date = new Date().getTime();
	let before = new Date();
	before.setDate(before.getDate() - 5);
	return new Promise((resolve, reject) => {
		BHealthKit.getStepsData(before.getTime(), date, (err, data) => {
			if (err) {
				reject(err);
			} else {
				let result = {};
				for (let val in data) {
					const date = new Date(data[val].start_date);
					const day = date.getDate();
					if (!result[day]) {
						result[day] = {};
					}
					result[day]['steps'] = (result[day] && result[day]['steps'] > 0) ?
						result[day]['steps'] + data[val].value :
						data[val].value;
					result[day]['date'] = date;
				}
				console.log(result);
				resolve(Object.values(result));
			}
		});
	});
}
export default () => {
	if (auth) {
		return requestData();
	} else {
		return requestAuth().then(() => {
			auth = true;
			return requestData();
		});
	}
}
