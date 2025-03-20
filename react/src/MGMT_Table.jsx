import React from 'react';

function Mgmt_Table({ MgmtTableData }) {

  return (
    <table className="mgmt_table">
      <thead class="thead-dark">
        <tr>
          {/* <th>ID</th> */}
          <th>Name</th>
          <th>Mgmt_ID</th>
          <th>Emp_ID</th>
          <th>Phone #</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {MgmtTableData.map((MgmtTableItem) => (
          <tr key={MgmtTableItem.name}>
            {/* <td>{tableItem.id}</td> */}
            <td>{MgmtTableItem.first_name + " " + MgmtTableItem.last_name}</td>
            <td>{MgmtTableItem.mgmt_id}</td>
            <td>{MgmtTableItem.id}</td>
            <td>{MgmtTableItem.phone_no}</td>
            <td>{MgmtTableItem.job_role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default Mgmt_Table;