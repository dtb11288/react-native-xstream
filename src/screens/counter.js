import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native'
import counterActions from '../actions/counter'
import { connect } from '../lib/reactive'
import { pick } from 'ramda'

const App = ({ counter, increment, decrement, reset }) => (
  <View style={styles.container}>
    <Button onPress={() => increment(1)} title='Inc' />
    <Button onPress={() => decrement(1)} title='Dec' />
    <Button onPress={reset} title='Reset' />
    <Text style={styles.instructions}>{counter}</Text>
    <TouchableOpacity activeOpacity={0.5} style={styles.floatingButton}>
      <Text style={styles.FloatingButtonStyle}>F</Text>
    </TouchableOpacity>
  </View>
)

export default connect(pick(['counter']), counterActions)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  instructions: {
    fontSize: 40,
    textAlign: 'center',
    color: '#339955',
    marginBottom: 5
  },
  floatingButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30
  },
  FloatingButtonStyle: {
    width: 50,
    height: 50
  }
})
