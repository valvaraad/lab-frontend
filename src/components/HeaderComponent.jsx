import React from 'react';

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-dark bg-dark navbar-expand-lg' >
                    <a className="navbar-brand" href="http://localhost:3000"
                       style={{marginLeft: '20px'}}>
                        Home
                    </a>
                    <ul className="navbar-nav me-auto">
                        <li className='nav-item m-sm-2'>
                            <button className='btn btn-outline-light'
                                    onClick={() => window.location.href = 'http://localhost:3000/players'}>
                                Players
                            </button>
                        </li>
                        <li className='nav-item m-sm-2'>
                            <button className='btn btn-outline-light'
                                    onClick={() => window.location.href = 'http://localhost:3000/countries'}>
                                Countries
                            </button>
                        </li>
                        <li className='nav-item m-sm-2'>
                            <button className='btn btn-outline-light'
                                    onClick={() => window.location.href = 'http://localhost:3000/championships'}>
                                Championships
                            </button>
                        </li>
                        <li className='nav-item m-sm-2'>
                            <button className='btn btn-outline-light'
                                    onClick={() => window.location.href = 'http://localhost:8080'}>
                                Swagger UI
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;