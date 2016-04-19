import React, {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Chart from '../components/chart';

const chartData = [
  {
    label: '1',
    value: 1,
    color: 'red'
  },
  {
    label: '2',
    value: 2,
    color: 'blue'
  }
];

export default Statistics = (props) => {
  return(
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Chart
          data={chartData}
          barInterval={1}
          labelFontSize={10}
          labelFontColor={'#575757'}
          borderColor={'#b4b4b4'}
          backgroundColor={'#e7e7e7'}
          style={styles.chart}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartContainer: {
    width: 300,
    height: 300
  }
});
