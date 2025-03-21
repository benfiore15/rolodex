import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/AuthContext';

function PredictSalary() {
    const [officeLoc, setOfficeLoc] = useState('');
    const [jobRole, setJobRole] = useState('');

    const [prediction, setPrediction] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`TO PREDICT ==> Location: ${officeLoc} || Role: ${jobRole}`)
        const response = await fetch('http://localhost:3000/predictSal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_role: jobRole, office_loc: officeLoc}),
        });

        const data = await response.json();
        if (data.success) {
    
            console.log(`Predicted Salary: ${data}`)
            // const role = data.role

            setPrediction(data)
        } else {
        alert('ERROR: Failed to get predicted salary');
        }
    };

    return (
        <div className="container">
            <form onSubmit={event => handleSubmit(event)} className="mt-5">
                <div className="form-group">
                    <label htmlFor="officeLoc">Office Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="officeLoc"
                        placeholder="Enter city"
                        value={officeLoc}
                        onChange={(e) => setOfficeLoc(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="jobRole">Job Role</label>
                    <input
                        type="text"
                        className="form-control"
                        id="jobRole"
                        placeholder="Enter job role"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Predict Salary</button>
            </form>
        </div>
    );
}

export default PredictSalary;