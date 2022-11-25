const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const publicDirectory = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialDirectory = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsDirectory)
hbs.registerPartials(partialDirectory)

app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Rajesh Alajangi',
        
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('please provide an address')
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
          return  res.send({error})
        }
        forecast(data.lat,data.lon,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecastData,
                data
            })
        })

        
    })
    // res.send({
    //     location:'delhi',
    //     forecasting:'snowing',
    //     address:req.query.address
    // })
})
app.get('/help/*',(req,res)=>{
    res.send('help article not found')
})

app.get('*',(req,res)=>{
    res.render('error')
})

//listen on port
app.listen(3000,()=>{
    console.log('server running port 3000')
})

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))