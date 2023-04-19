import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ALGORITHM_ROUTE } from "../../utils/consts";

const AlgorithmMain = ({name, id, photo}) => {
    const navigate = useNavigate();
    return (
        <Card>
            <h2>{name}</h2>
            <Image src={photo} style={{height: "400px"}}/>
            <Button onClick={() => navigate(ALGORITHM_ROUTE+`/${id}`)}>Подробнее</Button>
        </Card>
    )
}

export default AlgorithmMain;