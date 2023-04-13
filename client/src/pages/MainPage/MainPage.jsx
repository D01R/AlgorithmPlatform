import React from 'react';
import AlgorithmMain from '../../components/AlgorithmMain/AlgorithmMain';
import photo from '../../assets/photoPlaceholder.avif';

const MainPage = () => {
    return (
        <>
            <AlgorithmMain name='Алгоритм...' id={1} photo={photo}/>
        </>
    )
}

export default MainPage;