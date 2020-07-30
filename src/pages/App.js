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
        appid: 'SUA_API_KEY_DO_OPENWEATHER',
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
      <div className='pageHeader'>
        <div className='pageHeaderButton'>
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
        </div>

        { dados.length === 0 
          ? (null)
          : (
            <div className='pageHeaderContent'>
              <div className='pageHeaderContentData'>
                <div className='content'>
                  <text>{ dados[0].wind.speed + 'm/s' }</text>
                </div>
                <div className='content'>
                  <text>{ dados[0].weather[0].description }</text>
                </div>
                <div className='content'>
                  <text>{ "Nascer do sol: " + new Date(dados[0].sys.sunrise*1000).toLocaleTimeString() }</text>
                </div>
                <div className='content'>
                  <text>{ "Pôr do sol: " + new Date(dados[0].sys.sunset*1000).toLocaleTimeString() }</text>
                </div>
              </div>
              <div className='pageHeaderContentData' id='contentRight'>
                <div className='dataTemp'>
                  <text>{ dados[0].main.temp + "°" }</text>
                </div>
                <div className='dataName'>
                  <text>{ dados[0].name + " - " + dados[0].sys.country }</text>
                </div>
              </div>
            </div>
          )  
        }
      </div>

      { dados.map((element, index) => {
        if(index !== 0) {
          return (
            <div key={index} className='outerContent'>
              <div className='pageHeaderContentData' >
                <div className='content'>
                  <text>{ element.wind.speed + 'm/s' }</text>
                </div>
                <div className='content'>
                  <text>{ element.weather[0].description }</text>
                </div>
                <div className='content'>
                  <text>{ "Nascer do sol: " + new Date(element.sys.sunrise*1000).toLocaleTimeString() }</text>
                </div>
                <div className='content'>
                  <text>{ "Pôr do sol: " + new Date(element.sys.sunset*1000).toLocaleTimeString() }</text>
                </div>
              </div>
              <div className='pageHeaderContentData' id='contentRight2'>
                <div className='dataTemp'>
                  <text>{ element.main.temp + "°" }</text>
                </div>
                <div className='dataName'>
                  <text>{ element.name + " - " + element.sys.country }</text>
                </div>
              </div>
            </div>
          )
        }
      }) }
    </div>
  );
}

export default App;
