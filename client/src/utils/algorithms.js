const algorithms = [
  {
    id: 1,
    name: "Пузырьковая сортировка",
    type: "barSort",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas excepturi recusandae dolore maxime praesentium exercitationem dolor laudantium, animi molestiae atque odio quod sequi quibusdam repellendus eum iusto veritatis perferendis iure consectetur. Quas?",
    script: [
      "function bubbleSort(arr) {",
      "for (let j = arr.length - 1; j > 0; j--) {",
      "   for (let i = 0; i < j; i++) {",
      "       if (arr[i] > arr[i + 1]) {",
      "           [arr[i], arr[i+1]] = [arr[i+1], arr[i]];",
      "       }",
      "   }",
      "}",
      "}",
    ],
    colorRange: ["#191645", "#43c6ac"],
    data: [
      { x: 0, y: 8, color: 0 },
      { x: 1, y: 5, color: 0 },
      { x: 2, y: 4, color: 0 },
      { x: 3, y: 2, color: 0 },
      { x: 4, y: 10, color: 0 },
      { x: 5, y: 7, color: 0 },
      { x: 6, y: 6, color: 0 },
      { x: 7, y: 3, color: 0 },
      { x: 8, y: 9, color: 0 },
      { x: 9, y: 1, color: 0 },
    ],
    func_algorithm: async (colorRow, delay_func, dataRef, setData) => {
      for (let i = 9; i >= 0; i--) {
        colorRow(1);
        await delay_func(() => {});
        for (let j = 0; j < i; j++) {
          colorRow(2);
          await delay_func(() => {});
          dataRef.current = dataRef.current.map((item) =>
            item.x === j || item.x === j + 1 ? { ...item, color: 1 } : item
          );
          setData(dataRef.current);

          if (dataRef.current[j].y > dataRef.current[j + 1].y) {
            const lower = dataRef.current[j + 1].y;
            const higher = dataRef.current[j].y;
            colorRow(4);
            await delay_func(() => {
              dataRef.current = dataRef.current.map((item) =>
                item.x === j
                  ? { ...item, y: lower }
                  : item.x === j + 1
                  ? { ...item, y: higher }
                  : item
              );
              setData(dataRef.current);
            });
          }
          colorRow(3);
          await delay_func(() => {
            dataRef.current = dataRef.current.map((item) =>
              item.x === j || item.x === j + 1 ? { ...item, color: 0 } : item
            );
            setData(dataRef.current);
          });
        }
      }
      colorRow();
    },
  },
  {
    id: 2,
    name: "Сортировка расчёской",
    type: "barSort",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas excepturi recusandae dolore maxime praesentium exercitationem dolor laudantium, animi molestiae atque odio quod sequi quibusdam repellendus eum iusto veritatis perferendis iure consectetur. Quas?",
    script: [
      "function combSort(arr) {",
      "const factor = 1.247;",
      "let gapFactor = arr.length / factor;",
      "while (gapFactor > 1) {",
      "   const gap = Math.round(gapFactor);",
      "   for (let i = 0, j = gap; j < arr.length; i++, j++) {",
      "       if (arr[i] > arr[j]) {",
      "           [arr[i], arr[j]] = [arr[j], arr[i]];",
      "       }",
      "   }",
      "   gapFactor = gapFactor / factor;",
      "}",
      "}",
    ],
    colorRange: ["#191645", "#43c6ac"],
    data: [
      { x: 0, y: 8, color: 0 },
      { x: 1, y: 5, color: 0 },
      { x: 2, y: 4, color: 0 },
      { x: 3, y: 2, color: 0 },
      { x: 4, y: 10, color: 0 },
      { x: 5, y: 7, color: 0 },
      { x: 6, y: 6, color: 0 },
      { x: 7, y: 3, color: 0 },
      { x: 8, y: 9, color: 0 },
      { x: 9, y: 1, color: 0 },
    ],
    func_algorithm: async (colorRow, delay_func, dataRef, setData) => {
      const l = dataRef.current.length;
      const factor = 1.247;
      let gapFactor = l / factor;
      while (gapFactor > 1) {
        const gap = Math.round(gapFactor);
        colorRow(4);
        await delay_func(() => {});

        colorRow(5);
        await delay_func(() => {});
        for (let i = 0, j = gap; j < l; i++, j++) {
          colorRow(6);
          await delay_func(() => {
            dataRef.current = dataRef.current.map((item) =>
              item.x === i || item.x === j ? { ...item, color: 1 } : item
            );
            setData(dataRef.current);
          });
          if (dataRef.current[i].y > dataRef.current[j].y) {
            const lower = dataRef.current[j].y;
            const higher = dataRef.current[i].y;
            colorRow(7);
            await delay_func(() => {
              dataRef.current = dataRef.current.map((item) =>
                item.x === i
                  ? { ...item, y: lower }
                  : item.x === j
                  ? { ...item, y: higher }
                  : item
              );
              setData(dataRef.current);
            });
          }
          colorRow(5);
          await delay_func(() => {
            dataRef.current = dataRef.current.map((item) =>
              item.x === i || item.x === j ? { ...item, color: 0 } : item
            );
            setData(dataRef.current);
          });
        }
        gapFactor = gapFactor / factor;
        colorRow(10);
        await delay_func(() => {});
      }
      colorRow();
    },
  },
  {
    id: 3,
    name: "Быстрая сортировка",
    type: "barSort",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas excepturi recusandae dolore maxime praesentium exercitationem dolor laudantium, animi molestiae atque odio quod sequi quibusdam repellendus eum iusto veritatis perferendis iure consectetur. Quas?",
    script: [
      "function quickSort(arr) {",
      "if (arr.length < 2) return arr;",
      "let pivot = arr[0];",
      "const left = [];",
      "const right = [];",
      "for (let i = 1; i < arr.length; i++) {",
      "   if (pivot > arr[i]) {",
      "       left.push(arr[i]);",
      "   } else {",
      "       right.push(arr[i]);",
      "   }",
      "}",
      "return quickSort(left).concat(pivot, quickSort(right));",
      "}",
    ],
    colorRange: ["#191645", "#43c6ac", "#a1e2d5"],
    data: [
      { x: 0, y: 8, color: 0 },
      { x: 1, y: 5, color: 0 },
      { x: 2, y: 4, color: 0 },
      { x: 3, y: 2, color: 0 },
      { x: 4, y: 10, color: 0 },
      { x: 5, y: 7, color: 0 },
      { x: 6, y: 6, color: 0 },
      { x: 7, y: 3, color: 0 },
      { x: 8, y: 9, color: 0 },
      { x: 9, y: 1, color: 0 },
    ],
    func_algorithm: async (colorRow, delay_func, dataRef, setData) => {
        async function quickSort(arr, start, end) {
            if (arr.length < 2) return;

            // Окрашиваем интервал с которым работаем
            dataRef.current = dataRef.current.map((item) =>
                start <= item.x <= end ? { ...item, color: 2 } : item
            );
            setData(dataRef.current);

            // Выбираем первый элемент как опорный и выделяем 
            let pivot = arr[0];
            dataRef.current = dataRef.current.map((item) =>
                start == item.x ? { ...item, color: 1 } : item
            );
            setData(dataRef.current);
            colorRow(2)
            await delay_func(() => {});
            
            // Будущие левые и правые части массива
            const left = [];
            const right = [];
            for (let i = 1; i < arr.length; i++) {
                if (pivot > arr[i]) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
            
            dataRef.current = dataRef.current.map((item) =>
                (start <= item.x && item.x < (start + left.length)) ? { ...item, y: left[item.x - start], color: 2} : (((end - right.length) < item.x  && item.x<= end) ? { ...item, y: right[item.x - start - left.length - 1], color: 2} : (item.x === (start + left.length)  ? { ...item, y: pivot, color: 1} : item))
            );
            setData(dataRef.current);
            colorRow(12)
            await delay_func(() => {});

            dataRef.current = dataRef.current.map((item) => ({...item, color: 0}));
            setData(dataRef.current);
            colorRow(0)
            await delay_func(() => {});

            await quickSort(left, start, start+left.length-1).then(async() => await quickSort(right, end-right.length+1, end));
        }
        let array = dataRef.current.map(i => i.y);
        await quickSort(array, 0, array.length-1);
    },
  },
  {
    id: 4,
    name: "Бинарный поиск",
    type: "binarySearch",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas excepturi recusandae dolore maxime praesentium exercitationem dolor laudantium, animi molestiae atque odio quod sequi quibusdam repellendus eum iusto veritatis perferendis iure consectetur. Quas?",
    script: [
        "function binarySearch(arr, key){",
        "let start = 0;",
        "let end = arr.length - 1;",
        "while (start <= end) {",
        "    let middle = Math.floor((start + end) / 2);",
        "    if (sortedArray[middle] === key) {",
        "        return middle;",
        "    } else if (sortedArray[middle] < key) {",
        "        start = middle + 1;",
        "    } else {",
        "        end = middle - 1;",
        "    }",
        "}",
        "return -1",
        "}",
      ],
    colorRange: ["#191645", "#43c6ac", "#a1e2d5"],
    data: [
        { value: 17, color: "basic"},
        { value: 18, color: "basic"},
        { value: 21, color: "basic"},
        { value: 22, color: "basic"},
        { value: 29, color: "basic"},
        { value: 42, color: "basic"},
        { value: 75, color: "basic"},
        { value: 77, color: "basic"},
        { value: 90, color: "basic"},
        { value: 98, color: "basic"},
    ],
    func_algorithm: async (colorRow, delay_func, dataRef, setData) => {
        let key = 75;
        let start = 0;
        colorRow(1)
        await delay_func(() => {});
        let end = dataRef.current.length - 1;
        colorRow(2)
        await delay_func(() => {});

        while (start <= end) {
            colorRow(3)
            await delay_func(() => {});
            await delay_func(() => {});
            let middle = Math.floor((start + end) / 2);
            colorRow(4)
            await delay_func(() => {});
            await delay_func(() => {});

            colorRow(5)
            dataRef.current = dataRef.current.map((item,index) =>
              index === middle ? { ...item, color: "active" } : item
            );
            setData(dataRef.current);
            await delay_func(() => {});
            await delay_func(() => {});

            if (dataRef.current[middle].value === key) {
                colorRow(6)
                dataRef.current = dataRef.current.map((item,index) =>
                    index !== middle ? { ...item, color: "unnecessary" } : item
                );
                setData(dataRef.current);
                return;

            } else if (dataRef.current[middle].value < key) {
                start = middle + 1;
                colorRow(7)
                await delay_func(() => {});
                await delay_func(() => {});

                colorRow(8)
                dataRef.current = dataRef.current.map((item,index) =>
                    (index < start || index > end) ? { ...item, color: "unnecessary" } : { ...item, color: "basic" }
                );
                setData(dataRef.current);
                await delay_func(() => {});
                await delay_func(() => {});
            } else {
                end = middle - 1;
                colorRow(7)
                await delay_func(() => {});
                await delay_func(() => {});

                colorRow(10)
                dataRef.current = dataRef.current.map((item,index) =>
                    (index < start || index > end) ? { ...item, color: "unnecessary" } : { ...item, color: "basic" }
                );
                setData(dataRef.current);
                await delay_func(() => {});
                await delay_func(() => {});
            }
        }
        return;
    }
  },
  {
    id: 5,
    name: "Обход в ширину",
    type: "graphAlg",
    description: "dfdfdg",
    script: [
        "function bfs(adj, st, to) {",
        "let queue = [];",
        "queue.push(st);",
        "st.visited = true;",
        "while(queue.length > 0) {",
        "  let v = queue.shift();",
        "  for(let neighbor of adj[v]) {",
        "     if(!neighbor.visited) {",
        "        queue.push(neighbor);",
        "        neighbor.visited = true;",
        "        if(neighbor === to) return true;",
        "     }",
        "  }",
        "}",
        "return false",
        "}",
    ],
    colorRange: ["#191645", "#43c6ac", "#a1e2d5"],
    data: [
        {
            text: "A",
            centerX: 160,
            centerY: 200,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "B", color: 0}, {ver: "C", color: 0}],
        },
        {
            text: "B",
            centerX: 240,
            centerY: 130,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "A", color: 0}, {ver: "D", color: 0}, {ver: "C", color: 0}],
        },
        {
            text: "C",
            centerX: 210,
            centerY: 280,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "A", color: 0}, {ver: "B", color: 0}, {ver: "F", color: 0}, {ver: "E", color: 0}],
        },
        {
            text: "D",
            centerX: 400,
            centerY: 100,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "B", color: 0}, {ver: "J", color: 0}, {ver: "I", color: 0}],
        },
        {
            text: "E",
            centerX: 280,
            centerY: 340,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "F", color: 0}, {ver: "C", color: 0}, {ver: "G", color: 0}],
        },
        {
            text: "F",
            centerX: 310,
            centerY: 210,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "E", color: 0}, {ver: "C", color: 0}, {ver: "G", color: 0}, {ver: "H", color: 0}],
        },
        {
            text: "G",
            centerX: 420,
            centerY: 310,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "E", color: 0}, {ver: "F", color: 0}],
        },
        {
            text: "H",
            centerX: 450,
            centerY: 230,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "F", color: 0}, {ver: "I", color: 0}, {ver: "K", color: 0}],
        },
        {
            text: "I",
            centerX: 500,
            centerY: 170,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "D", color: 0}, {ver: "J", color: 0}, {ver: "H", color: 0}, {ver: "K", color: 0}],
        },
        {
            text: "J",
            centerX: 600,
            centerY: 100,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "D", color: 0}, {ver: "I", color: 0}, {ver: "K", color: 0}],
        },
        {
            text: "K",
            centerX: 620,
            centerY: 200,
            fill: 0,
            textColor: 1,
            toVertices: [{ver: "H", color: 0}, {ver: "I", color: 0}, {ver: "J", color: 0}],
        },
    ],
    func_algorithm: async (colorRow, delay_func, dataRef, setData) => {
        // const colorVer =  [["A","B"], ["B", "D"], ["A", "C"], ["C", "F"], ["C", "E"]]
        // colorRow(8)
        // dataRef.current = dataRef.current.map((item) =>
        //     colorVer.find(i => i[0] == item.text || i[1] == item.text) ? { ...item, fill: 1, textColor: 0, toVertices: item.toVertices.map((el) => colorVer.find(i => (i[0] == el.ver && i[1] == item.text)||(i[0] == item.text && i[1] == el.ver))? {...el, color: 1}: el)} : item
        // );
        // setData(dataRef.current);

        const colorVer =  [["A","B"], ["B", "D"], ["D", "I"]]
        colorRow(10)
        dataRef.current = dataRef.current.map((item) =>
            colorVer.find(i => i[0] == item.text || i[1] == item.text) ? { ...item, fill: 1, textColor: 0, toVertices: item.toVertices.map((el) => colorVer.find(i => (i[0] == el.ver && i[1] == item.text)||(i[0] == item.text && i[1] == el.ver))? {...el, color: 1}: el)} : item
        );
        setData(dataRef.current);
    }
  }
];

export default algorithms;