import React, { useState, useEffect }from 'react';
import Utils from '../../utils/utils.js';
import './hourlist.css';

function HourList(props) {

    const [hourlyInfo, setHourlyInfo] = useState([]);
    const [hourIndx, setHourIndx] = useState(0);
    const [strt, setStrt] = useState(0);
    const [mx, setMx] = useState(24);
    const [noData, setNoData] = useState(false);
    const [dt, setDt] = useState('');

    useEffect(() => {
        if(props.hourlyinfo.length > 0){
            let hi = props.hourlyinfo;
            setHourlyInfo(hi);
        }
    }, [props.hourlyinfo]);

    useEffect(() => {
        setHourIndx(props.indx);
        if(props.indx === 0){
            setStrt(0);
            setMx(24);
            setNoData(false);
        }else if(props.indx === 1){
            setStrt(23);
            setMx(48);
            setNoData(false);
        }else{
            setNoData(true);
        }

        setDt(props.dt);

    }, [props.indx]);


    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    return (
        <div className="hourly-weather">
            <h2>Hourly Forecast <span>{hourlyInfo.length > 0 && Utils.formatDate(new Date(dt*1000))}</span></h2>
        	<div className="info-grid">
        		<div className="grid-header">
        			<div className="grid-subheader flex-box">
                        <div className="sub-group">
                            <div><h4>Hour</h4></div>
                            <div className="flex-box">
                                <div className="grp-itm">
                                    <h6>Daily Hour</h6>
                                </div>
                            </div>
                        </div>
        				<div className="sub-group">
        					<div><h4>Precipitation</h4></div>
        					<div className="flex-box">
        						<div className="grp-itm">
                                    <h6>Cloud(%)</h6>
                                </div>
        						<div className="grp-itm">
                                    <h6>Humidity(%)</h6>
                                </div>
        						<div className="grp-itm">
                                    <h6>Rain(mm)</h6>
                                </div>
        						<div className="grp-itm">
                                    <h6>Pressure(hpa)</h6>
                                </div>
        					</div>
        				</div>
                        <div className="sub-group">
                            <div><h4>Temperature</h4></div>
                            <div className="flex-box">
                                <div className="grp-itm">
                                    <h6>Temperature to be recorded(°C)</h6>
                                </div>
                            </div>
                        </div>
                        <div className="sub-group">
                            <div><h4>Wind</h4></div>
                            <div className="flex-box">
                                <div className="grp-itm">
                                    <h6>Direction(°)</h6>
                                </div>
                                <div className="grp-itm">
                                    <h6>Speed(m/s)</h6>
                                </div>
                                <div className="grp-itm">
                                    <h6>Gust(m/s)</h6>
                                </div>
                            </div>
                        </div>
                        <div className="sub-group">
                            <div><h4>Weather</h4></div>
                            <div className="flex-box">
                                <div className="grp-itm">
                                    <h6>Intensity of Raining</h6>
                                </div>
                            </div>
                        </div>
        			</div>
        		</div>
                {noData ? <div className="no-data-msg">No hourly forecast available for this day.</div> :
                    <div className="grid-body">
                        {
                            (hourlyInfo.length > 0) && React.Children.toArray(hourlyInfo.slice(strt,mx).map((itm, indx) => (
                            <div className="grid-subheader flex-box">
                                <div className="sub-group">
                                    <div><h4>Daily Hour</h4></div>
                                    <div className="flex-box">
                                        <div className="grp-itm">
                                            <h6>Daily Hour</h6>
                                            <span>{formatAMPM(new Date(itm.dt*1000))}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sub-group">
                                    <div className="flex-box">
                                        <div className="grp-itm">
                                            <h6>Cloud(%)</h6>
                                            <span>{itm.clouds}</span>
                                        </div>
                                        <div className="grp-itm">
                                            <h6>Humidity(%)</h6>
                                            <span>{itm.humidity}</span>
                                        </div>
                                        <div className="grp-itm">
                                            <h6>Rain(mm)</h6>
                                            <span>{itm.rain && itm.rain['1h']}</span>
                                        </div>
                                        <div className="grp-itm">
                                            <h6>Pressure(hPa)</h6>
                                            <span>{itm.pressure}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sub-group">
                                    <div className="flex-box">
                                        <div className="grp-itm tmp">
                                            <h4>Temperature to be recorded(°C)</h4>
                                            <span>{(parseFloat(itm.temp) - 273.15).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sub-group">
                                    <div className="flex-box">
                                        <div className="grp-itm">
                                            <h6>Direction(°)</h6>
                                            <span>{itm.wind_deg}</span>
                                        </div>
                                        <div className="grp-itm">
                                            <h6>Speed(m/s)</h6>
                                            <span>{itm.wind_speed}</span>
                                        </div>
                                        <div className="grp-itm">
                                            <h6>Gust(m/s)</h6>
                                            <span>{itm.wind_gust}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sub-group">
                                   
                                    <div className="flex-box">
                                        <div className="grp-itm">
                                            <h6>Intensity of Raining</h6>
                                            <span>{itm.weather[0].description}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )))
                        }
                    </div>
                }
                <div className="flex-box">
                    <div className='hourly-btn btn-primary' onClick={()=>{props.ontoggle()}}><h6>Daily Forecast</h6></div>
                </div>
        	</div>
        </div>
    );
}
export default HourList;
