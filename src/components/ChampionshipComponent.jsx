import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {createChampionship, getChampionship, updateChampionship} from "../services/ChampionshipService.js";

const ChampionshipComponent = () => {

    const [place, setPlace] = useState('');
    const [year, setYear] = useState(null);
    const [yearInput, setYearInput] = useState('');
    const [error, setError] = useState('');
    const [errorTimestamp, setErrorTimestamp] = useState('');

    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        async function fetchChampionship() {
            if (id) {
                try {
                    const response = await getChampionship(id);
                    setYearInput(String(response.data.year));
                    setPlace(response.data.place);
                } catch (error) {
                    console.error('Failed to fetch championship:', error);
                }
            }
        }

        fetchChampionship();
        handleYearAsNumber();
    }, [id]);



    function handleYearAsNumber() {
        const intYear = parseInt(yearInput, 10)
        if (!isNaN(intYear)) {
            setYear(intYear);
        } else {
            setYear(null);
        }
    }

    function saveOrUpdateChampionship(e) {
        e.preventDefault();
        handleYearAsNumber();

        const championship = {year, place}
        console.log(championship);

        if (id) {
            updateChampionship(id, championship).then((response) => {
                console.log(response.data)
                navigator('/championships')
            }).catch(error => {
                if (error.response) {
                    console.error('API error:', error.response.status, error.response.data);
                    setError(`(${error.response.status}) Error: "${error.response.data.message}"`)
                    setErrorTimestamp(`Timestamp: ${error.response.data.timestamp}`)
                }
            })
        } else {
            createChampionship(championship).then((response) => {
                console.log(response.data)
                navigator('/championships')
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
            return <h2 className='text-center' style={{marginTop: '8px'}}>Update championship</h2>
        } else {
            return <h2 className='text-center' style={{marginTop: '8px'}}>Add championship</h2>
        }
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
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter championship year'
                                    name='year'
                                    value={yearInput}
                                    className='form-control'
                                    onChange={(e) => setYearInput(e.target.value)}
                                    onBlur={handleYearAsNumber}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Place</label>
                                <input
                                    type='text'
                                    placeholder='Enter championship place'
                                    name='place'
                                    value={place}
                                    className='form-control'
                                    onChange={(e) => setPlace(e.target.value)}
                                />
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateChampionship}>Submit</button>
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

export default ChampionshipComponent;