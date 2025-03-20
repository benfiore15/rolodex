import React, { useState, useEffect } from 'react';

function Table({ tableData, empID, userFullName, userRole }) {

  const [dataInTable, setDataInTable] = useState(tableData)

  useEffect(() => {
    const tableWithSalaryStyle = tableData.map((tableRow) => {
      let appendedTableRow = { ...tableRow,}; // create a shallow copy to avoid mutating original data.

      const rowFullName = tableRow.first_name + " " + tableRow.last_name;

      console.log(`ROLE: ${userRole} (ID: ${empID}) || ROW MANAGER ID: ${tableRow.manager_id}`)

      if (userRole === "MGMT" && tableRow.manager_id !== empID)  // In this case empID refers to MANAGER ID OF LOGGED IN USER
      {
          console.log('FOUND MATCH!')
          appendedTableRow.salaryStyle = 'salary-blur'
      }
      else if (!["HR", "MGMT"].includes(userRole) && userFullName !== rowFullName) {
        console.log('FOUND MATCH! 2')
          appendedTableRow.salaryStyle = 'salary-blur'
      }

      console.log(appendedTableRow)

      return appendedTableRow;
    });

    setDataInTable(tableWithSalaryStyle);
     

    // Manager: see salaries of directs
    // HR: See all salaries
    // Employee: See only their own salary
  }, [])

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
                    {dataInTable.map((tableItem) => (
                    <tr key={tableItem.id}>
                        {/* <td>{tableItem.id}</td> */}
                        {/* {console.log(`User Full Name: ${userFullName} <===> ${tableItem.first_name + " " + tableItem.last_name} ==> ${userFullName === (tableItem.first_name + " " + tableItem.last_name)}`)} */}
                        <td key={tableItem.last_name + "_name"}>{tableItem.first_name + " " + tableItem.last_name}</td>
                        <td key={tableItem.last_name + "+_phoneNo"}>{tableItem.phone_no}</td>
                        <td key={tableItem.last_name + "_jobRole"}>{tableItem.job_role}</td>
                        <td key={tableItem.last_name + "_officeLoc"}>{tableItem.office_loc}</td>
                        <td key={tableItem.last_name + "_salary"} className={tableItem.salaryStyle}>
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
