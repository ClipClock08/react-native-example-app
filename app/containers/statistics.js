import React, {
  View,
  Text,
  StyleSheet,
  Component,
  TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import { connect } from 'react-redux';
import * as healthActions from '../actions/healthActions';
import Chart from '../components/chart';
import { Actions } from 'react-native-router-flux';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      health: this.transformData(props.health)
    };
  }
  transformData(data) {
    return _
    .chain(data)
    .takeRight(5)
    .reduce((list, item ,key) => {
      list.push({
        color: 'red',
        value: item.steps,
        label: item.date.getMonth() + '.' + item.date.getDate()
      });
      return list;
    }, [])
    .value();
  }
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <Chart
            data={this.state.health}
            barInterval={1}
            labelFontSize={10}
            labelFontColor={'#575757'}
            borderColor={'#b4b4b4'}
            backgroundColor={'#e7e7e7'}
            style={styles.chart}/>
        </View>
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

export default connect(state => ({
    health: state.health
  }),
  (dispatch) => ({
    actions: bindActionCreators(healthActions, dispatch)
  })
)(Statistics);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartContainer: {
    width: 300,
    height: 300
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
