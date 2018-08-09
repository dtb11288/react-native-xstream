import React from 'react'
import { Provider, createState } from './lib/reactive'
import { createStackNavigator } from 'react-navigation'
import reducer$ from './reducers'
import Main from './screens/main'
import Counter from './screens/counter'
import xs from 'xstream'
import { AsyncStorage } from 'react-native'
import { when, isNil, always } from 'ramda'

const RootStack = createStackNavigator({
  Main: { screen: Main, navigationOptions: { header: null } },
  Counter: { screen: Counter, navigationOptions: { header: null } }
}, {
  initialRouteName: 'Main'
})

// AsyncStorage.clear()
const initialState$ = xs.fromPromise(
  AsyncStorage
    .getItem('storage')
    .then(JSON.parse)
    .then(when(isNil, always({})))
    .catch(always({}))
)

const state$ = createState(reducer$, initialState$)
state$
  .drop(1)
  .subscribe({
    next: state => AsyncStorage
      .setItem('storage', JSON.stringify(state))
      .catch(console.error),
    error: error => { throw error },
    complete: () => {}
  })

export default () => (
  <Provider state$={state$}>
    <RootStack />
  </Provider>
)
