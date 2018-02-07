import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DraggableList from 'react-draggable-list';
import PointItem from './PointItem.js';

import { addPoint, removePoint, onUpdateList } from './../redux/actions/PointsListActions';
import { getList, getYmaps} from './../redux/reducers/PointsListReducer.js';

class PointsList extends React.Component{
  constructor(props) {
    super(props);
  }
  _onListChange(newList) {
    this.props.dispatch(onUpdateList( newList ));
  }
  addPoint = () => {
    const newPlace = this.refs.newPlace;
    if (newPlace.value && this.props.ymaps) {
      this.props.ymaps.geocode(newPlace.value)
        .then(result => {
          if(result.geoObjects.get(0)){
            this.props.dispatch(addPoint({desc: newPlace.value,
            gps: result.geoObjects.get(0).geometry.getCoordinates()}));
            newPlace.value =  '';      
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }
  };
  removePoint = (rName) => {
    this.props.dispatch(removePoint(rName));
  }
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addPoint();
    }
  }
  render() {
    return (
      <div className="list-part"
        ref={el => {
            if (el) this._container = el;
          }}>
        <div className="form-content">
          <h4 className="form-title">Указать новое место</h4>
          <input placeholder="Введите новый адрес..." 
            type="text"
            className="form-field" ref="newPlace" 
            onKeyPress={this._handleKeyPress} 
          />
          <a className="post-submit-button" onClick={this.addPoint}> Добавить</a>
        </div>
        <div className="list"  >
        <DraggableList
          className="list"
            itemKey="name"
            template={PointItem}
            list={this.props.list}
            onMoveEnd={newList => this._onListChange(newList)}
            commonProps = {{
              removePoint: this.removePoint
            }}
            container={()=>this._container }
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    list: getList(state),
    ymaps: getYmaps(state)
  };
}

PointsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(PointsList);