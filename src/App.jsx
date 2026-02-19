import { useState, useEffect } from "react";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { quickSort } from "./algorithms/quickSort";
import { mergeSort } from "./algorithms/mergeSort";
import { complexityData } from "./data/complexity";

export default function App() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [speed, setSpeed] = useState(80);
  const [arraySize, setArraySize] = useState(45);
  const [stats, setStats] = useState({
    comparisons: 0,
    swaps: 0,
    time: 0,
  });
  const [isSorting, setIsSorting] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [activeBars, setActiveBars] = useState([]);

  useEffect(() => generateArray(), []);

  const generateArray = () => {
    if (isSorting) return;
    const arr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 350) + 20
    );
    setArray(arr);
    setStats({ comparisons: 0, swaps: 0, time: 0 });
  };

  const handleArraySizeChange = (value) => {
    setArraySize(value);
    if (!isSorting) {
      const arr = Array.from({ length: value }, () =>
        Math.floor(Math.random() * 350) + 20
      );
      setArray(arr);
      setStats({ comparisons: 0, swaps: 0, time: 0 });
    }
  };

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const animate = async (i, j, type) => {
    if (type === "swap") {
      setArray((prev) => {
        if (!prev?.length) return prev;
        const next = [...prev];
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      });
    }

    if (!performanceMode) {
      setActiveBars([i, j]);
      // Invert speed: higher slider value = faster animation (shorter delay)
      await sleep(210 - speed);
      setActiveBars([]);
    }
  };

  const startSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    let statsObj = { comparisons: 0, swaps: 0, time: 0 };
    const startTime = performance.now();
    setStats(statsObj);

    const animateWithStats = async (i, j, type) => {
      await animate(i, j, type);
      statsObj.time = ((performance.now() - startTime) / 1000).toFixed(3);
      setStats({ ...statsObj });
    };

    let sorted;

    if (algorithm === "bubble")
      sorted = await bubbleSort(array, animateWithStats, statsObj);
    if (algorithm === "selection")
      sorted = await selectionSort(array, animateWithStats, statsObj);
    if (algorithm === "insertion")
      sorted = await insertionSort(array, animateWithStats, statsObj);
    if (algorithm === "quick")
      sorted = await quickSort(array, animateWithStats, statsObj);
    if (algorithm === "merge")
      sorted = await mergeSort(array, animateWithStats, statsObj);

    const endTime = performance.now();

    statsObj.time = ((endTime - startTime) / 1000).toFixed(3);

    setArray(sorted);
    setStats(statsObj);
    setIsSorting(false);
  };

  const complexity = complexityData[algorithm];
  const algorithmLabels = {
    bubble: "Bubble Sort",
    selection: "Selection Sort",
    insertion: "Insertion Sort",
    quick: "Quick Sort",
    merge: "Merge Sort",
  };
  const algorithmLabel = algorithmLabels[algorithm] || algorithm;

  return (
    <div className="app-shell">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />
      <div className="bg-orb orb-3" aria-hidden="true" />

      <header className="hero fade-up">
        <p className="eyebrow">Sorting Visualizer</p>
        <h1 className="title">LogicFlex</h1>
        <p className="subtitle">
          Dial the pace, pick the algorithm, and watch the sort
          unfold in real-time.
        </p>
      </header>

      <div className="glass-card fade-up delay-1">
        <div className="controls">
          <div className="controls-main">
            <button
              onClick={generateArray}
              className="btn btn-primary"
            >
              Generate
            </button>

            <button onClick={startSort} className="btn btn-accent">
              Start
            </button>

            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="select"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="merge">Merge Sort</option>
            </select>
          </div>

          <div className="controls-sliders">
            <div className="slider-group">
              <label>Speed</label>
              <input
                className="range"
                type="range"
                min="10"
                max="200"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>

            <div className="slider-group">
              <label>Array Size: {arraySize}</label>
              <input
                className="range"
                type="range"
                min="10"
                max="120"
                value={arraySize}
                onChange={(e) =>
                  handleArraySizeChange(Number(e.target.value))
                }
              />
            </div>
          </div>

          <label className="toggle">
            <span>Performance Mode</span>
            <input
              type="checkbox"
              checked={performanceMode}
              onChange={() => setPerformanceMode(!performanceMode)}
            />
            <span className="toggle-track" />
          </label>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-title">Time Complexity</p>
            <p>Best: {complexity.best}</p>
            <p>Avg: {complexity.average}</p>
            <p>Worst: {complexity.worst}</p>
          </div>

          <div className="stat-card">
            <p className="stat-title">Space Complexity</p>
            <p>{complexity.space}</p>
          </div>

          <div className="stat-card">
            <p className="stat-title">Live Stats</p>
            <p>Comparisons: {stats.comparisons}</p>
            <p>Swaps: {stats.swaps}</p>
            <p>Execution Time: {stats.time}s</p>
          </div>
        </div>
      </div>

      <div className="bars-frame fade-up delay-2">
        <div className="bars">
          {array.map((val, i) => (
            <div
              key={i}
              className={`bar ${
                activeBars.includes(i) ? "bar-active" : ""
              }`}
              style={{ height: `${val}px` }}
            />
          ))}
        </div>
      </div>

      <div className="algo-tag fade-up delay-2">
        Algorithm: {algorithmLabel}
      </div>

      <footer className="footer fade-up delay-2">
        <span className="footer-label">github code</span>
        <a className="footer-link" href="https://github.com/dimple-02/logic-flex" rel="noreferrer">
        </a>
        <span className="footer-sep">/</span>
        <span className="footer-label">instagram</span>
        <a className="footer-link" href="https://www.instagram.com/code._coffee?igsh=MTd4ZHo4dGRrcWQ5Ng==" rel="noreferrer">
        </a>
        <span className="footer-sep">/</span>
        <span className="footer-label">youtube</span>
        <a className="footer-link" href="https://www.youtube.com" rel="noreferrer">
        </a>
        
      </footer>
    </div>
  );
}
