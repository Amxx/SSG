import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GithubCorner from 'react-github-corner'

import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'

const Core = (props) =>
  <>
    <Router>
      <Route exact path='/:chain?/:address?/' render={ (routing) => <App routing={routing} {...props}/> }/>
    </Router>
    <GithubCorner href="https://github.com/amxx/ssg" />
    </>

export default Core
