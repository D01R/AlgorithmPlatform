import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import '../../../node_modules/react-vis/dist/style.css';
import { observer } from "mobx-react-lite";
import "./AlgorithmPage.scss";
import { COMPILER_ROUTE } from "../../utils/consts";
import BarSort from "../../components/BarSort/BarSort";
import algorithms from "../../utils/algorithms";
import NotFound from "../NotFoundPage/NotFoundPage";
import BinarySearch from "../../components/BinarySearch/BinarySearch";
import GraphPaint from "../../components/GraphPaint/GraphPaint";

const ScriptRow = ({item}) => {
    return (
        <tr className="algorithm-table__row">
            <td className="algorithm-table__cell">
                <pre className="algorithm-table__text">{item}</pre>
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
    
    useEffect(() => {
        let div = document.createElement("div");
        div.setAttribute('id', 'description-algorithm')
        div.innerHTML = algorithm.description;
        document.getElementById("description-algorithm").replaceWith(div);
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
    
    function renderSwitch(paramType) {
        switch (paramType) {
            case "barSort":
                return <BarSort colorType={"category"} colorRange={colorRange} data={data}/>;
            case "binarySearch":
                return <BinarySearch data={data}/>
            case "graphAlg":
                return <GraphPaint data={data} colorRange={colorRange}/>;
            default:
                return <div>Not Found</div>
        }
    }

    return(
        <Container className="algorithm-main">
            <h1 className="algorithm-main__title">{algorithm.name}</h1>
            <Row>
                <Col md={8}>
                    <Card className="algorithm-main_visualization">
                        {renderSwitch(algorithm.type)}
                    </Card>
                    <h2 className="algorithm-main__description-title">Описание</h2>
                    <p className="algorithm-main__description-content"><div id="description-algorithm"/></p>
                </Col>
                <Col md={4}>
                    <Table id="table-code" className="algorithm_main__table algorithm-table">
                        <tbody>
                            {algorithm.script.map((item,index) => <ScriptRow key={index} item={item}/>)}
                        </tbody>
                    </Table>
                    <div className="algorithm-main__control" >
                        <Button onClick={() => navigate(COMPILER_ROUTE + '/' +id)} className="algorithm-main__btn">Компилятор</Button>
                        <Button onClick={() => startVisualization()} className="algorithm-main__btn">Демонстрация</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
})

export default AlgorithmPage;