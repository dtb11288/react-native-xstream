import counterActions from '../actions/counter'
import xs from 'xstream'
import { rxFetch } from '../lib/utils'

const initialState = 0

export default xs.merge(
  xs.of(state => state || initialState),
  xs.periodic(1000)
    .map(payload => state => state + 1),
  rxFetch('https://jsonplaceholder.typicode.com/todos/1')
    .map(payload => state => { return state }),
  counterActions.increment
    .map(payload => state => state + payload),
  counterActions.decrement
    .map(payload => state => state - payload),
  counterActions.reset
    .map(_payload => _state => initialState)
)
