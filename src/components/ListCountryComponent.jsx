import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {deleteCountry, listCountries} from "../services/CountryService.js";
import {listPlayers} from "../services/PlayerService.js";

const ListCountryComponent = () => {

    const [countries, setCountries] = useState([]);
    const [players, setPlayers] = useState([]);
    const navigator = useNavigate()

    useEffect(() => {
        fetchPlayers()
        getAllCountries()
    }, []);

    async function fetchPlayers() {
        try {
            const playersResponse = await listPlayers()

            const playersMap = playersResponse.data.reduce((map, player) => {
                map[player.id] = player;
                return map;
            }, {})

            setPlayers(playersMap)
        } catch(error) {
            console.error('Failed to fetch data:', error);
        }
    }

    function getAllCountries() {
        listCountries().then((response) => {
            console.log(response.data)
            setCountries(response.data);
        }).catch(error => {
            console.error('Failed to fetch players:', error);
        });
    }

    function addCountry() {
        navigator('/addcountry');
    }

    function updateCountry(id) {
        navigator(`/updatecountry/${id}`);
    }

    function removeCountry(id) {
        deleteCountry(id).then(() => {
            getAllCountries()
        }).catch(error => {
            console.error('Error deleting player:', error);
        });
    }

    const displayPlayerDetails = (playerId) => {
        const player = players[playerId]
        return player ? (
            <span>
                [ID: {player.id}] <strong>{player.name}</strong>
            </span>
        ) : 'Player not found'
    }

    const displayCountryFlag = (countryId) => {
        const country = countries.find(c => c.id === countryId);
        console.log(country)
        const flagSrc = `https://flagsapi.com/${country.code}/flat/16.png`
        if (!country) return 'Not found'
        return (
            <span>
                <img src={flagSrc} alt={'!'}/> <strong>{country.name}</strong>
            </span>
        );
    }


    return (
        <div className='container'>
            <h2 className='text-center' style={{marginTop: '20px', marginBottom: '30px'}}>List of countries</h2>
            <button className='btn btn-primary mb-2' onClick={addCountry}>Add country</button>
            <table className='table table-striped table-bordered table-hover rounded-3 overflow-hidden'
                   style={{marginBottom: '81px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                <thead style={{backgroundColor: '#f2f2f2'}} className='table-dark'>
                <tr>
                    <th>Country ID</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Player IDs</th>
                    <th width='183px'>Actions</th>
                </tr>
                </thead>
                <tbody>
                {countries.map(country => (
                    <tr key={country.id}>
                        <td>{country.id}</td>
                        <td>{displayCountryFlag(country.id)}</td>
                        <td>{country.code}</td>
                        <td>
                            {country.playerIds.map((id, index) => (
                                <div key={id}>
                                    {displayPlayerDetails(id)}
                                    {index !== country.playerIds.length - 1 ? <br/> : null}
                                </div>
                            ))}
                        </td>
                        <td>
                            <button className='btn btn-outline-primary' onClick={() => updateCountry(country.id)}
                                    style={{margin: '4px'}}>Update
                            </button>
                            <button className='btn btn-outline-danger' onClick={() => removeCountry(country.id)}
                                    style={{margin: '4px'}}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCountryComponent;