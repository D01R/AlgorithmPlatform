import React from "react";
import { observer } from "mobx-react-lite";
import "./BinarySearch.scss";
import { Container } from "react-bootstrap";

const BinarySearch = observer(({data}) => {
    return (
        <Container className="binary_value__container">
            {data.map((item) => <div key={item.value} className={`value_figure ${item.color}_value__color`}>{item.value}</div>)}
        </Container>
    )
})

export default BinarySearch;