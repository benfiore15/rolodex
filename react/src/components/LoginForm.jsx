import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/AuthContext';

function LoginForm({setLoggedInUser, setUserType }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password}),
        });

        const data = await response.json();
        if (data.success) {
        alert(data.message)
        console.log(`User Id: ${data.userID} || Name: ${data.name}`)
        const role = data.role

        setLoggedInUser({userID: data.userID, name: data.name, role: data.role})
        setUserType(role)
        navigate('/'); // Redirect to the root page
        } else {
        alert('Login failed!');
        }
    };

    return (
        <div className="container">
            <form onSubmit={event => handleLogin(event)} className="mt-5">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;