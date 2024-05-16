import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/countries';

export const listCountries = () => axios.get(REST_API_BASE_URL);

export const createCountry = (country) => axios.post(REST_API_BASE_URL + '/create', country)

export const getCountry = (countryId) => axios.get(REST_API_BASE_URL + '/' + countryId)

export const updateCountry = (countryId, country) => axios.put(REST_API_BASE_URL + '/' + countryId, country)

export const deleteCountry = (countryId) => axios.delete(REST_API_BASE_URL + '/' + countryId)