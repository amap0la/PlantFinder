import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { IBasicLayoutProps } from '../../models/layout';

function BasicLayout(props: IBasicLayoutProps) {
   
    return (
        <div className={`base-layout ${props.cssClass}`}>
            <Container fluid className="text-light">
                <Row className="justify-content-center">
                    <h1 className="text-light">{props.title}</h1>
                </Row>
                {props.subtitle &&
                    (<Row className="justify-content-center mt-1 mb-5"> 
                        <p>{props.subtitle}</p>
                    </Row>)
                }
                {props.help &&
                 (<Row className="justify-content-center mt-1 mb-5">
                        <p>{props.help}</p>
                  </Row>)}
                <Row className="justify-content-center m-3">
                    {props.button && <Button className="transparent p-3" onClick={props.button.handleClick}>{props.button.text}</Button>}
                    {props.spinner && <Spinner variant="light" animation="border" role="status" />}
                </Row>        
            </Container>
        </div>
    )
}

export default BasicLayout;