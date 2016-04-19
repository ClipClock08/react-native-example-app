import React,
{
  Component,
  View,
  Text,
  StyleSheet,
  PropTypes
} from 'react-native';

import ChartItem from './chart-item';
import ChartLabel from './chart-label';

class Chart extends Component {
  constructor(props) {
    super(props);
    let data = props.data || [];

    this.state = {
      data: data,
      maxValue: this.countMaxValue(data)
    }
  }

  countMaxValue(data) {
    return data.reduce((prev, curn) => (curn.value >= prev) ? curn.value : prev, 0);
  }
  componentWillReceiveProps(newProps) {
    let dadta = newProps.data || [];
    this.setState({
      data: data,
      maxValue: this.countMaxValue(data)
    });
  }
  renderBars() {
    return this.state.data.map((value, index) => (
        <ChartItem
          value={value.value}
          color={value.color}
          key={index}
          barInterval={this.props.barInterval}
          maxValue={this.state.maxValue}/>
    ));
  }
  renderLabels() {
    return this.state.data.map((value, index) => (
        <ChartLabel
          label={value.label}
          barInterval={this.props.barInterval}
          key={index}
          labelFontSize={this.props.labelFontSize}
          labelColor={this.props.labelFontColor}/>
    ));
  }
  render() {
    let labelStyles = {
      fontSize: this.props.labelFontSize,
      color: this.props.labelFontColor
    };

    return(
      <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
        <View style={styles.labelContainer}>
          <Text style={labelStyles}>
            {this.state.maxValue}
          </Text>
        </View>
        <View style={styles.itemsContainer}>
          <View style={[styles.polygonContainer, {borderColor: this.props.borderColor}]}>
            {this.renderBars()}
          </View>
          <View style={styles.itemsLabelContainer}>
            {this.renderLabels()}
          </View>
        </View>
      </View>
    );
  }
}
Chart.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
    color: PropTypes.string
  })),
  barInterval: PropTypes.number,
  labelFontSize: PropTypes.number,
  labelFontColor: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  labelContainer: {
    paddingHorizontal: 5
  },
  itemsContainer: {
    flex: 10
  },
  polygonContainer: {
    flex: 0.9,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingRight: 5
  },
  itemsLabelContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
