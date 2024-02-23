import { useState } from "react"
import axios from "axios"

const BASE_URL = 'https://fsa-jwt-practice.herokuapp.com/'

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post(BASE_URL+'signup')
            console.log(response.data)
            setToken(response.data.token) // axios formatting

        } catch (error) {
        console.error(error)
        }
    }
    return (
        <>
        <h2>Sign up</h2>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit }>
            <label>
                Username: <input
                        name = 'username'
                        type = 'text'
                        value={username} 
                        onChange={(e) => 
                        setUsername(e.target.value)}/>
            </label>
            <label>
                Password: <input 
                        name = 'password'
                        type = 'text'
                        value={password} 
                        onChange={(e) => 
                        setPassword(e.target.value)} />
            </label>
            <button type='submit'>Submit</button>
        </form>
        
        </>

    )
    
}