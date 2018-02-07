import {
  ADD_POINT,
  REMOVE_POINT,
  ON_LIST_CHANGE,
  SET_Y_MAPS,
  CHANGE_GPS
} from '../actions/PointsListActions.js'
const nameTemplate = 'Точка ';
const initialState = {
  list: [
   /* {name: 'Точка 1', gps:[55.753215, 37.622504], desc: 'Москва'},
    {name: 'Точка 2', gps:[50.450458, 30.52346], desc: 'Киев'},
    {name: 'Точка 3', gps:[52.517481, 13.406888], desc: 'Берлин'},*/
  ], 
  ymaps: {},
  mapCenter: [53.902496, 27.561481]
}

const PointsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_Y_MAPS:
    return {
      ...state,      
      ymaps: action.payload,
    }
    case CHANGE_GPS:
      let newArray = [];
      for(let i =0; i<state.list.length;++i){
        let point = state.list[i];
        if(point.name === action.payload.name){
          point.gps = action.payload.gps;
          point.desc = action.payload.desc;
        }
        newArray.push(point);
      }
    return {
      ...state,      
      list: newArray 
    }
    case ON_LIST_CHANGE:
    return {
      ...state,      
      list: action.updList 
    }

    case ADD_POINT:
      let i = 1;
      for( ; i<100; ++i){
        if(!state.list.find(val => val.name === nameTemplate+i))break;
      }
      action.payload.name = nameTemplate+i;
      return {
        ...state,      
        list: state.list.concat(action.payload),
        mapCenter: action.payload.gps
      };

    case REMOVE_POINT:
      const leastPoints = state.list.filter(item => item.name !== action.name);
      if (leastPoints.length !== state.list.length) {
        return {
          ...state,      
          list: leastPoints};
      }else{
        return state;
      }

    default:
      return state;
  }
}

export const getList = (state) => {
  return state.PointsListReducer.list;
}
export const getYmaps = (state) => {
  return state.PointsListReducer.ymaps;
}
export const getMapCenter = (state) => {
  return state.PointsListReducer.mapCenter;
}
export default  PointsListReducer;