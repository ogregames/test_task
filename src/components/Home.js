import React, { Component } from 'react'
import PointsList from './../list/PointsList.js'
import MapDesc from './MapDesc.js'
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <PointsList/>
        <MapDesc/>
      </div>)
      }
}