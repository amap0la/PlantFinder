import React from 'react';
import Card from 'react-bootstrap/Card';
import { IPlant } from '../../models/plants';
import imgFallback from '../../images/agave.png';


function Plant(props: {plant: IPlant}) {
    const basicInfo = props.plant.basic;
    const onError = (event: any) => {
        event.target.src = imgFallback;
    }
    if (basicInfo){
        const img = basicInfo.image ? basicInfo.image : imgFallback;
        return (
            <Card className="text-center text-primary m-4 border-0" style={{ width: '26rem'}}>
                <Card.Img src={img} onError={onError} alt={basicInfo.commonName} style={{ height: '32rem', objectFit: 'cover'}}/>
                <Card.Body>
                    <Card.Title>{basicInfo.key + 1} - {basicInfo.commonName || basicInfo.scientificName}</Card.Title>
                    <Card.Subtitle>{basicInfo.scientificName || 'Scientific name: unknown'}</Card.Subtitle>
                    <Card.Text>
                        Family: {(basicInfo.familyCommonName
                        && basicInfo.familyCommonName.replace(' family', '')) || 'Unknown'}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    } else {
        return (<div></div>)
    }
    
}

export default Plant;