import React from 'react';
import AlgorithmCard from '../../components/AlgorithmCard/AlgorithmCard';
import photo from '../../assets/photoPlaceholder.avif';
import { Container } from 'react-bootstrap';

const MainPage = () => {
    return (
        <Container>
            <AlgorithmCard name='Алгоритм...' id={1} photo={photo}/>
        </Container>
    )
}

export default MainPage;