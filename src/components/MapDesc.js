import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { YMaps, Map,  Polyline  } from 'react-yandex-maps';
import { connect } from 'react-redux';
import MapMarkers from './MapMarkers.js';

import { setYmap, changeGPS } from './../redux/actions/PointsListActions';

import { getList, getYmaps, getMapCenter} from './../redux/reducers/PointsListReducer.js';

class MapDesc extends Component{
  constructor(props){
    super(props)
  }
  onApiAvaliable(ymaps) {
    this.props.dispatch(setYmap(ymaps))
  }
  onChangeGPS = (newData) => {
    /*определяем географическое название точки*/
    this.props.ymaps.geocode(newData.gps,{
      results: 1
    })
    .then(result => {
      newData.desc = result.geoObjects._collectionComponent._baseArrayComponent._children[0].properties._data.balloonContent;
      this.props.dispatch(changeGPS(newData));
    })
    .catch(err=>{
      newData.desc = '';
      this.props.dispatch(changeGPS(newData));
    })
  }
  getMapState = ()=>{
    if(this.props.mapCenter.length ===2){
      return { center: this.props.mapCenter, zoom: 5 }
    }else{
      return undefined;
    }
  }
  render(){
    return (
      <div className="map-part">
        <YMaps onApiAvaliable={(ymaps) => this.onApiAvaliable(ymaps)}>
          <Map state={ this.getMapState() }
          width='100%'
          height={500}>
          <Polyline
            geometry={{
              coordinates: this.props.list.map(val => val.gps)
            }}
            properties={{
              balloonContent: 'Текущий маршрут',
            }}
            options={{
              balloonCloseButton: false,
              strokeColor: '#000000',
              strokeWidth: 4,
              strokeOpacity: 0.5,
            }}
          />
          {
            this.props.list.map(val => {
              return <MapMarkers key={val.name}
                name={val.name}
                desc={val.desc}
                gps={val.gps}
                onChangeGPS = {this.onChangeGPS}
                />
            })
          }
          </Map>
        </YMaps>
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    list: getList(state),
    ymaps: getYmaps(state),
    mapCenter: getMapCenter(state)
  };
}
MapDesc.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MapDesc);
