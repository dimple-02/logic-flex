import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { bubbleSort } from "../algorithms/bubbleSort";

export default function Visualizer() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(0.2);
  const barsRef = useRef([]);

  useEffect(() => {
    generateArray();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      barsRef.current,
      { y: 400, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out",
      }
    );
  }, [array]);

  const generateArray = () => {
    if (isSorting) return;
    const arr = Array.from({ length: 35 }, () =>
      Math.floor(Math.random() * 300) + 40
    );
    setArray(arr);
  };

  const animate = (i, j, type) => {
    return new Promise((resolve) => {
      const bars = barsRef.current;

      if (type === "compare") {
        gsap.to([bars[i], bars[j]], {
          backgroundColor: "#f43f5e",
          duration: speed,
          yoyo: true,
          repeat: 1,
          onComplete: resolve,
        });
      }

      if (type === "swap") {
        const newArray = [...array];
        [newArray[i], newArray[j]] =
          [newArray[j], newArray[i]];
        setArray(newArray);

        gsap.to([bars[i], bars[j]], {
          backgroundColor: "#facc15",
          duration: speed,
          yoyo: true,
          repeat: 1,
          onComplete: resolve,
        });
      }
    });
  };

  const startBubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const sorted = await bubbleSort(array, animate);
    setArray(sorted);

    barsRef.current.forEach((bar) => {
      gsap.to(bar, {
        backgroundColor: "#10b981",
        duration: 0.3,
      });
    });

    setIsSorting(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center p-8">
      
      <h1 className="text-4xl font-bold mb-8 tracking-wide text-cyan-400">
        LogicFlex
      </h1>

      {/* Glass Panel */}
      <div className="w-full max-w-4xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl mb-8">
        
        <div className="flex flex-wrap justify-between items-center gap-6">
          
          <div className="flex gap-4">
            <button
              onClick={generateArray}
              className="px-4 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition"
            >
              Generate
            </button>

            <button
              onClick={startBubbleSort}
              className="px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition"
            >
              Bubble Sort
            </button>
          </div>

          {/* Speed Slider */}
          <div className="flex flex-col">
            <label className="text-sm text-zinc-400">
              Speed
            </label>
            <input
              type="range"
              min="0.05"
              max="0.5"
              step="0.05"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-40"
            />
          </div>
        </div>

        {/* Complexity Display */}
        <div className="mt-6 text-sm text-zinc-400 grid grid-cols-2 gap-4">
          <div>
            <span className="text-cyan-400">Time Complexity:</span>
            <p>Best: O(n)</p>
            <p>Average: O(n²)</p>
            <p>Worst: O(n²)</p>
          </div>

          <div>
            <span className="text-cyan-400">Space Complexity:</span>
            <p>O(1)</p>
          </div>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end h-[400px] gap-1">
        {array.map((value, index) => (
          <div
            key={index}
            ref={(el) => (barsRef.current[index] = el)}
            className="w-3 bg-cyan-500 rounded-t-md"
            style={{ height: `${value}px` }}
          />
        ))}
      </div>
    </div>
  );
}
