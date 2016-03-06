import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: '#0086b3',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10
  },
  btnText: {
    color: '#0086b3'
  }
});

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { counter, increment, decrement } = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{counter}</Text>
        <TouchableOpacity onPress={increment} style={styles.button}>
          <Text>up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrement} style={styles.button}>
          <Text>down</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={Actions.pop}>
          <Text
            style={styles.btnText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
