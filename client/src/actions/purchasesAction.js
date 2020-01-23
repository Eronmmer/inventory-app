import {AUTH_ERROR} from './types'

export const setAlert = (data) = dispatch => {
  dispatch ( {
    type: AUTH_ERROR,
    payload(data)
  })
}
