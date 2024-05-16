import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {deleteChampionship, listChampionships} from "../services/ChampionshipService.js";
import {listPlayers} from "../services/PlayerService.js";
import {listCountries} from "../services/CountryService.js";

const ListChampionshipComponent = () => {

    const [championships, setChampionships] = useState([]);
    const [players, setPlayers] = useState([]);
    const [countries, setCountries] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        fetchPlayersAndCountries()
        getAllChampionships()
    }, []);

    function getAllChampionships() {
        listChampionships().then((response) => {
            setChampionships(response.data);
        }).catch(error => {
            console.error('Failed to fetch players:', error);
        });
    }

    async function fetchPlayersAndCountries() {
        try {

            const countriesResponse = await listCountries()
            const playersResponse = await listPlayers()

            const countriesMap = countriesResponse.data.reduce((map, country) => {
                map[country.id] = country;
                return map;
            }, {})

            const playersMap = playersResponse.data.reduce((map, player) => {
                const country = countriesMap[player.countryId]
                map[player.id] = { ...player, country: country };
                return map;
            }, {})

            setCountries(countriesMap)
            setPlayers(playersMap)
        } catch(error) {
            console.error('Failed to fetch data:', error);
        }
    }


    function addChampionship() {
        navigator('/addchampionship');
    }

    function updateChampionship(id) {
        navigator(`/updatechampionship/${id}`)
    }

    function removeChampionship(id) {
        deleteChampionship(id).then(() => {
            getAllChampionships()
        }).catch(error => {
            console.error('Error deleting player:', error);
        });
    }

    const displayPlayerDetails = (playerId) => {
        const player = players[playerId];
        const countryCode = player?.country?.code ? `${player.country.code}` : "No country";
        const countryName = player?.country?.name ? `${player.country.name}` : "Unknown Country";
        const flagSrc = player?.country ? `https://flagsapi.com/${countryCode}/flat/16.png` : '';
        const flagTitle = `${countryName} [${countryCode}]`;
        const altImg = `[${countryCode}]`

        return player ? (
            <span>
            {player.country && <img src={flagSrc} alt={altImg} title={flagTitle}/>}
                <strong> {player.name}</strong> [<span className="country-code">ID: {player.id}</span>]
        </span>
        ) : 'Player not found';
    };



    return (
        <div className='container'>
            <h2 className='text-center' style={{marginTop: '20px', marginBottom: '30px'}}>List of championships</h2>
            <button className='btn btn-primary mb-2' onClick={addChampionship}>Add championship</button>
            <table className='table table-striped table-bordered table-hover rounded-3 overflow-hidden'
                   style={{marginBottom: '81px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                <thead style={{backgroundColor: '#f2f2f2'}} className='table-dark'>
                <tr>
                    <th>Championship ID</th>
                    <th>Year</th>
                    <th>Place</th>
                    <th>Players</th>
                    <th width='183px'>Actions</th>
                </tr>
                </thead>
                <tbody>
                {championships.map(championship => (
                    <tr key={championship.id}>
                        <td>{championship.id}</td>
                        <td>{championship.year}</td>
                        <td>{championship.place}</td>
                        <td>
                            {championship.playerIds.map((id, index) => (
                                <div key={id}>
                                    {displayPlayerDetails(id)}
                                    {index !== championship.playerIds.length - 1 ? <br/> : null}
                                </div>
                            ))}
                        </td>
                        <td>
                            <button className='btn btn-outline-primary'
                                    onClick={() => updateChampionship(championship.id)}
                                    style={{margin: '4px'}}>Update
                            </button>
                            <button className='btn btn-outline-danger'
                                    onClick={() => removeChampionship(championship.id)}
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

export default ListChampionshipComponent;