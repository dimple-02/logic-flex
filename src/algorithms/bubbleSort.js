export const bubbleSort = async (arr, animate, stats) => {
  if (!stats) {
    stats = { comparisons: 0, swaps: 0, time: 0 };
  }
  let a = [...arr];
  let n = a.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      stats.comparisons++;
      await animate(j, j + 1, "compare");

      if (a[j] > a[j + 1]) {
        stats.swaps++;
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        await animate(j, j + 1, "swap");
      }
    }
  }
  return a;
};
