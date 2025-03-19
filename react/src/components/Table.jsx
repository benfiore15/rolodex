import React, { useState, useEffect } from 'react';

function Table({ tableData, userRole }) {

    const [salaryStyle, setSalaryStyle] = useState([])
    // const [lockedSalary, setLockedSalary] = useState(null)

    // Function to add a class
    const addSalaryClass = (newClass) => {
      setSalaryStyle((prevClasses) => [...prevClasses, newClass]);
    };
  
    // Function to remove a class
    const removeSalaryClass = (classToRemove) => {
      setSalaryStyle((prevClasses) => prevClasses.filter(c => c !== classToRemove));
    };

    // const formatNumToSalary = (salaryAmt) => "$" + salaryAmt.toLocaleString('en-US');

    // 55800
    // 55,800

    // const [sessionType, setSessionType] = useState(sessionStorage.getItem('userType'))
    // console.log(`Session Type: ${sessionType}`)

    // useEffect(() => {
    //     // Listen for storage changes from other tabs/windows
    //     const handleStorageChange = (event) => {
    //       if (event.key === 'myData') {
    //         setData(event.newValue);
    //       }
    //     };
    
    //     window.addEventListener('storage', handleStorageChange);
    
    //     return () => {
    //       window.removeEventListener('storage', handleStorageChange);
    //     };
    //   }, []);

    // useEffect(() => {
    //     console.log(`RECEIVED USER TYPE FROM TABLE: ${userRole}`)
    //     if (!['HR', 'Manager'].includes(userRole)) {
    //         console.log("USER LOCKED FROM SEEING SALARIES")
    //         addSalaryClass('salary-blur')
    //         console.log(`Salary Column Classes: ${salaryStyle}`)
    //     }
    // }, [])


  return (
    <>
        <div className="table-container">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    {/* <th>ID</th> */}
                    <th>Name</th>
                    <th>Phone #</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Salary (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((tableItem) => (
                    <tr key={tableItem.id}>
                        {/* <td>{tableItem.id}</td> */}
                        <td key={tableItem.last_name + "_name"}>{tableItem.first_name + " " + tableItem.last_name}</td>
                        <td key={tableItem.last_name + "+_phoneNo"}>{tableItem.phone_no}</td>
                        <td key={tableItem.last_name + "_jobRole"}>{tableItem.job_role}</td>
                        <td key={tableItem.last_name + "_officeLoc"}>{tableItem.office_loc}</td>
                        <td key={tableItem.last_name + "_salary"} className={salaryStyle}>
                            {/* <span className="overplay-span locked-text hidden">LOCKED</span> */}
                            {tableItem.salary}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  );
}



export default Table;
