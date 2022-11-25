const request = require('request')

const geocode = (address,callback)=>{
    const url= 'https://api.openweathermap.org/geo/1.0/direct?q='+encodeURIComponent(address)+'&limit=1&appid=adb4b9e2d261083948d87f901450214b'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect',undefined)
        }else if(response.body.length===0){
            callback('unable to find the location',undefined)
        }else{
            callback(undefined,{
                'lat':response.body[0].lat,
                'lon':response.body[0].lon,
                'name':response.body[0].name,
                'state':response.body[0].state

            })
        }
    })


}

module.exports = geocode