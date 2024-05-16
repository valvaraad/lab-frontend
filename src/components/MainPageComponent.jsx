import React from 'react';

const MainPageComponent = () => {
    const containerStyle = {
        maxWidth: '800px',
        margin: 'auto',
        marginTop: '.85rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 0 6px 2px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        position: 'relative'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#343a40',
        fontSize: '2rem',
        fontWeight: 'bold'
    };

    const listStyle = {
        listStyleType: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        maxWidth: '1000px',
        margin: '0 auto',
        paddingLeft: '20px',
        paddingRight: '20px'
    };

    const listItemStyle = {
        marginBottom: '10px',
        padding: '10px 20px',  // Retain custom padding
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        width: '23%',  // Control width
        boxSizing: 'border-box',
        display: 'block',  // Ensures the button behaves as a block element
        fontSize: '14px'  // Custom font size
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold'
    };

    const codeStyle = {
        backgroundColor: 'rgba(27, 31, 35, 0.05)',
        padding: '2px 4px',
        borderRadius: '4px'
    };

    const imgStyle = {
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        marginLeft: '0',
        marginRight: 'auto',
        marginBottom: '1.5rem'
    };


    const h2Style = {
        ...headerStyle,
        marginTop: '2rem',
        marginBottom: '1.5rem',
        textAlign: 'left'
    };

    const handleTechnologyClick = (url) => {
        window.location.href = url;
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>World Chess Championship Participant Information</h1>
            <p>This application supports <code style={codeStyle}>GET</code>, <code style={codeStyle}>POST</code>,
                <code style={codeStyle}>PUT</code>, and <code style={codeStyle}>DELETE</code>
                requests for a database that contains lists of players, their countries of origin, and the World Chess
                Championships in which they have participated.</p>
            <h2 style={h2Style}>Technologies Used</h2>
            <ul style={listStyle}>
                <button style={listItemStyle} className="btn btn-outline-dark"
                        onClick={() => handleTechnologyClick('https://openjdk.org')}>
                    <strong>OpenJDK 21</strong>
                </button>
                <button style={listItemStyle} className="btn btn-outline-dark"
                        onClick={() => handleTechnologyClick('https://spring.io/projects/spring-boot')}>
                    <strong>Spring Boot 3.2.3</strong>
                </button>
                <button style={listItemStyle} className="btn btn-outline-dark"
                        onClick={() => handleTechnologyClick('https://maven.apache.org')}>
                    <strong>Maven 3.9.6</strong>
                </button>
                <button style={listItemStyle} className="btn btn-outline-dark"
                        onClick={() => handleTechnologyClick('https://www.postgresql.org')}>
                    <strong>PostgreSQL 16.2</strong>
                </button>
                <button style={listItemStyle} className="btn btn-outline-dark"
                        onClick={() => handleTechnologyClick('https://react.dev')}>
                    <strong>React 18.2.0</strong>
                </button>
                <button style={listItemStyle} className="btn btn-outline-dark"
                        onClick={() => handleTechnologyClick('https://vitejs.dev')}>
                    <strong>Vite 5.2.01</strong>
                </button>
                <button style={listItemStyle} className="btn btn-outline-dark"
                        onClick={() => handleTechnologyClick('https://axios-http.com')}>
                    <strong>Axios 1.6.8</strong>
                </button>
                <button style={listItemStyle} className="btn btn-outline-dark"
                        onClick={() => handleTechnologyClick('https://getbootstrap.com')}>
                    <strong>Bootstrap 5.3.3</strong>
                </button>

            </ul>
            <h2 style={h2Style}>Quality and Code Health</h2>
            <a style={linkStyle} href="https://sonarcloud.io/summary/new_code?id=valvaraad_term4-java">
                <img style={imgStyle}
                     src="https://sonarcloud.io/api/project_badges/measure?project=valvaraad_term4-java&metric=alert_status"
                     alt="Quality Gate Status"/>
            </a>
            <p style={{marginTop: '1.5rem'}}>Click the badge above to view the detailed code quality report
                and static analysis results on SonarCloud.</p>
        </div>
    );
};

export default MainPageComponent;
