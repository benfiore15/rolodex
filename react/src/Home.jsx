import React, { useState, useEffect } from "react";

import Table from './Table';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


const Home = ({data, userType, userTypeInput, handleUserTypeInputChange, handleSubmit}) => {
    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>


            <div className="card">
                {/* <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
                </button> */}
                <form onSubmit={handleSubmit}>
                <label>
                Enter value:
                <input
                    type="text"
                    value={userTypeInput}
                    onChange={handleUserTypeInputChange}
                />
                </label>
                <button type="submit">Submit</button>
                </form>
            </div>

            <br></br>

            <div className="card">
                <h1> List of People </h1>
                <Table tableData={data} userRole={userType} />
            </div>
        </>
    );
};

export default Home;