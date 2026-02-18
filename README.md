# Logic Flex - Sorting Algorithm Visualizer

A beautiful and interactive web application that visualizes different sorting algorithms in real-time. Built with React and Vite, Logic Flex helps you understand how various sorting algorithms work by animating their execution step-by-step.

## Features

- **5 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, and Merge Sort
- **Real-time Visualization**: Watch the algorithm execute with smooth animations
- **Performance Metrics**: Track live statistics including comparisons, swaps, and execution time
- **Configurable Settings**:
  - Adjustable array size (10-120 elements)
  - Speed control (10-200ms)
  - Performance mode for faster execution
- **Complexity Analysis**: View best, average, and worst-case time complexity for each algorithm
- **Responsive Design**: Works seamlessly on different screen sizes

## Algorithms Included

1. **Bubble Sort** - O(n²) - Simple comparison-based sorting
2. **Selection Sort** - O(n²) - Finds minimum and places it
3. **Insertion Sort** - O(n²) - Efficient for small datasets
4. **Quick Sort** - O(n log n) average - Divide and conquer approach
5. **Merge Sort** - O(n log n) - Stable divide and conquer algorithm

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dimple-02/logic-flex.git
cd logic-flex
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Build

To build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── algorithms/      # Sorting algorithm implementations
├── components/      # React components
├── data/           # Complexity data
├── App.jsx         # Main application component
└── main.jsx        # Entry point
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling and animations
- **JavaScript ES6+** - Core functionality

## How to Use

1. **Select Algorithm**: Choose a sorting algorithm from the dropdown
2. **Adjust Settings**: Configure array size and speed as desired
3. **Generate Array**: Click to create a new random array
4. **Start Sorting**: Click the sort button to visualize the algorithm
5. **Monitor Stats**: Track comparisons, swaps, and execution time in real-time

## Performance Mode

Enable Performance Mode to skip animations and run algorithms at maximum speed. Great for testing on larger datasets.

## Links

- [GitHub Repository](https://github.com/dimple-02/logic-flex)
- [Instagram](https://www.instagram.com/code._coffee)
- [YouTube](https://www.youtube.com)

## License

This project is open source and available under the MIT License.

## Author

**Original Creator**: Dimple

This project is original work created by Dimple with ❤️ for algorithm enthusiasts and learners.
