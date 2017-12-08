import React from 'react';
import { Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import mainReducer from './reducers/main.jsx'
import Landing from './landing.jsx'
import Dashboard from './dashboard.jsx'

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        userLoggedIn: false
      }
  }

//   render() {
//     return (
//       <Router>
//         <div>
//           <Button
//             color='orange'
//             size='massive'
//           >
//             Hello!
//           </Button>
//           <Route path="/" exact={true} component = {Dashboard} />
//           <Route path="/landing" component = {Landing} />
//         </div>
//       </Router>
//     )
//   }

// }

  render() {
    if (!this.state.userLoggedIn) {
      return (
          <div>
            <Button
              color='orange'
              size='massive'
              onClick={() => {
                console.log(this)
                this.setState({userLoggedIn: true})
              }}
            >
              Login
            </Button>

            <Landing />
          </div>

      )
    } else {
      return (
        <div>
            <Button
              color='orange'
              size='massive'
              onClick={() => {
                console.log(this)
                this.setState({userLoggedIn: false})
              }}
            >
              Logout
            </Button>

            <Dashboard />
          </div>

      )
    }

  }
}

export default App
