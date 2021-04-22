import React, { ChangeEvent } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { CirclePicker } from 'react-color';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter, removeFilter, selectSearchFilter } from './searchFilterSlice';
import { IFilterContentAny } from '../../../../models/search';


function SearchFilter() {

    const searchFilter = useSelector(selectSearchFilter);
    const dispatch = useDispatch();

    const onAddFilter = (filterName: string, filter: IFilterContentAny) => {
        dispatch(addFilter({name: filterName, content: filter}));
    }

   const onRemoveFilter = (filterName: string) => {
        dispatch(removeFilter(filterName));
    }

    const handleChangeSimpleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? String(e.target.checked) : e.target.value;
        if (value){
            onAddFilter(e.target.name, {
                    filterType: 'simple',
                    filterValue: value
                }
            );
        } else {
            onRemoveFilter(e.target.name);
        }
    }

    const handleChangeRangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const valRange = lightRef[e.target.value];
        if (valRange){
            onAddFilter(e.target.name, {
                    filterType: 'range',
                    filterValue: valRange
                }
            )
        } else {
            onRemoveFilter(e.target.name);
        }
        
    }

    const getCreatedArrayFilter = (val: string) => {
        return [val];
    }

    const getArrayFilterAddItem = (filterValue: string[], val: string) => {
        return [...filterValue, val];
    }

    const getArrayFilterRemoveItem = (filterValue: string[], val: string) => {
        return filterValue.filter((item: string) => item !== val);
    }

    const handleChangeArrayFilter = (name: string, val: string) => {
        const filter = searchFilter[name];
        let isRemoveItem = false;
        let newArray = [];
        if (filter && Array.isArray(filter.filterValue)){
            if (filter.filterValue.includes(val)){
                newArray = getArrayFilterRemoveItem(filter.filterValue, val);
                isRemoveItem = true;
            } else {
                newArray = getArrayFilterAddItem(filter.filterValue, val);
            }
        } else {
            newArray = getCreatedArrayFilter(val);
        }
        if (newArray){
            onAddFilter(name, {
                filterType: 'array',
                filterValue: newArray
            })
        } else {
            onRemoveFilter(name);
        }
        return isRemoveItem;
    }

    

    const handleChangeColorPicker = (clickedColor: {hex: string}, event: ChangeEvent<HTMLInputElement>) => {
        const colorName = colorRef[clickedColor.hex];

        const isRemoveItem = handleChangeArrayFilter('flower_color', colorName);
        event.target.style.border = isRemoveItem? 'none' : '2px white solid';
    }

    return (
        <Row className="px-3 text-dark" >
                <Col>
                    <h2 className="mb-5">And/or <span className="text-secondary">filter by characteristics</span></h2>
                    <Form>
                        <Form.Group onChange={handleChangeSimpleFilter} className="my-4">
                            <Form.Label><h5>Types</h5></Form.Label>
                            <Form.Check type="checkbox" name="edible" label="Edible"/>
                            <Form.Check type="checkbox" name="vegetable" label="Vegetable" />
                            <Form.Check type="checkbox" name="toxic" label="Toxic" />
                        </Form.Group>
                        <Form.Group controlId="formBasicRange" className="my-4">
                            <Form.Label><h5>Light</h5></Form.Label>
                            <Form.Control as="select" name="light" value={Object.keys(lightRef).find(val => searchFilter.light && val === searchFilter.light.filterValue)} onChange={handleChangeRangeFilter}>
                                    <option value="all">All</option>
                                    <option value="full_sun">🌞🌞 Full sun</option>
                                    <option value="part_sun">🌞 Part sun</option>
                                    <option value="medium">🌞☁️ Medium</option>
                                    <option value="part_shade">☁️ Part shade</option>
                                    <option value="full_shade">☁️☁️ Full shade</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicRange" className="my-4">
                            <Form.Label><h5>Atmospheric humidity</h5></Form.Label>
                            <Form.Control as="select" name="atmospheric_humidity" value={Object.keys(humidityRef).find(val => searchFilter.humidity && val === searchFilter.humidity.filterValue)} onChange={handleChangeRangeFilter}>
                                    <option value="all">All</option>
                                    <option value="very_high">Very high</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                    <option value="very_low">Very low</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="my-4">
                            <Form.Label><h5>Colors: </h5></Form.Label>
                            <CirclePicker colors={Object.keys(colorRef)} onChange={handleChangeColorPicker} circleSize={16} circleSpacing={9}/>
                        </Form.Group>
                        <Form.Group className="my-4">
                            <Form.Label><h5>Temperature:</h5></Form.Label>
                            <Form.Row>
                                <Col>
                                    <InputGroup>
                                        <Form.Control
                                        type="text"
                                        name="temperature_min"
                                        placeholder="Min"/>
                                         <InputGroup.Append>
                                            <InputGroup.Text>°C</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    
                                    
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            name="temperature_max"
                                            placeholder="Max"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>°C</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlId="formBasicRange" className="my-4">
                            <Form.Label><h5>Shape</h5></Form.Label>
                            <Form.Control as="select" name="ligneous_type" onChange={handleChangeSimpleFilter}>
                                    <option value="">All</option>
                                    <option value="liana"> Liana</option>
                                    <option value="subshrub">Subshrub</option>
                                    <option value="shrub">Shrub</option>
                                    <option value="tree">Tree</option>
                                    <option value="parasite">Parasite</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
        </Row>
    );
}

interface rangeRef {
    [rangeName: string]: string[];
}

interface stringRef {
    [name: string]: string
}

const colorRef: stringRef = {
    "#ffffff": "white",
    "#e43d4c": "red",
    "#d99e5a": "brown",
    "#f16232": "orange",
    "#e8cc3a": "yellow",
    "#243d36": "green,lime", 
    "#74b6cc": "blue,cyan",
    "#3c1642": "purple,magenta",
    "#808080": "grey",
    "#000000": "black"
};



const lightRef: rangeRef = {
    'all': [''],
    'full_sun': ['8', '10'],
    'part_sun': ['6', '8'],
    'medium': ['4', '6'],
    'part_shade': ['2', '4'],
    'full_shade': ['0', '2']
};

const humidityRef: rangeRef = {
    'all': [''],
    'very_high': ['8', '10'],
    'high': ['6', '8'],
    'medium': ['4', '6'],
    'low': ['2', '4'],
    'very_low': ['0', '2']
};

export default SearchFilter;