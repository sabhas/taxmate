import * as ActionTypes from "../actionTypes"

export interface DrawerState {
  isOpen: boolean
}

export interface ToggleDrawer {
  type: typeof ActionTypes.TOGGLE_DRAWER
  payload: boolean
}

export type DrawerDispatchTypes = ToggleDrawer
