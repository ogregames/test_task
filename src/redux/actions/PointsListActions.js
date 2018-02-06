export const ADD_POINT = 'ADD_POINT'
export const REMOVE_POINT = 'REMOVE_POINT'
export const ON_LIST_CHANGE = 'ON_LIST_CHANGE'
export const SET_Y_MAPS = 'SET_Y_MAPS'
export const CHANGE_GPS = 'CHANGE_GPS'

export function setYmap(ymaps) {
  return {
      type: SET_Y_MAPS,
      payload: ymaps
  }
}
export function changeGPS(payload) {
  return {
      type: CHANGE_GPS,
      payload: payload
  }
}

export function addPoint(payload) {
  return {
      type: ADD_POINT,
      payload: payload
  }
}

export function removePoint(name) {
  return {
      type: REMOVE_POINT,
      name: name
  }
}

export function onUpdateList(updateList) {
  return {
      type: ON_LIST_CHANGE,
      updList: updateList
  }
}
