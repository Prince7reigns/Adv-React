import { useState,useEffect } from 'react'
import Input from './elem/Input'
import Button from "./elem/Button"

type WeatherT = {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

const Weather = () => {

  const [city, setCity] = useState<string>('india');
  const [weather,setWeather]=useState<WeatherT|null>(null)
  const [loading,setLoading]=useState<boolean>(true)
  const [error,setError]=useState<string>('')

  useEffect(()=>{
     fetchWeather(city)
  },[])

  async function fetchWeather(c:string){
    setLoading(true)
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=bd5e378503939ddaee76f12ad7a97608&units=metric`)
        const data = await res.json()
        console.log(data)
        if(data.cod==404 || data.cod==400){
          console.log("just an error")
          setError(data.message)
        }else{
          setWeather({
            city: data.name,
            temperature: data.main?.temp ?? 0,
            humidity: data.main?.humidity ?? 0,
            windSpeed: data.wind?.speed ?? 0,
          })
        }
      } catch (error:any) {
        console.log(error.message)
      }finally{
        setLoading(false)
      }
  }

  return (
    <div className='min-h-screen bg-gray-100 shadow-md grid grid-cols-3 h-screen p-4 rounded-lg'>
      <div className="col-span-2 grid grid-cols-3 gap-4 bg-blue-200 p-4 rounded-lg shadow-md mb-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className='text-red-500 text-lg font-semibold'>{error}</p>
        ) : weather ? (
          <div className='col-span-3 bg-white p-4 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>{weather.city}</h2>
            <p className='text-lg'>Temperature: {weather.temperature}°C</p>
            <p className='text-lg'>Humidity: {weather.humidity}%</p>
            <p className='text-lg'>Wind Speed: {weather.windSpeed} m/s</p>
          </div>
        ) : (
          <p>Enter a city to get weather information.</p>
        )}

      </div>

      <div className="col-span-1 flex flex-col items-center gap-2 m-4 h-min bg-white p-4 rounded-lg shadow-md">
            <Input
                type="text"
                title='city'
                value={city}
                className=" h-full text-lg border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                placeholder='Enter city name'
                onChange={(e)=>setCity(e.target.value)}
            />
            <Button
                title='getWeatherBtn'
                onClick={()=>fetchWeather(city)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-md cursor-pointer transition-colors duration-300 ml-2 text-lg"
            >
                Get Weather
            </Button>
      </div>
    </div>
  )
}

export default Weather
