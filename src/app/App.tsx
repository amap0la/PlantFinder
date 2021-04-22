import React from 'react';
import Search from '../features/search/Search';
import './App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function App() {
 return (
    <Container fluid className="px-0">
    <Search/>
    </Container>
 )
} 

export default App;