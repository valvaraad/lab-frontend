import React, {useEffect, useState} from 'react';
import {createPlayer, getPlayer, updatePlayer} from "../services/PlayerService.js";
import {useNavigate, useParams} from "react-router-dom";
import {listCountries} from "../services/CountryService.js";
import {listChampionships} from "../services/ChampionshipService.js";

const PlayerComponent = () => {

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [countryIdInput, setCountryIdInput] = useState('')
    const [countryId, setCountryId] = useState(null);
    const [championshipIdsInput, setChampionshipIdsInput] = useState('');
    const [championshipIds, setChampionshipIds] = useState([]);
    const [error, setError] = useState('');
    const [countries, setCountries] = useState([]);
    const [championships, setChampionships] = useState([])
    const [errorTimestamp, setErrorTimestamp] = useState('');

    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        async function fetchCountries() {
            try {
                const response = await listCountries();
                setCountries(response.data); // Assuming the data is directly usable
            } catch (error) {
                console.error('Failed to fetch countries:', error);
            }
        }

        async function fetchChampionships() {
            try {
                const response = await listChampionships()
                setChampionships(response.data);
            } catch (error) {
                console.error('Failed to fetch championships', error)
            }
        }

        async function fetchPlayer() {
            if (id && !championshipIdsInput && !countryId) {
                try {
                    const response = await getPlayer(id);
                    setUsername(response.data.username);
                    setName(response.data.name);
                    setCountryId(response.data.countryId); // Установка countryId здесь
                    setCountryIdInput(String(response.data.countryId));
                    setChampionshipIdsInput(response.data.championshipIds.join(', '));
                } catch (error) {
                    console.error('Failed to fetch player:', error);
                }
            }
        }

        function handleOtherLogic() {
            handleCountryIdAsNumber();
            processChampionships();
        }

        fetchCountries();
        fetchChampionships()
        fetchPlayer();
        handleOtherLogic();
    }, [id, championshipIdsInput, countryId]);

    function handleCountryIdAsNumber() {
        const intCountryId = parseInt(countryIdInput, 10);
        if (!isNaN(intCountryId)) {
            setCountryId(intCountryId);
        } else {
            setCountryId(null);
        }
    }

    function processChampionships() {
        const values = championshipIdsInput.split(/[\s,;]+/)
            .filter(Boolean)
            .map(id => parseInt(id, 10))
            .filter(number => !isNaN(number));

        setChampionshipIds(values);
    }

    function saveOrUpdatePlayer(e) {
        e.preventDefault();
        handleCountryIdAsNumber();

        processChampionships();

        const player = {username, name, countryId, championshipIds}
        console.log(player.countryId)

        if (id) {
            console.log(player)
            updatePlayer(id, player).then((response) => {
                console.log(response.data)
                navigator('/players')
            }).catch(error => {
                if (error.response) {
                    console.error('API error:', error.response.status, error.response.data);
                    setError(`(${error.response.status}) Error: "${error.response.data.message}"`)
                    setErrorTimestamp(`Timestamp: ${error.response.data.timestamp}`)
                }
            })
        } else {

            createPlayer(player).then((response) => {
                console.log(response.data)
                navigator('/players')
            }).catch(error => {
                if (error.response) {
                    console.error('API error:', error.response.status, error.response.data);
                    setError(`(${error.response.status}) Error: "${error.response.data.message}"`)
                    setErrorTimestamp(`Timestamp: ${error.response.data.timestamp}`)
                }
            })
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center' style={{marginTop: '8px'}}>Update player</h2>
        } else {
            return <h2 className='text-center' style={{marginTop: '8px'}}>Add player</h2>
        }
    }

    function handleChampionshipChange(championshipId, isChecked) {
        setChampionshipIds(prevIds => {
            const newIds = new Set(prevIds); // Use a Set to avoid duplicates and easy manageability
            if (isChecked) {
                newIds.add(championshipId);
            } else {
                newIds.delete(championshipId);
            }
            return Array.from(newIds);
        });
    }

    return (
        <div className='container'>
            <br/>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Username</label>
                                <input
                                    type='text'
                                    placeholder='Enter player username'
                                    name='username'
                                    value={username}
                                    className='form-control'
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter player name'
                                    name='name'
                                    value={name}
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Country</label>
                                <select value={countryId} onChange={(e) => setCountryIdInput(e.target.value)}
                                        onBlur={handleCountryIdAsNumber}
                                        className="form-control">
                                    <option value="">Select a Country</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group'style={{marginBottom: '7px'}} id='checkbox-div'>
                                <label>Championships:</label>
                                {championships.map(champ => (
                                    <div key={champ.id} className='form-check' id='checkmark-div'>
                                        <label style={{marginTop: '4px', marginBottom: '0px'}} id='checkbox-label'>
                                            <input
                                                className='form-check-input'
                                                type="checkbox"
                                                checked={championshipIds.includes(champ.id)}
                                                onChange={(e) => handleChampionshipChange(champ.id, e.target.checked)}
                                                style={{marginTop: '4px', marginBottom: '4px'}}
                                            />
                                            {champ.year}, {champ.place}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdatePlayer}>Submit</button>
                        </form>
                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                                <br/>
                                {errorTimestamp}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerComponent;