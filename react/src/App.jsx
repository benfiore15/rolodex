import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

import './App.css'

import Header from './components/Header.jsx';
import Home from "./components/Home.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Table from './components/Table.jsx';

import HR_Table from "./HR_Table";

function App() {
  const [count, setCount] = useState(0)

  const [loggedinUser, setLoggedInUser] = useState({})

  const [data, setData] = useState([])
  const [hrData, setHRData] = useState([])
  const [managerData, setManagerData] = useState([])
  const [userType, setUserType] = useState();

  const [userTypeInput,  setUserTypeInput] = useState('')

  // useEffect(() => {
  //   const currState = sessionStorage.getItem(userType);
  //   sessionStorage.setItem('userType', userType)
  //   console.log(`Session Storage Added for `)
  //   return currState !== null ? JSON.parse(currState) : "HR";
  // }, [])


  useEffect(() => {
    console.log(`NEW USER LOGIN FOR ${loggedinUser.name}`)
    console.log(`Viewing role ==> ${loggedinUser.role}`)

    const fetchData = async () => {
      try {
          const response = await fetch(import.meta.env.VITE_PEOPLE_API_URL);
          if (!response.ok) {
              throw new Error('Data could not be fetched!');
          }
          const json_response = await response.json();
          setData(json_response); // assign JSON response to the data variable.
      } catch (error) {
          console.error('Error fetching employee data:', error);
      }
  };

  fetchData();
  }, [loggedinUser])

  // useEffect(() => {
  //   sessionStorage.setItem('userType', userType)
  // }, [userType])

  // useEffect(() => {
  //   const fetchHRManagers = async () => {
  //     try {
  //       const response = await fetch(import.meta.env.VITE_PEOPLE_API_URL);
  //       if (!response.ok) {
  //           throw new Error('Data could not be fetched!');
  //       }
  //       const json_response = await response.json();
  //       setHRData(json_response); // assign JSON response to the data variable.
  //     } catch (error) {
  //         console.error('Error fetching HR Manager data:', error);
  //     }
  //   };

  //   fetchHRManagers();
  // }, [])

  // useEffect(() => {
  //   const fetchManagers = async () => {
  //     try {
  //       const response = await fetch(import.meta.env.VITE_PEOPLE_API_URL);
  //       if (!response.ok) {
  //           throw new Error('Data could not be fetched!');
  //       }
  //       const json_response = await response.json();
  //       setManagerData(json_response); // assign JSON response to the data variable.
  //     } catch (error) {
  //         console.error('Error fetching HR Manager data:', error);
  //     }
  //   };

  //   fetchManagers();
  // }, [])

  // useEffect(() => {
  //   // Listen for storage changes from other tabs/windows
  //   const handleStorageChange = (event) => {
  //     if (event.key === 'myData') {
  //       setData(event.newValue);
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  useEffect(() => {
    // Clear sessionStorage when the component mounts
    sessionStorage.clear();
  }, []); // Empty dependency array ensures this runs only on mount

  const handleUserTypeInputChange = (event) => {
    console.log(`New input val: ${event.target.value}`)
    setUserTypeInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`NEW USER TYPE: ${userTypeInput}`)
    setUserType(userTypeInput)

    setUserTypeInput('')
  }

  // const [hr_data, sethrData] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //       try {
  //           const response = await fetch(import.meta.env.VITE_HR_API_URL);
  //           if (!response.ok) {
  //               throw new Error('Data could not be fetched!');
  //           }
  //           const json_response = await response.json();
  //           sethrData(json_response); // assign JSON response to the data variable.
  //       } catch (error) {
  //           console.error('Error fetching socks:', error);
  //       }
  //   };

  //   fetchData();
  // }, [])

  return (
    <>
    <Router>

      <Header />

      <div>
        <Routes>
            <Route exact path="/" element={loggedinUser.name ? <Home data={data} loggedinUser={loggedinUser} userType={userType} handleUserTypeInputChange={handleUserTypeInputChange} handleSubmit={handleSubmit}/> : <LoginForm setLoggedInUser={setLoggedInUser} setUserType={setUserType}/>} />
            <Route path="/login" element={<LoginForm setLoggedInUser={setLoggedInUser} setUserType={setUserType}/>} />
            <Route path="/dir" element={<Home data={data} loggedinUser={loggedinUser} userType={userType} handleUserTypeInputChange={handleUserTypeInputChange} handleSubmit={handleSubmit}/>} />
            {/* {user ? <SearchPage user={user} /> : <LoginPage setUser={setUser} />} */}
        </Routes>
      </div>

      {/* <div className="card">
        <h1> Human Resources </h1>
        <HR_Table HRTableData={hr_data} />
      </div> */}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Router>
    </>
  )
}

export default App
