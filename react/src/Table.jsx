import React from 'react';

function Table({ tableData }) {

    // const formatNumToSalary = (salaryAmt) => "$" + salaryAmt.toLocaleString('en-US');

    // 55800
    // 55,800
        
        


  return (
    <table className="table">
      <thead class="thead-dark">
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
          <tr key={tableItem.name}>
            {/* <td>{tableItem.id}</td> */}
            <td>{tableItem.first_name + " " + tableItem.last_name}</td>
            <td>{tableItem.phone_no}</td>
            <td>{tableItem.job_role}</td>
            <td>{tableItem.office_loc}</td>
            <td>{tableItem.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



export default Table;
