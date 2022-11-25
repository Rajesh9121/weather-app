
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#one')
const messageTwo = document.querySelector('#two')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageTwo.textContent = 'Loading...'
    messageOne.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }else{
            console.log(data.forecastData)
            messageOne.textContent = data.forecastData
            messageTwo.textContent = data.data.name +', '+ data.data.state

        }
    })
}))
})