const algorithms = [
    {
        id: 1,
        name: 'Пузырьковая сортировка',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas excepturi recusandae dolore maxime praesentium exercitationem dolor laudantium, animi molestiae atque odio quod sequi quibusdam repellendus eum iusto veritatis perferendis iure consectetur. Quas?",
        script: [
            "function bubbleSortConcept1(arr) {",
            "for (let j = arr.length - 1; j > 0; j--) {",
            "   for (let i = 0; i < j; i++) {",
            "       if (arr[i] > arr[i + 1]) {",
            "           [arr[i], arr[i+1]] = [arr[i+1], arr[i]];",
            "       }",
            "   }",
            "}",
            "}",
        ],
        colorRange: [
            '#191645',
            '#43c6ac',
        ],
        data: [
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
        ],
        func_algorithm: async (colorRow, delay_func, dataRef, setData) => {
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
    }
];

export default algorithms;