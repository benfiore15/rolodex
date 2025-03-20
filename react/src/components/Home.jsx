import React, { useState, useEffect } from "react";

import Table from './Table';

import RequireAuth from "../auth/requireAuth";

import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'


const Home = ({data, loggedinUser, userType, userTypeInput, handleUserTypeInputChange, handleSubmit}) => {
    return (
        <>
            {loggedinUser ? <h1> Welcome, {loggedinUser.name}</h1> : <>
            </>}

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
                    {console.log(loggedinUser)}
                    {loggedinUser ? <Table tableData={data} userRole={userType} /> : <></>}
                </div>
        </>
    );
};

export default Home;