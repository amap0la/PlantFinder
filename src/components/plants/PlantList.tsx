import React from 'react';
import { useSelector } from 'react-redux';
import Plant from './Plant';
import CardDeck from 'react-bootstrap/CardGroup';
import { IPlant } from '../../models/plants';
import { selectPlantList } from '../../features/search/searchResults/searchResultsSlice';



function PlantList() {
    const plants = useSelector(selectPlantList);
    const listPlants = plants.map((plant: IPlant) => {
        return (
        <div>
            <Plant plant={plant} />
        </div>
        )
    });
    
    return (
        <CardDeck className="justify-content-center">
            {listPlants}
        </CardDeck>
    )
}

export default PlantList;