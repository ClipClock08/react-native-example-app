import React, {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default Launch = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={Actions.counter}>
        <Text
          style={styles.btnText}>
          Counter
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={Actions.about}>
        <Text
          style={styles.btnText}>
          About
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
