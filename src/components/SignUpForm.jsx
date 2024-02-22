import { useState } from "react"
import axios from "axios"

const BASE_URL = 'https://fsa-jwt-practice.herokuapp.com/'

export default function SignUpForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const result = await axios.post(BASE_URL+'signup')
            console.log(result)

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