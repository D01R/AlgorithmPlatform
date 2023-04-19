import React, { useLayoutEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, VerticalBarSeries} from 'react-vis';
import { observer } from "mobx-react-lite";
import "./AlgorithmPage.scss";
import { ALGORITHM_ROUTE, COMPILER_ROUTE } from "../../utils/consts";


const AlgorithmPage = observer(() => {
    const {id} = useParams();
    const navigate = useNavigate();
    const colorRange = [
        '#191645',
        '#43c6ac',
    ];
    const [data, setData] = useState([
        {x: 0, y: 8, color: 0},
        {x: 1, y: 5, color: 0},
        {x: 2, y: 4, color: 0},
        {x: 3, y: 2, color: 0},
        {x: 4, y: 10, color: 0},
        {x: 5, y: 7, color: 0},
        {x: 6, y: 6, color: 0},
        {x: 7, y: 3, color: 0},
        {x: 8, y: 9, color: 0},
        {x: 9, y: 1, color: 0}
    ]);

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
    


    const bubbleSort = async () => {
        for (let i = 9; i >= 0; i--) {
            colorRow(1);
            await delay_func(() => {});
            for (let j = 0; j < i; j++) {
                colorRow(2);
                await delay_func(() => {});
                dataRef.current = dataRef.current.map(item => (item.x === j || item.x === j+1)? {...item, color: 1}: item);
                setData(dataRef.current);

                if (dataRef.current[j].y > dataRef.current[j+1].y) {
                    const lower = dataRef.current[j+1].y;
                    const higher = dataRef.current[j].y;
                    colorRow(4)
                    await delay_func(() => {
                        dataRef.current = dataRef.current.map(item => item.x === j? {...item, y: lower}: (item.x === j+1? {...item, y: higher}: item));
                        setData(dataRef.current);
                    });
                }
                colorRow(3);
                await delay_func(() => {
                    dataRef.current = dataRef.current.map(item => (item.x === j || item.x === j+1)? {...item, color: 0}: item);
                    setData(dataRef.current);
                })
            }
        }
        colorRow();
    }

    return(
        <Container>
            <h1>Алгоритм...</h1>
            <Row>
                <Col md={8}>
                    <Card style={{height: 400}}>
                        <XYPlot height={380} width={800} colorType="category" colorRange={colorRange}>
                            <VerticalBarSeries data={data} animation/>
                        </XYPlot>
                    </Card>
                    <h2>Описание</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas excepturi recusandae dolore maxime praesentium exercitationem dolor laudantium, animi molestiae atque odio quod sequi quibusdam repellendus eum iusto veritatis perferendis iure consectetur. Quas?</p>
                </Col>
                <Col md={4}>
                    <Table style={{height: 300}} id="table-code">
                        <tbody>
                            <tr><td>
                                {"function bubbleSortConcept1(arr) {"}
                            </td></tr>
                            <tr><td style={{paddingLeft: 10}}>
                                {"for (let j = arr.length - 1; j > 0; j--) {"}
                            </td></tr>
                            <tr><td style={{paddingLeft: 20}}>
                                {"for (let i = 0; i < j; i++) {"}
                            </td></tr>
                            <tr><td style={{paddingLeft: 30}}>
                                {"if (arr[i] > arr[i + 1]) {"}
                            </td></tr>
                            <tr><td style={{paddingLeft: 40}}>
                                {"[arr[i], arr[i+1]] = [arr[i+1], arr[i]];"}
                            </td></tr>
                            <tr><td style={{paddingLeft: 30}}>
                                {"}"}
                            </td></tr>
                            <tr><td style={{paddingLeft: 20}}>
                                {"}"}
                            </td></tr>
                            <tr><td style={{paddingLeft: 10}}>
                                {"}"}
                            </td></tr>
                            <tr><td>
                                {"}"}
                            </td></tr>
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between">
                        <Button onClick={() => navigate(COMPILER_ROUTE + '/' +id)}>Компилятор</Button>
                        <Button onClick={() => bubbleSort()}>Демонстрация</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
})

export default AlgorithmPage;