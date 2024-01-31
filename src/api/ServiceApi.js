const API_KEY = 'WFlTwaxGi0jZYveAT9fFhlCVq0pgwQ9A';


const apiAutoComplete = async (q) => {
 
    const stringFetch = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${q}&language=en-us`;
    const response = await fetch(stringFetch);
    const data = await response.json();


    return ({ key: data[0].Key, name: data[0].LocalizedName });
}

const apiLocationWeatherDaily = async (LocationCode) => {
   
    const stringFetch = `http://dataservice.accuweather.com/currentconditions/v1/${LocationCode}?apikey=${API_KEY}&language=en-us&details=true`; // Set details=true to include WeatherText
    const response = await fetch(stringFetch);
    const data = await response.json();

    return {
        date: data[0].LocalObservationDateTime,
        Temperature: data[0].Temperature.Metric.Value,
        WeatherText: data[0].WeatherText,
        WeatherIcon: data[0].WeatherIcon,
       
    };
};

const apilocationWeatherFiveDays = async (LocationCode) => {

    const stringFetch = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${LocationCode}?apikey=${API_KEY}&language=en-us&details=false&metric=true`
    const response = await fetch(stringFetch);
    const data = await response.json();

    let result = [];
    
    data.DailyForecasts.forEach(element => {
        result.push(
            { date: element.Date, Temperature: element.Temperature.Minimum.Value,Day:element.Day,Night:element.Night });
    });
  
    return result;
}

module.exports = { apilocationWeatherFiveDays, apiLocationWeatherDaily, apiAutoComplete }
