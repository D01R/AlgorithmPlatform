import React from 'react';
import AlgorithmCard from '../../components/AlgorithmCard/AlgorithmCard';
import photo from '../../assets/photoPlaceholder.avif';
import { Container } from 'react-bootstrap';
import algorithms from '../../utils/algorithms';
import "./MainPage.scss";

const MainPage = () => {
    return (
        <Container className='main'>
            {
                algorithms.map(algorithm => <AlgorithmCard key={algorithm.id} name={algorithm.name} id={algorithm.id} photo={photo}/>)
            }
        </Container>
    )
}

export default MainPage;