import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ALGORITHM_ROUTE } from "../../utils/consts";
import "./AlgorithmCard.scss";
import photo1 from "../../assets/AlgorithmPhoto/1.png";
import photo2 from "../../assets/AlgorithmPhoto/2.png";
import photo3 from "../../assets/AlgorithmPhoto/3.png";
import photo4 from "../../assets/AlgorithmPhoto/4.png";
import photo5 from "../../assets/AlgorithmPhoto/5.png";

const AlgorithmCard = ({name, id, photo}) => {
    const navigate = useNavigate();
    const photos = {
        1: photo1,
        2: photo2,
        3: photo3,
        4: photo4,
        5: photo5,
    }
    return (
        <Card className="algorithm-container" onClick={() => navigate(ALGORITHM_ROUTE+`/${id}`)}>
            <h2 className="algorithm-container__title">{name}</h2>
            <Image src={photos[`${id}`]} className="algorithm-container__img"/>
            <Button className="algorithm-container__btn">Подробнее</Button>
        </Card>
    )
}

export default AlgorithmCard;