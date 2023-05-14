const algorithms = [
  {
    id: 1,
    name: "Пузырьковая сортировка",
    type: "barSort",
    description:
      "Самый простой, но не самый эффективный алгоритм. Эффективность работы алгоритма - <b>O(n^2)</b><br><b>Принцип работы</b><br>На каждом шаге мы находим наибольший элемент из двух соседних и ставим этот элемент в конец пары. Получается, что при каждом прогоне цикла большие элементы будут всплывать к концу массива, как пузырьки воздуха — отсюда и название.<br><b>Алгоритм выглядит так:</b><br>1. Берём самый первый элемент массива и сравниваем его со вторым. Если первый больше второго — меняем их местами с первым, если нет — ничего не делаем.<br>2. Затем берём второй элемент массива и сравниваем его со следующим — третьим. Если второй больше третьего — меняем их местами, если нет — ничего не делаем.<br>3. Проходим так до предпоследнего элемента, сравниваем его с последним и ставим наибольший из них в конец массива. Всё, мы нашли самое большое число в массиве и поставили его на своё место.<br>4. Возвращаемся в начало алгоритма и делаем всё снова точно так же, начиная с первого и второго элемента. Только теперь даём себе задание не проверять последний элемент — мы знаем, что теперь в конце массива самый большой элемент. <br>5. Когда закончим очередной проход — уменьшаем значение финальной позиции, до которой проверяем, и снова начинаем сначала.<br>6. Так делаем до тех пор, пока у нас не останется один элемент.",
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
      "Улучшаем пузырьковую сортировку. Худшее время - <b>O(n^2)</b>, лучшее время - <b>O(n*logn)</b><br><b>В чём хитрость сортировки расчёской</b><br>Раз у нас большие элементы могут тормозить весь процесс, то можно их перекидывать не на соседнее место, а подальше. Так мы уменьшим количество перестановок, а с ними сэкономим и процессорное время, нужное на их обработку.<br>Но отправлять каждый большой элемент сразу в конец массива будет недальновидно — мы же не знаем, насколько этот элемент большой по сравнению с остальными элементами. Поэтому в сортировке расчёской сравниваются элементы, которые отстоят друг от друга на каком-то расстоянии. Оно не слишком большое, чтобы сильно не откидывать элементы и возвращать потом большинство назад, но и не слишком маленькое, чтобы можно было отправлять не на соседнее место, а чуть дальше.<br>Опытным путём программисты установили оптимальное расстояние между элементами — это длина массива, поделённая на <b>1,247</b> (понятное дело, расстояние нужно округлить до целого числа). С этим числом алгоритм работает быстрее всего.<br><b>Как работает алгоритм сортировки расчёской</b><br>На первом шаге мы находим длину массива (например, 10 элементов) и делим её на 1,247. Допустим, после округления у нас получилось число 8. Теперь мы проходим первый цикл пузырьковой сортировки, только сравнивая не 1 и 2, 2 и 3, а сразу 1 и 8, 2 и 9, 3 и 10. Это отправит самые большие числа, если они есть в начале, в самый конец. Всего на первом шаге будет три сравнения.<br>На втором шаге мы берём число 8 из предыдущего этапа и снова делим его на 1,247, получая число 6. Теперь мы снова проходим весь массив и сравниваем так.<br>Так мы уменьшаем размер шага до тех пор, пока он не станет меньше единицы — к этому моменту массив будет полностью отсортирован.<br>Сортировка расчёской называется так из-за того, что мы как бы расчёсываем массив сначала широким гребнем (большой шаг), потом гребнем поменьше (шаг поменьше). В конце шаг равен единице, как в пузырьковой сортировке.<br><b>Почему это лучше пузырьковой сортировки?</b><br>То, что код выглядит сложнее, ничего не значит: нам нужна не оценка сложности кода, а скорость и эффективность работы.<br>Расчёска лучше пузырьковой сортировки, потому что в ней намного меньше операций перестановки. Именно перестановка занимает основное время процессора. В самом худшем случае алгоритм сортировки расчёской будет работать так же, как и пузырьковая, а в среднем — алгоритм работает быстрее пузырьковой.",
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
      "Ей уже 60 лет, но она до сих пор работает быстро. В среднем сложность составляет <b>O(n*logn)</b>.<br><b>В чём идея быстрой сортировки</b><br>Взята за основу классическая пузырьковая сортировка и преобразована так:<br>1. На очередном шаге выбирается опорный элемент — им может быть любой элемент массива.<br>2. Все остальные элементы массива сравниваются с опорным и те, которые меньше него, ставятся слева от него, а которые больше или равны — справа.<br>3. Для двух получившихся блоков массива (меньше опорного, и больше либо равны опорному) производится точно такая же операция — выделяется опорный элемент и всё идёт точно так же, пока в блоке не останется один элемент.<br><b>Особенности алгоритма</b><br>Так как на третьем шаге мы разбиваем массив на два и для каждой части делаем то же самое, и так снова и снова, то это значит, что в нём используется <b>рекурсия</b>. Рекурсия — это когда функция вызывает саму себя, и при этом ей нужно держать в памяти все предыдущие этапы. Это значит, что при использовании сразу двух рекурсий (для левой и правой частей массива), может потребоваться очень много памяти.<br>Но несмотря на такой возможный расход памяти, у быстрой сортировки есть много плюсов:<br>- это один из самых быстрых алгоритмов, когда мы заранее ничего не знаем про массивы, с которыми придётся работать;<br>- алгоритм настолько прост, что его легко написать на любом языке программирования;<br>- быструю сортировку легко распараллелить и разбить на отдельные процессы;<br>- алгоритм работает на данных с последовательным доступом, когда мы не можем в любой момент вернуться в начало, а должны работать с данными только в одном порядке.<br>Правильный выбор опорного элемента может сильно повысить эффективность быстрой сортировки. В зависимости от реализации алгоритма есть разные способы выбора: первый, последний, медианный.<br>Есть ещё много других техник выбора — они применяются, когда программист точно знает, с какими массивами придётся работать: немного упорядоченными или когда всё вразнобой.",
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
      "Классический алгоритм поиска элемента в отсортированном массиве (векторе), использующий дробление массива на половины. Используется в информатике, вычислительной математике и математическом программировании.<br><b>Поиск элемента в отсортированном массиве</b><br>1. Определение значения элемента в середине структуры данных. Полученное значение сравнивается с ключом.<br>2. Если ключ меньше значения середины, то поиск осуществляется в первой половине элементов, иначе — во второй.<br>3. Поиск сводится к тому, что вновь определяется значение серединного элемента в выбранной половине и сравнивается с ключом.<br>4. Процесс продолжается до тех пор, пока не будет найден элемент со значением ключа или не станет пустым интервал для поиска.<br><b>Сложность</b><br>Худшее время - <b>O(logn)</b>, лучшее время - <b>O(1)</b>",
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
    description: "Один из простейших алгоритмов обхода графа, являющийся основой для многих важных алгоритмов для работы с графами.<br>Пусть задан невзвешенный ориентированный граф <b>G=(V,E)</b>, в котором выделена исходная вершина <b>s</b>. Требуется найти длину кратчайшего пути (если таковой имеется) от одной заданной вершины до другой. Частным случаем указанного графа является невзвешенный неориентированный граф, т.е. граф, в котором для каждого ребра найдется обратное, соединяющее те же вершины в другом направлении.<br>Для алгоритма нам потребуются очередь и множество посещенных вершин <b>was</b>, которые изначально содержат одну вершину <b>s</b>. На каждом шагу алгоритм берет из начала очереди вершину <b>v</b> и добавляет все непосещенные смежные с <b>v</b> вершины в <b>was</b> и в конец очереди. Если очередь пуста, то алгоритм завершает работу. <br>Оценим время работы для входного графа <b>G=(V,E)</b>, где множество ребер E представлено списком смежности. В очередь добавляются только непосещенные вершины, поэтому каждая вершина посещается не более одного раза. Операции внесения в очередь и удаления из нее требуют <b>O(1)</b> времени, так что общее время работы с очередью составляет <b>O(|V|)</b> операций. Для каждой вершины v рассматривается не более <b>deg(v)</b> ребер, инцидентных ей.<br>время, используемое на работу с ребрами, составляет <b>O(|E|)</b>. Поэтому общее время работы алгоритма поиска в ширину — <b>O(|V|+|E|)</b>.",
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
        const colorVer =  [["A","B"], ["B", "D"], ["A", "C"], ["C", "F"], ["C", "E"]]
        colorRow(8)
        dataRef.current = dataRef.current.map((item) =>
            colorVer.find(i => i[0] == item.text || i[1] == item.text) ? { ...item, fill: 1, textColor: 0, toVertices: item.toVertices.map((el) => colorVer.find(i => (i[0] == el.ver && i[1] == item.text)||(i[0] == item.text && i[1] == el.ver))? {...el, color: 1}: el)} : item
        );
        setData(dataRef.current);

        // const colorVer =  [["A","B"], ["B", "D"], ["D", "I"]]
        // colorRow(10)
        // dataRef.current = dataRef.current.map((item) =>
        //     colorVer.find(i => i[0] == item.text || i[1] == item.text) ? { ...item, fill: 1, textColor: 0, toVertices: item.toVertices.map((el) => colorVer.find(i => (i[0] == el.ver && i[1] == item.text)||(i[0] == item.text && i[1] == el.ver))? {...el, color: 1}: el)} : item
        // );
        // setData(dataRef.current);
    }
  }
];

export default algorithms;