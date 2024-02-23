import { useState } from "react"
import axios from "axios"

const BASE_URL = 'https://fsa-jwt-practice.herokuapp.com/'

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null)
    const [error, setError] = useState(null);
    
    async function handleClick() {
        try {
            const response = await axios.get(BASE_URL+'Authenticate', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
            
        })
        setSuccessMessage(response.data.message); // axios formatting

        } catch (error) {
            setError(error.message);
        }
    }
    
    return (
    <>
        <h2>Authenticate</h2>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <button onClick={handleClick}>
            Authenticate token!
        </button> 
    </>
)}
