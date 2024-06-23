import {useState} from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.color};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

function App() {
    const [color, setColor] = useState('blue');

    const handleClick = () => {
        setColor(prevColor => prevColor === 'blue' ? 'green' : 'blue');
    };

    return (
        <StyledButton color={color} onClick={handleClick}>
            Click me
        </StyledButton>
    );
}

export default App;
