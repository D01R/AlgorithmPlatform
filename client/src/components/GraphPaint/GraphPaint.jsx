import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

function drawCircle(ctx, x, y, fill){
    ctx.beginPath();
    ctx.arc(x-30,y-30,30,0,2*Math.PI,false);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#191645';
    ctx.stroke();
}

function drawLine(ctx, begin, end, stroke){
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(begin.centerX-30, begin.centerY-30);
    ctx.lineTo(end.centerX-30, end.centerY-30);
    ctx.stroke();
}

function drawText(ctx, x, y, text, fill){
    ctx.font = "30px Segoe UI";
    ctx.fillStyle = fill;
    ctx.textAlign = "center";
    ctx.fillText(text, x-30, y-20);
}


const GraphPaint = observer(({data, colorRange}) => {
    useEffect(()=> {
        const ctx = document.getElementById('canvas_template').getContext("2d");
        if (ctx){
            ctx.clearRect(0,0,800,400);
            data.map((item) => {
                item.toVertices.forEach((i) => drawLine(ctx, item, data.find(el => el.text == i.ver), colorRange[i.color]));
            });
            data.forEach((item) => drawCircle(ctx, item.centerX, item.centerY, colorRange[item.fill]));
            data.forEach((item) => drawText(ctx, item.centerX, item.centerY, item.text, colorRange[item.textColor]));
            // drawLine(ctx, {centerX: 50,centerY: 60}, {centerX: 100,centerY: 60}, colorRange[data[0].toVertices[0].color]);
            // console.log(colorRange[data[0].toVertices[0].color]);
        }
    },[data]);
    return (
        <canvas id='canvas_template' width="800" height="400">
            
        </canvas>
    )
})

export default GraphPaint;