import { combineReducers } from "redux"
import { DrawerState } from "./drawer/types"
import drawerReducer from "./drawer/reducer"

export interface State {
  drawer: DrawerState
}

export default combineReducers({
  drawer: drawerReducer
})
