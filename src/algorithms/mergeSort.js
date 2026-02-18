export const mergeSort = async (arr, animate, stats) => {
  let a = [...arr];

  async function merge(l, m, r) {
    let left = a.slice(l, m + 1);
    let right = a.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      stats.comparisons++;
      await animate(k, k, "compare");

      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
      stats.swaps++;
    }

    while (i < left.length) a[k++] = left[i++];
    while (j < right.length) a[k++] = right[j++];
  }

  async function sort(l, r) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    await sort(l, m);
    await sort(m + 1, r);
    await merge(l, m, r);
  }

  await sort(0, a.length - 1);
  return a;
};
