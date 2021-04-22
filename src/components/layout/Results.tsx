import React, { SyntheticEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PlantList from '../../components/plants/PlantList';
import { selectNumResults } from '../../features/search/searchResults/searchResultsSlice';
import { useSelector } from 'react-redux';

function ResultsLayout() {
    const history = useHistory();
    const numResults = useSelector(selectNumResults);

    const handleClick = (event: SyntheticEvent) => {
        history.push('/');
    }

    const buttonNew = (
        <Row className="justify-content-center pb-5 px-5 mx-5">  
            <Button variant="secondary" onClick={handleClick}>New search</Button>
        </Row>
    )

    const title = `Search results: ${numResults}`;

    const results = (
        <div>
                    <Row className="justify-content-center p-5">
                        <Col className="justify-content-center">
                            <PlantList />
                        </Col>
                    </Row>
                    {buttonNew}
        </div>
    );

    const content = numResults ? results : '';
    return (
            <Container fluid className="search-results p-5">
            <Row className="justify-content-center pt-5 px-5 mx-5">
                    <h1 className="text-light">{title}</h1>                      
            </Row>
            {buttonNew}
            {content}      
            </Container>
    )
}

export default ResultsLayout;