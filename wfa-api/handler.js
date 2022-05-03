'use strict';
const axios = require('axios');

module.exports.fetchWFA = async(event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let lat = JSON.parse(event.body).lat;
  let lng = JSON.parse(event.body).lng;
  console.log(lat+'//'+lng);
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lng+'&appid=c9dbe75128a750a4018bbf537925a6bf');
    callback (null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({status: 'Success', data: response.data})
    });
    console.log('wow');
  } catch (error) {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({status: 'Failure', message: error.body})
    });
  }
};


