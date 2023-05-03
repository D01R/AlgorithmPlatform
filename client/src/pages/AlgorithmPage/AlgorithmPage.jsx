import React, { useLayoutEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import '../../../node_modules/react-vis/dist/style.css';
import { observer } from "mobx-react-lite";
import "./AlgorithmPage.scss";
import { COMPILER_ROUTE } from "../../utils/consts";
import BarSort from "../../components/BarSort/BarSort";
import algorithms from "../../utils/algorithms";
import NotFound from "../NotFoundPage/NotFoundPage";

const ScriptRow = ({item}) => {
    return (
        <tr>
            <td>
                <pre>{item}</pre>
            </td>
        </tr>
    )
};

const AlgorithmPage = observer(() => {
    const {id} = useParams();
    const navigate = useNavigate();

    const algorithm = algorithms.find(item => item.id == id);
    if (!algorithm) {return (<NotFound/>)}

    const colorRange = algorithm.colorRange;
    const [data, setData] = useState(algorithm.data);

    const dataRef = useRef({data});
    useLayoutEffect(() => {
        dataRef.current = data;
    })
    
    let table = document.getElementById("table-code");
    
    const colorRow = (id) => {
        removeCodeColors();
        if (!id) return;
        table?.rows[id].classList.add('code-active');
    }
    const removeCodeColors = () => {
        for (let row of table.rows){
            row.classList.remove("code-active");
        }
    }

    const delay_func = (callback) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {callback(), resolve('done')},400);
        });
    };

    const startVisualization = () => {
        dataRef.current = algorithm.data;
        setData(dataRef.current);
        algorithm.func_algorithm(colorRow, delay_func, dataRef, setData)
    };
    

    return(
        <Container>
            <h1>{algorithm.name}</h1>
            <Row>
                <Col md={8}>
                    <Card style={{height: 400}}>
                        <BarSort colorType={"category"} colorRange={colorRange} data={data}/>
                    </Card>
                    <h2>Описание</h2>
                    <p>{algorithm.description}</p>
                </Col>
                <Col md={4}>
                    <Table style={{height: 300}} id="table-code">
                        <tbody>
                            {algorithm.script.map((item,index) => <ScriptRow key={index} item={item}/>)}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between">
                        <Button onClick={() => navigate(COMPILER_ROUTE + '/' +id)}>Компилятор</Button>
                        <Button onClick={() => startVisualization()}>Демонстрация</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
})

export default AlgorithmPage;