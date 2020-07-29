import React, { useState, useEffect } from 'react';
import './App.css';

const axios = require('axios')

function App() {
  const [city, setCity] = useState('')
  const [dados, setDados] = useState([])
  const [addBtn, isAddBtn] = useState(true)

  useEffect(() => {
    async function requisição() {
      const responseIP = await axios.get('https://api.ipify.org')
      let ip = responseIP.data

      const responseGEO = await axios.get('http://ip-api.com/json/' + ip)
      let geo = responseGEO.data
      console.log(geo.city)

      requestAPI(geo.city)
    }

    requisição()
  }, [])

  async function requestAPI(cidade) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}`, {
      params: {
        appid: '9422a4dbd1cc9b3a0e4d8412b8b2b5e6',
        lang: 'pt_br',
        units: 'metric',
      }
    })

    console.log(response.data)
    setDados([
      ...dados,
      response.data
    ])
  }

  return (
    <div className="App">
      { addBtn === true
        ? (
          <div>
            <button onClick={() => isAddBtn(!addBtn)}>Adicionar</button>
          </div>
        )
        : (
          <div>
            <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
            <button onClick={() => { requestAPI(city); setCity(''); isAddBtn(!addBtn) }}>Pesquisar</button>
          </div>
        )   
      }

      { dados.length === 0 
        ? (null)
        : (
          <div>
            <text>{ dados[0].wind.speed + 'm/s' }</text>
            <text>{ dados[0].weather[0].description }</text>
            <text>{ "Nascer do sol: " + new Date(dados[0].sys.sunrise*1000).toLocaleTimeString() }</text>
            <text>{ "Pôr do sol: " + new Date(dados[0].sys.sunset*1000).toLocaleTimeString() }</text>
            <div>
              <text>{ dados[0].main.temp + "°" }</text>
              <text>{ dados[0].name + " - " + dados[0].sys.country }</text>
            </div>
          </div>
        )  
      }

      <br/>

      { dados.map((element, index) => {
        if(index !== 0) {
          return (
            <div key={index}>
              <text>{ element.wind.speed + 'm/s' }</text>
              <text>{ element.weather[0].description }</text>
              <text>{ "Nascer do sol: " + new Date(element.sys.sunrise*1000).toLocaleTimeString() }</text>
              <text>{ "Pôr do sol: " + new Date(element.sys.sunset*1000).toLocaleTimeString() }</text>
              <div>
                <text>{ element.main.temp + "°" }</text>
                <text>{ element.name + " - " + element.sys.country }</text>
              </div>
            </div>
          )
        }
      }) }
    </div>
  );
}

export default App;