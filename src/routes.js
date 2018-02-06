import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App.js'
import Home from './components/Home.js'
import NotFound from './components/NotFound.js'

export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='*' component={NotFound} />
    </Route>
  </div>
)
