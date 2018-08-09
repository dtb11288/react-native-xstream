import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

const App = ({ counter, increment, decrement, reset, navigation }) => (
  <View style={styles.container}>
    <View style={styles.form}>
      <TextInput style={styles.input}
        autoCapitalize='none'
        onSubmitEditing={() => this.passwordInput.focus()}
        autoCorrect={false}
        keyboardType='email-address'
        returnKeyType='next'
        placeholder='Email or Mobile Num'
        placeholderTextColor='rgba(225,225,225,0.7)' />

      <TextInput style={styles.input}
        returnKeyType='go'
        placeholder='Password'
        placeholderTextColor='rgba(225,225,225,0.7)'
        secureTextEntry />

      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Counter')}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  </View>
)

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  form: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'stretch'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})
