import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/players';

export const listPlayers = () =>  axios.get(REST_API_BASE_URL);

export const createPlayer = (player) => axios.post(REST_API_BASE_URL + '/create', player)

export const getPlayer = (playerId) => axios.get(REST_API_BASE_URL + '/' + playerId)

export const updatePlayer = (playerId, player) => axios.put(REST_API_BASE_URL + '/' + playerId, player)

export const deletePlayer = (playerId) => axios.delete(REST_API_BASE_URL + '/' + playerId)