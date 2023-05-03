import { observer } from "mobx-react-lite";
import React from "react";
import {XYPlot, VerticalBarSeries} from 'react-vis';

const BarSort = observer(({colorType, colorRange, data}) => {
    return (
        <XYPlot height={380} width={800} colorType={colorType} colorRange={colorRange}>
            <VerticalBarSeries data={data} animation/>
        </XYPlot>
    )
})

export default BarSort;