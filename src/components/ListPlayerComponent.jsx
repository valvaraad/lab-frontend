import React, { useState, useEffect } from 'react';
import { deletePlayer, listPlayers } from "../services/PlayerService.js";
import { useNavigate } from "react-router-dom";
import {listCountries} from "../services/CountryService.js";

const ListPlayerComponent = () => {
    const [players, setPlayers] = useState([]);
    const [countries, setCountries] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        fetchCountriesAndPlayers()
    }, []);

    async function fetchCountriesAndPlayers() {
        try {
            const countriesResponse = await listCountries();
            const playersResponse = await listPlayers();

            // Create a map of countries by ID for easy access
            const countriesMap = countriesResponse.data.reduce((map, country) => {
                map[country.id] = country;
                return map;
            }, {});

            setCountries(countriesMap);
            setPlayers(playersResponse.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    function getAllPlayers() {
        listPlayers().then((response) => {
            setPlayers(response.data);
        }).catch(error => {
            console.error('Failed to fetch players:', error);
        });
    }

    function addPlayer() {
        navigator('/addplayer');
    }

    function updatePlayer(id) {
        navigator(`/updateplayer/${id}`);
    }

    function removePlayer(id) {
        deletePlayer(id).then(() => {
            getAllPlayers();
        }).catch(error => {
            console.error('Error deleting player:', error);
        });
    }

    const displayCountryDetails = (countryId) => {
        const country = countries[countryId];
        const flagSrc = `https://flagsapi.com/${country.code}/flat/16.png`
        const altImg = `[${country.code}]`
        return country ? (
            <span>
                <img src={flagSrc} alt={altImg}/> <strong>{country.name}</strong> [ID: {country.id}]
            </span>
        ) : 'Country Not Found';
    };

    const usernameLink = (username) => {
        const chessComUrl = 'https://www.chess.com/member/' + username
        return (
            <a href={chessComUrl}>
                {username}
            </a>
        )
    }

    return (
        <div className='container'>
            <h2 className='text-center' style={{ marginTop: '20px', marginBottom: '30px' }}>List of players</h2>
            <button className='btn btn-primary mb-2' onClick={addPlayer}>Add player</button>
            <table className='table table-striped table-bordered table-hover rounded-3 overflow-hidden'
                   style={{ marginBottom: '81px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                <thead style={{ backgroundColor: '#f2f2f2' }} className='table-dark'>
                <tr>
                    <th>Player ID</th>
                    <th>Username/Profile</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Championship IDs</th>
                    <th width='183px'>Actions</th>
                </tr>
                </thead>
                <tbody>
                {players.map(player => (
                    <tr key={player.id}>
                        <td>{player.id}</td>
                        <td>{usernameLink(player.username)}</td>
                        <td>{player.name}</td>
                        <td>{displayCountryDetails(player.countryId)}</td>
                        <td>{player.championshipIds.join(', ')}</td>
                        <td>
                            <button className='btn btn-outline-primary' onClick={() => updatePlayer(player.id)} style={{ margin: '4px' }}>Update</button>
                            <button className='btn btn-outline-danger' onClick={() => removePlayer(player.id)} style={{ margin: '4px' }}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPlayerComponent;
