import React from "react";
import { Button, Card, Image } from "react-bootstrap";

const AlgorithmMain = ({name, id, photo}) => {
    return (
        <Card>
            <h2>name</h2>
            <Image src={photo}/>
            <Button>Подробнее</Button>
        </Card>
    )
}

export default AlgorithmMain;