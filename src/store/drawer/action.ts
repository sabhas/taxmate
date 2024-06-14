import * as ActionTypes from "../actionTypes"
import { ToggleDrawer } from "./types"

export const toggleDrawer = (payload: boolean): ToggleDrawer => ({
  type: ActionTypes.TOGGLE_DRAWER,
  payload
})
