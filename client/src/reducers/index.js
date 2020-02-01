import {combineReducers} from "redux"
import alertReducer from "./alertReducer"
import authReducer from "./authReducer"
import customersReducer from "./customersReducer"
import productsReducer from "./productsReducer"
import purchasesReducer from "./purchasesReducer"
import suppliersReducer from "./suppliersReducer"
import testAllUserReducer from "./testAllUserReducer"
import salesReducer from './salesReducer'
import modalReducer from "./modalReducer"

export default combineReducers( {
  alert: alertReducer,
  auth: authReducer,
  customers: customersReducer,
  products: productsReducer,
  purchases: purchasesReducer,
  suppliers: suppliersReducer,
  allUsers: testAllUserReducer,
  sales: salesReducer,
  modal: modalReducer
})
