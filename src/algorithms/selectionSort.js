export const selectionSort = async (arr, animate, stats) => {
  let a = [...arr];

  for (let i = 0; i < a.length; i++) {
    let min = i;

    for (let j = i + 1; j < a.length; j++) {
      stats.comparisons++;
      await animate(min, j, "compare");

      if (a[j] < a[min]) {
        min = j;
      }
    }

    if (min !== i) {
      stats.swaps++;
      [a[i], a[min]] = [a[min], a[i]];
      await animate(i, min, "swap");
    }
  }
  return a;
};
