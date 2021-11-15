import React from 'react'

export default function roc(obj) {
  const component = function(props) {
    const app = new React.Component(props)
    if (obj.data) {
      const data = obj.data()
      Object.keys(data).forEach(name => {
        Object.defineProperty(app, name, {
          get() {
            return app.state[name]
          },

          set(value) {
            app.setState({ [name]: value })
          }
        })
      })
      app.state = data
    }
    app.render = obj.render.bind(app)
    if (obj.mounted) app.componentDidMount = obj.mounted.bind(app)
    if (obj.unmount) app.componentWillUnmount = obj.unmount.bind(app)
    app.shouldComponentUpdate = obj.rerender ? obj.rerender.bind(app) : ((nextProps, nextState) => true)
    if (obj.methods) {
      Object.keys(obj.methods).forEach(name => {
        app[name] = obj.methods[name].bind(app)
      })
    }
    return app
  }

  component.prototype = React.Component.prototype
  return component
}
