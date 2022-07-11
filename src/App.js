import React, {useLayoutEffect} from "react";
//Styles
import './reset.scss';
import styles from './App.module.scss';
//Actions
import {setWeather, getWeather, searchMode} from "./redux/actions/actionCreators";
//Hooks
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
//Components
import {Suspense} from "react";
import LazyLoader from "./components/LazyLoader/LazyLoader";
import Autocomplete from "./components/Autocomplete/Autocomplete";

const Weather = React.lazy(() => import("./components/Weather/Weather"))


function App() {
 const [value, setInput] = useState('');
 const [isOpen, setOpen] = useState(true);

 const data = useSelector((state) => state);
 console.log(data)
 const dispatch = useDispatch();

 const changeValue = (text) => {
  setInput(text)
  setOpen(true)
 };
 const handlerAutocomplete = (text) => {
  changeValue(text)
  setOpen(!isOpen)
 }
 const handlerSearch = (text) => {
  if (text.length >= 3) {
	dispatch(searchMode(text))
  }
 };

 useLayoutEffect(()=>{
  document.addEventListener('click', () => {
	setOpen(!isOpen)
  })
 },[])
 useEffect(() => {
  if (!value) {
	dispatch(setWeather())
  }
 }, []);

 return (
  <section className={styles.wrapper}>
	<form className={styles.searchForm} onSubmit={event => event.preventDefault()}>
	 <input
	  className={styles.searchInput}
	  type="text"
	  placeholder="Enter your city"
	  value={value}
	  onKeyDown={(event) => {
		if (event.key === 'Enter' && value.length > 3) {
		 changeValue(value)
		 dispatch(getWeather(value))
		 handlerAutocomplete(value)
		}
	  }}
	  onChange={(event) => {
		changeValue(event.target.value)
		handlerSearch(event.target.value)
	  }}
	 />
	 {value && isOpen ? <ul className={styles.autocomplete}>
	  {data.weather.places.map(info => <Autocomplete
		changeValue={changeValue}
		handlerAutocomplete={handlerAutocomplete}
		key={info.id} {...info}/>)}
	 </ul> : null}
	</form>
	<button
	 className={value ? `${styles.action}` : `${styles.disable}`}
	 onClick={() => {
	  if (value) {
		dispatch(getWeather(value))
	  }
	 }}
	>Search weather
	</button>
	<Suspense fallback={<LazyLoader/>}>
	 <Weather/>
	</Suspense>
  </section>
 );
}

export default App;
