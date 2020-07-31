import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import songs from './songs'

const reducer = combineReducers({
    songs
})
const store = configureStore({
    reducer,
})
export default store;
