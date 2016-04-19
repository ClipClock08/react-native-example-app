import React, {
  Component,
  Text,
  View,
  StyleSheet
} from 'react-native';

export default ChartLabel = (props) => {
  const { label, barInterval, labelFontSize, labelColor } = props;

  return(
    <View style={[{marginHorizontal: barInterval}, styles.label]}>
      <View style={styles.labelWrapper}>
        <Text style={[styles.labelText, {fontSize: labelFontSize, color: labelColor}]}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    alignItems: 'center',
    flex: 1
  },
  labelWrapper: {
    flex: 1,
    width: 50,
    alignItems: 'center'
  },
  labelText:{
    flex: 1
  }
});
