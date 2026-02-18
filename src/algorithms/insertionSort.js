export const insertionSort = async (arr, animate, stats) => {
  let a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    while (j >= 0 && a[j] > key) {
      stats.comparisons++;
      a[j + 1] = a[j];
      stats.swaps++;
      await animate(j, j + 1, "swap");
      j--;
    }

    a[j + 1] = key;
  }
  return a;
};
