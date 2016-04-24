import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import * as healthActions from '../actions/healthActions';
import { connect } from 'react-redux';

import Health from '../services/health';

class Launch extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Health().then((data) => {
      this.props.actions.update(data);
      Actions.main();
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Loading ...
        </Text>
      </View>
    );
  }
}

export default connect(state => ({
  }),
  (dispatch) => ({
    actions: bindActionCreators(healthActions, dispatch)
  })
)(Launch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20
  }
})
