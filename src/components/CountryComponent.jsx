import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {createCountry, getCountry, updateCountry} from "../services/CountryService.js";

const CountryComponent = () => {

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [errorTimestamp, setErrorTimestamp] = useState('');

    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getCountry(id).then(response => {
                setName(response.data.name);
                setCode(response.data.code);
            }).catch(error => {
                console.error('Failed to fetch country:', error);
                setError('Failed to fetch data');
                if (error.response) {
                    setErrorTimestamp(`Timestamp: ${error.response.data.timestamp}`);
                }
            });
        }
    }, [id]);

    function saveOrUpdateCountry(e) {
        e.preventDefault();
        const country = {name, code}


        if (id) {
            console.log(country)
            updateCountry(id, country).then((response) => {
                console.log(response.data)
                navigator('/countries')
            }).catch(error => {
                if (error.response) {
                    console.error('API error:', error.response.status, error.response.data);
                    setError(`(${error.response.status}) Error: "${error.response.data.message}"`)
                    setErrorTimestamp(`Timestamp: ${error.response.data.timestamp}`) }
            })
        } else {
            createCountry(country).then((response) => {
                console.log(response.data)
                navigator('/countries')
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
            return <h2 className='text-center' style={{marginTop: '8px'}}>Update country</h2>
        } else {
            return <h2 className='text-center' style={{marginTop: '8px'}}>Add country</h2>
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
                                    placeholder='Enter country name'
                                    name='name'
                                    value={name}
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Code</label>
                                <input
                                    type='text'
                                    placeholder='Enter country code'
                                    name='code'
                                    value={code}
                                    className='form-control'
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateCountry}>Submit</button>
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

export default CountryComponent;