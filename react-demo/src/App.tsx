import {useState} from 'react'
import './App.css'
import Styled from 'styled-components'

const Button = Styled.button`
    background-color: #eee;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;`

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Button/>
        </>
    )
}

export default App
