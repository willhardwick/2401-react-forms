import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = 'https://fsa-jwt-practice.herokuapp.com/';

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (formSubmitted) {
            if (username.length < 5) {
                setError('Username must be longer');
                timeoutId = setTimeout(() => {
                    setError('');
                    setFormSubmitted(false);
                }, 180000);
            } else {
                setError('');
            }
        }
        return () => clearTimeout(timeoutId);
    }, [username, formSubmitted]);


    async function handleSubmit(event) {
        event.preventDefault();
        setFormSubmitted(true);

        if (!username || !password) {
            setError('No username, no password, no token');
            return;
        }

        try {
            const response = await axios.post(BASE_URL+'signup');
            setToken(response.data.token); // axios formatting
            clearForm();

        } catch (error) {
            console.error(error);
            setError('Please sign up before authenticating');
        }

        function clearForm() {
            setUsername('')
            setPassword('')
            setFormSubmitted(false);
        }
    }
    
    return (
        <div className="form-container">
            <h2>Sign up</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="form">
                <label className="form-label">
                    Username
                    <input
                        className="form-input"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="form-label">
                    Password
                    <input
                        className="form-input"
                        name="password"
                        type="password" // this conceals type for passwords
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
}