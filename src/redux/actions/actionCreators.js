import {BASE_GET_URL, BASE_KEY, BASE_SEARCH_URL} from "../../variables";
import {SET_BASE_WEATHER, SET_ISLOADING, GET_WEATHER, SEARCH_PLACE} from "./actions";
import axios from "axios";

export const setWeather = () => async (dispatch) => {
 dispatch(setIsLoading(true))
 try {
  const {data} = await axios(`http://api.weatherapi.com/v1/current.json?key=85f575b9c0924ee390d135459220607&q=Kiev&aqi=yes`)
  dispatch({type: SET_BASE_WEATHER, payload: data})
 } catch (e) {
  alert(e)
 }
 dispatch(setIsLoading(false))
}

export const getWeather = (value) => async (dispatch) => {
 dispatch(setIsLoading(true))
 try {
  const {data} = await axios(`${BASE_GET_URL}${BASE_KEY}&q=${value}&aqi=yes`)
  dispatch({type: GET_WEATHER, payload: data})
 } catch (e) {
  alert(e)
 }
 dispatch(setIsLoading(false))
}

export const searchMode = (value) => async (dispatch) => {
 dispatch(setIsLoading(true))
 try {
  const {data} = await axios(`${BASE_SEARCH_URL}${BASE_KEY}&q=${value}`)
  dispatch({type: SEARCH_PLACE, payload: data})
 } catch (e) {
  alert(e)
 }
 dispatch(setIsLoading(false))
}

export const setIsLoading = (isLoading) => ({type: SET_ISLOADING, payload: isLoading})