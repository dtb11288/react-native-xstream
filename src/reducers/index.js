import counter$ from './counter'
import error$ from './error'
import xs from 'xstream'

export default xs.merge(
  error$.map(reducer => ['errors', reducer]),
  counter$.map(reducer => ['counter', reducer])
)
