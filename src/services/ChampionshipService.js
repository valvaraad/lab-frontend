import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/championships';

export const listChampionships = () =>  axios.get(REST_API_BASE_URL);

export const createChampionship = (championship) => axios.post(REST_API_BASE_URL + '/create', championship)

export const getChampionship = (championshipId) => axios.get(REST_API_BASE_URL + '/' + championshipId)

export const updateChampionship = (championshipId, championship) =>
    axios.put(REST_API_BASE_URL + '/' + championshipId, championship)

export const deleteChampionship = (championshipId) => axios.delete(REST_API_BASE_URL + '/' + championshipId)