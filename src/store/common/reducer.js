import * as types from "./actionTypes";

const initialState = {
  me: {},
  count:0,
  all:[],
  chat:[],
  image:null,
  editimage:null
};

export default function common(state = initialState, action = {}) {
  switch (action.type) {

    case types.SET_USER:
      return {
        ...state,
        type: types.SET_USER,
        me: action.data,
        status: action.status
      }
    case types.REGISTER:
      return {
        ...state,
        type: types.SET_USER,
        me: action.data,
        status: action.status
      }

    case types.LOGIN:
      return {
        ...state,
        type: types.LOGIN,
        me: action.data,
        count: action.data.count,
        status: action.status
      }
    
    case types.EDIT_PROFILE:
      return {
        ...state,
        type: types.EDIT_PROFILE,
        me: action.data,
        status: action.status
      }
    
    case types.STAMP:
      return {
        ...state,
        type: types.EDIT_PROFILE,
        count: action.data,
        status: action.status
    }

    case types.GET_ALL:
      return {
        ...state,
        type: types.GET_ALL,
        all: action.data,
        status: action.status
    }

    case types.UPLOAD_IMAGE:
      return {
        ...state,
        type: types.UPLOAD_IMAGE,
        image: action.data,
        status: action.status
    }

    case types.UPLOAD_IMAGE_Edit:
      return {
        ...state,
        type: types.UPLOAD_IMAGE_Edit,
        editimage: action.data,
        status: action.status
    }

    case types.SEND_CHAT:
      return {
        ...state,
        type: types.SEND_CHAT,
        chat: action.data,
        status: action.status
    }

    case types.LOGOUT:
      return {
        ...state,
        type: types.LOGOUT,
        count: 0,
        me:{},
        status: action.status
    }

    default:
      return state;
  }
}
