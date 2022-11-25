const request = require('request')

const forecast = (lat,lon,callback)=>{
    const forecasturl = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=adb4b9e2d261083948d87f901450214b&units=metric'
    request({url:forecasturl,json:true},(error,response)=>{
        if(error){
            callback('unable to connect!',undefined)
        }else if(response.body.message){
            callback(response.body.message,undefined)
        }else{
            callback(undefined,'current temperature is '+response.body.main.temp+', description : '+response.body.weather[0].description)
        }
    })
}

module.exports=forecast