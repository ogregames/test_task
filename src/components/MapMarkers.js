import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Placemark  } from 'react-yandex-maps';

class MapMarkers extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Placemark
        geometry={{
          type: 'Point',
          coordinates: this.props.gps,
        }}
        properties={{
          iconContent: this.props.name,
          hintContent: 'Ну давай уже тащи',
          balloonContent: this.props.desc
        }}
        options={{
          balloonPanelMaxMapArea: 0,
          preset: 'islands#blackStretchyIcon',
          /*preset: 'islands#blueCircleDotIcon',*/
          draggable: true,
          hasBalloone: true,
        }}
        onDragEnd={event=>{
          this.props.onChangeGPS({name:this.props.name, 
            gps: event.originalEvent.target.geometry._coordinates})
        }}
      />
    );
  }
}
MapMarkers.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  gps: PropTypes.array.isRequired,
  onChangeGPS: PropTypes.func.isRequired, 
};

export default MapMarkers;
