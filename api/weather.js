import axios from "axios";
import { API_KEY } from "../config";

const forecastEndpoint = (city, days) => {
    return `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=${days}&key=${API_KEY}`;
}

const locationEndpoint = (city) => {
    return `https://api.weatherapi.com/v1/search.json?q=${city}&key=${API_KEY}`;
}

const requestApi = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint
    }

    try {
        const response = await axios.request(options);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const getForecast = async (city, days) => {
    const endpoint = forecastEndpoint(city, days);
    return await requestApi(endpoint);
}

export const getLocation = async (city) => {
    const endpoint = locationEndpoint(city);
    return await requestApi(endpoint);
}


