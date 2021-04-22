import React, { ChangeEvent, KeyboardEvent } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchTerm, setSearchTerm, clearSearchTerm } from './searchTermSlice';


function SearchTerm(props: any) {
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();


    const onSetTermHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
    }

    const onClearTermHandler = () => {
        dispatch(clearSearchTerm());
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.onKeyPress(event);
        }
    }

    return (
        <Row>
            <Col>
                <InputGroup>
                    <Form.Control size="lg" type="text" placeholder="Plant, specie..." name="term" value={searchTerm} onChange={onSetTermHandler} onKeyPress={handleKeyPress}/>
                    <InputGroup.Append>
                        <Button type="submit" variant="outlined-light" onClick={onClearTermHandler}>✖️</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        </Row>
    );
}

export default SearchTerm;