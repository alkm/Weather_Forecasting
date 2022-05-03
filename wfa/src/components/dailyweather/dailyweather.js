import React, { useState, useEffect }from 'react';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress,getLatLng } from 'react-places-autocomplete';
import Utils from '../../utils/utils.js';
import DayList from '../daylist/daylist.js';
import './dailyweather.css';

function DailyWeather() {

	const [location, setLocation] = useState('');
	const [dailyInfo, setDailyInfo] = useState([]);
	const [hourlyInfo, setHourlyInfo] = useState([]);



	const getLocation = () => {
	  if (navigator.geolocation) {
	  	try{
	    	navigator.geolocation.getCurrentPosition(showPosition);
		}catch(err){
			alert('Geolocation not supported');
		}
	  } else {
	    alert("Geolocation is not supported by this browser.");
	  }
	}

	useEffect(() => {
		getLocation();
    }, []);

	const showPosition = (position) => {
		let lat = position.coords.latitude;
		let lng = position.coords.longitude;
		getAddress(lat, lng);
	}

	const getAddress = async(lat, lng) => {
		let apiPath = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true&key=AIzaSyBEyCSypTKbViGbjxCp_RTM7tT1FHvlNhw';
	    try {

	        let data =  await axios.get(apiPath);
	        let ads = data.data.results[0].address_components[0].long_name;
	        setLocation(ads);
	       	handleSelect(ads);
	    }catch (e) {
	        console.log(`Error+${e}`);
	    }
	}

	const handleChange = address => {
    	setLocation(address);
  	};
 
	const handleSelect = address => {
		setLocation(address);
		geocodeByAddress(address)
		  .then(results => getLatLng(results[0]))
		  .then((latLng) => {
		  		getWeatherInfo(latLng.lat, latLng.lng);
		  	})
		  .catch(error => console.error('Error', error));
	};

	const getWeatherInfo = async(lat, lng) => {
		let apiPath = Utils.getAPIDescriptipn('wfa-info');
		let payloads = {'lat': lat, 'lng': lng};
	    try {
	        let res =  await axios.post(apiPath, JSON.stringify(payloads));
	        setDailyInfo(res.data.data.daily);
	        setHourlyInfo(res.data.data.hourly)
	    }catch (e) {
	        console.log(`Error+${e}`);
	    }
	}

	return (
	<div className="daily-weather ">
		<div className="nav-bar">
			<div className="container">
				<PlacesAutocomplete
		    		value={location}
		    		onChange={handleChange}
		    		onSelect={handleSelect}
		  		>
		        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
		          <div className="relative-position">
		            <input
		              {...getInputProps({
		                placeholder: 'Search Places ...',
		                className: 'location-search-input',
		              })}
		            />
		            <i className="fas fa-search"></i>
		            <div className="autocomplete-dropdown-container">
		              {loading && <div>Loading...</div>}
		              {suggestions.map(suggestion => {
		                const className = suggestion.active
		                  ? 'suggestion-item--active'
		                  : 'suggestion-item';
		                // inline style for demonstration purpose
		                const style = suggestion.active
		                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
		                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
		                return (
		                  <div
		                    {...getSuggestionItemProps(suggestion, {
		                      className,
		                      style,
		                    })}
		                  >
		                    <span>{suggestion.description}</span>
		                  </div>
		                );
		              })}
		            </div>
		          </div>
		        )}
		      	</PlacesAutocomplete>
		  	</div>
		</div>
		<div className="container">
			<DayList hourlyinfo={hourlyInfo} dailyinfo={dailyInfo}/>
		</div>
	</div>
	);
}

export default DailyWeather;
