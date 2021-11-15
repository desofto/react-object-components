# react-object-components


Just install the package:

```
npm i --save react-object-components
```

And wrap your component objects with `roc`:

```
import roc from 'react-object-components'

const App = roc({
  data: () => ({
    count: 0,
    timer: null
  }),

  mounted() {
    this.timer = setInterval(function() {
      this.increment()
    }.bind(this), 1000)
  },

  unmount() {
    clearInterval(this.timer)
  },

  methods: {
    increment() {
      this.count = this.count + 1
    },
  },

  render() {
    return (
      <>
        {this.count}
        <Button onClick={() => this.count = this.count + 1}>inc</Button>
        <Button onClick={() => this.count = this.count - 1}>dec</Button>
      </>
    )
  }
})

const Button = roc({
  rerender(nextProps, nextState) {
    return false
  },

  render() {
    console.log("render")
    return (
      <button onClick={this.props.onClick}>{this.props.children}</button>
    )
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```
