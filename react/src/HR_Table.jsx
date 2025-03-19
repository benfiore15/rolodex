import React from 'react';

function HR_Table({ HRTableData }) {

  return (
    <table className="hr_table">
      <thead class="thead-dark">
        <tr>
          {/* <th>ID</th> */}
          <th>Name</th>
          <th>HR ID</th>
          <th>Emp_ID</th>
          <th>Phone #</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {HRTableData.map((HRTableItem) => (
          <tr key={HRTableItem.name}>
            {/* <td>{tableItem.id}</td> */}
            <td>{HRTableItem.first_name + " " + HRTableItem.last_name}</td>
            <td>{HRTableItem.hr_id}</td>
            <td>{HRTableItem.id}</td>
            <td>{HRTableItem.phone_no}</td>
            <td>{HRTableItem.job_role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default HR_Table;