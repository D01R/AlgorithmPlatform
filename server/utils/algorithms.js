const algorithms = [
    {
        id: 1,
        name: 'Пузырьковая сортировка',
        startCodeJavaScript: "let arr = Array.from({length: 20}, () => Math.floor(Math.random() * 100));\r\n",
        //startCodePython: "import numpy as np\r\narr = np.random.randint(1,101,20)\r\n",
        //startCodeCSharp: "using System;class Program{ static void Main() { int MinRandom = 1; int MaxRandom = 100; Random randNum = new Random(); int[] arr = new int[20];  for (int i = 0; i < arr.Length; i++) {arr[i] = randNum.Next(MinRandom, MaxRandom);} }}"
    }
];

module.exports = algorithms;