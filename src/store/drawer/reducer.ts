import * as ActionTypes from "../actionTypes"
import { DrawerDispatchTypes, DrawerState } from "./types"

const initialState: DrawerState = {
  isOpen: false
}

const reducer = (
  state = initialState,
  action: DrawerDispatchTypes
): DrawerState => {
  switch (action.type) {
    case ActionTypes.TOGGLE_DRAWER:
      return {
        ...state,
        isOpen: action.payload
      }

    default:
      return state
  }
}

export default reducer
