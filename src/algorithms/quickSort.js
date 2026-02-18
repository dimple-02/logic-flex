export const quickSort = async (arr, animate, stats) => {
  let a = [...arr];

  async function partition(low, high) {
    let pivot = a[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      stats.comparisons++;
      await animate(j, high, "compare");

      if (a[j] < pivot) {
        i++;
        stats.swaps++;
        [a[i], a[j]] = [a[j], a[i]];
        await animate(i, j, "swap");
      }
    }

    stats.swaps++;
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    await animate(i + 1, high, "swap");

    return i + 1;
  }

  async function quick(low, high) {
    if (low < high) {
      let pi = await partition(low, high);
      await quick(low, pi - 1);
      await quick(pi + 1, high);
    }
  }

  await quick(0, a.length - 1);
  return a;
};
