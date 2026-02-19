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
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/dimple-02/logic-flex" 
            target="_blank"
            rel="noreferrer"
            className="footer-icon-link"
            aria-label="GitHub"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          <a 
            href="https://www.instagram.com/code._coffee?igsh=MTd4ZHo4dGRrcWQ5Ng==" 
            target="_blank"
            rel="noreferrer"
            className="footer-icon-link"
            aria-label="Instagram"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          <a 
            href="https://www.youtube.com/@codechoas" 
            target="_blank"
            rel="noreferrer"
            className="footer-icon-link"
            aria-label="YouTube"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
