import errorActions from '../actions/error'
import xs from 'xstream'
import { always, append } from 'ramda'

const initialState = []

export default xs.merge(
  errorActions.addError.map(payload => append(payload)),
  errorActions.clearErrors.map(_payload => always(initialState))
).startWith(() => initialState)
