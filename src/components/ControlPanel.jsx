export default function Controls({
  generateArray,
  startSort,
  speed,
  setSpeed
}) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      <button
        onClick={generateArray}
        className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
      >
        Generate
      </button>

      <button
        onClick={startSort}
        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
      >
        Bubble Sort
      </button>

      <div className="flex items-center gap-2">
        <span>Speed</span>
        <input
          type="range"
          min="0.05"
          max="0.5"
          step="0.05"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
