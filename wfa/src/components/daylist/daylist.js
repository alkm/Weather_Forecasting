import React, { useState, useEffect }from 'react';
import HourList from '../hourlist/hourlist.js';
import Utils from '../../utils/utils.js';
import './daylist.css';

function DayList(props) {
	const [dayList, setDayList] = useState([]);
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const [itemIndex, setItemIndex] = useState(0);
	const [dayInfo, setDayInfo] = useState({});
	const [allDayInfo, setAllDayInfo] = useState([]);
	const [listInfo, setListInfo] = useState([]);
	const [dailyForecast, setDailyForecast] = useState(true);
	const [hourlyInfo, setHourlyInfo] = useState([]);
	const [hourIndx, setHourIndx] = useState(0);

	const dateKeys = ['dt', 'sunrise', 'sunset', 'moonrise', 'moonset'];

	useEffect(() => {
		if(props.dailyinfo.length > 0){
			let di = props.dailyinfo;
			setDayList(next7Days());
			setDayInfo(di[0]);
			setAllDayInfo(di);
		}
    }, [props.dailyinfo]);

    useEffect(() => {
		if(props.hourlyinfo.length > 0){
			let hi = props.hourlyinfo;
			setHourlyInfo(hi);
		}
    }, [props.hourlyinfo]);



	const next7Days = () => {
	    let result = [];
	    for (let i = 0; i < 7; i++) {
	        let d = new Date();
	        d.setDate(d.getDate() + i);
	        //i < 2 ? result.push(days[d.getDay()]) : result.push(formatDate(d));
	        result.push({day: days[d.getDay()], date: d});
	        
	    }
	    console.log(result);
	    return(result);
	 }

	const setDaySelection = (indx, itm) => (e) => {
    	setItemIndex(indx);
    	setDayInfo(allDayInfo[indx]);
    	//props.onchange(indx);
    }

   	useEffect(() => {
   		if(Object.keys(dayInfo).length > 0){
   			let arrKey = Object.keys(dayInfo);
   			let arrVal = Object.values(dayInfo);
   			let _arr = [];
   			let arrInfo = arrKey.map((itm, indx) => {
   				if(!isNaN(arrVal[indx])){
   					_arr.push({'lbl': itm, 'val': arrVal[indx]});
   				}
   				return _arr;
   				
   			})
   			setListInfo(arrInfo);
   		}
    }, [dayInfo]);


	return (
		<>
			<div className="day-list">
				{
		        	(dayList.length > 0) && React.Children.toArray(dayList.map((itm, indx) => (
		        		<div className={"day-name "+ ((itemIndex === indx) ? 'day-selected': 'day-hover')} onClick={setDaySelection(indx, itm)}>
		        			{indx === 0 && itm.day+' (Today)'}
		        			{indx === 1 && itm.day+' (Tomorrow)'}
		        			{indx > 1 && itm.day}
		        		</div>
		            )))
		        }
			</div>
			{ dailyForecast ? 
				<>
				{
					Object.keys(dayInfo).length > 0 &&
						<>
							<h2>Daily Forecast <span>{Utils.formatDate(new Date(dayInfo.dt*1000))}</span></h2>
							<div className="daily-info">
								<div className="info-body">
									<div className="info-box">
										<h4>Precipitation</h4>
										<h6> - Clouds: <span>{dayInfo.clouds+'%'}</span></h6>
										<h6> - Humidity: <span>{dayInfo.humidity+'%'}</span></h6>
										<h6> - Rain: <span>{dayInfo.rain+' mm'}</span></h6>
										<h6> - Pressure: <span>{dayInfo.pressure+' hPa'}</span></h6>
									</div>
									<div className="info-box">
										<h4>Sunshine</h4>
										<h6> - Sunrise: <span>{dayInfo.clouds+'%'}</span></h6>
										<h6> - Sunset: <span>{dayInfo.clouds+'%'}</span></h6>
										<h6> - Moonrise: <span>{dayInfo.clouds+'%'}</span></h6>
										<h6> - Moonset: <span>{dayInfo.clouds+'%'}</span></h6>
									</div>
									<div className="info-box">
										<h4>Temperature</h4>
										<h6> - Day: <span>{(parseFloat(dayInfo.temp.day) - 273.15).toFixed(2)+'°C'}</span></h6>
										<h6> - Evening: <span>{(parseFloat(dayInfo.temp.eve) - 273.15).toFixed(2)+'°C'}</span></h6>
										<h6> - Maximun: <span>{(parseFloat(dayInfo.temp.max) - 273.15).toFixed(2)+'°C'}</span></h6>
										<h6> - Minimum: <span>{(parseFloat(dayInfo.temp.min) - 273.15).toFixed(2)+'°C'}</span></h6>
										<h6> - Morning: <span>{(parseFloat(dayInfo.temp.morn) - 273.15).toFixed(2)+'°C'}</span></h6>
										<h6> - Night: <span>{(parseFloat(dayInfo.temp.night) - 273.15).toFixed(2)+'°C'}</span></h6>
									</div>
									<div className="info-box">
										<h4>Wind</h4>
										<h6> - Wind Direction: <span>{dayInfo.wind_deg+'°'}</span></h6>
										<h6> - Wind Speed: <span>{dayInfo.wind_speed+' metre/sec'}</span></h6>
										<h6> - Wind Gust: <span>{dayInfo.wind_gust+' metre/sec'}</span></h6>
									</div>
									<div className="info-box">
										<h4>Weather</h4>
										<h6> - Rain: <span>{dayInfo.weather[0].description}</span></h6>
									</div>
								</div>
								<div className="flex-box">
									<div className='hourly-btn btn-primary' onClick={()=>{setDailyForecast(false)}}><h6>Hourly Forecast</h6></div>
				    			</div>
							</div>

						</> 
					}
						
				</>:
				<HourList dt={dayInfo.dt} ontoggle = {()=> setDailyForecast(true)} indx={itemIndex} hourlyinfo={hourlyInfo}/>
			}
		</>
	);
}

export default DayList;
