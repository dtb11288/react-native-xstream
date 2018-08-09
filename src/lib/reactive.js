import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { assoc, reduce, keys } from 'ramda'
import equals from 'fast-deep-equal'
import xs from 'xstream'

export const createAction = xs.create
export const createActions = reduce((acc, key) => assoc(key, createAction(), acc), {})
export const createState = (reducer$, initialState$ = xs.of({})) => initialState$
  .map((initialState = {}) => reducer$
    .fold((state, [scope, reducer]) => assoc(scope, reducer(state[scope]), state), initialState)
  )
  .flatten()
  .remember(1)

const actions = actionSubjects => keys(actionSubjects)
  .reduce((acc, key) => assoc(key, value => actionSubjects[key].shamefullySendNext(value), acc), {})

export const connect = (selector = state => state, actionSubjects = {}) => WrappedComponent => {
  class Connect extends Component {
    constructor (props) {
      super(props)
      this.listener = {
        next: value => {
          this.setState(value)
        },
        error: error => { throw error },
        complete: () => {}
      }
    }

    shouldComponentUpdate (nextProps, nextState) {
      return !equals(nextState, this.state)
    }

    componentWillMount () {
      this.state$ = this.context.state$.map(selector)
      this.state$.addListener(this.listener)
    }

    componentWillUnmount () {
      this.state$.removeListener(this.listener)
    }

    render () {
      return (
        <WrappedComponent {...this.state} {...this.props} {...actions(actionSubjects)} />
      )
    }
  }
  Connect.contextTypes = { state$: PropTypes.object.isRequired }
  return Connect
}

export class Provider extends Component {
  getChildContext () {
    return { state$: this.props.state$ }
  }

  render () {
    return this.props.children
  }
}

Provider.propTypes = { state$: PropTypes.object.isRequired }
Provider.childContextTypes = { state$: PropTypes.object.isRequired }
