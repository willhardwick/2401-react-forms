import { useState } from "react";
import axios from "axios";

const BASE_URL = 'https://fsa-jwt-practice.herokuapp.com/';

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    
    async function handleClick() {
        try {
            const response = await axios.get(BASE_URL+'Authenticate', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            if (response.data.message.startsWith('jwt')) {
                setSuccessMessage('Invalid, please sign up again.')
            } else {
            setSuccessMessage(response.data.message);
        } // axios formatting

        } catch (error) {
            console.error(error);
            setError('Please sign up before authenticating');
        }

    }
    
    return (
        <div className="auth-container">
            <h2>Authenticate</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button onClick={handleClick} className="auth-button">Authenticate token!</button> 
        </div>
    );
}

