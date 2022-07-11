import React from "react";
import styles from './Weather.module.scss';
import {useSelector} from "react-redux";

function Weather() {

 const data = useSelector((state) => state);

 return (
  <section className={styles.weatherWrapper}>
	{data.weather.data.map(({location, current}) => (
	 <div key={Date.now()} className={styles.wrapper}>
	  <div className={styles.infoWeather}>
		<h1 className={styles.city}>{location.name}</h1>
		<h2 className={styles.country}>{location.country}</h2>
		<div>
		 <span className={styles.temp}>{current.temp_c}°</span>
		</div>
	  </div>
	  <div>
		<img src={current.condition.icon} alt=""/>
	  </div>
	 </div>
	))}
  </section>
 )
}

export default Weather;