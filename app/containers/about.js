import React, {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default About = (props) => {
  return (
    <View
      style={styles.container}>
      <Text>React Native example app</Text>
      <Text>Dependences:</Text>
      <Text>Redux</Text>
      <Text>React Native Router Flux</Text>
      <Text>Lodash</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={Actions.pop}>
        <Text
          style={styles.btnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
