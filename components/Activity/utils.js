// [1, 1, 2, 2, 2, 3, 3, 3, 4, 5] -> [1, "", 2, "", "", 3, "", "", "", 5]
export function clearDuplicatedMonth(arr) {
  let current;
  let currentIndex;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== current) {
      current = arr[i];
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }

    if (currentIndex > 0) {
      arr[i] = "";
    }

    // prevent close month
    // [1,2] => ["", 2]
    if (arr[i + 1] && arr[i] !== arr[i + 1]) {
      arr[i] = "";
    }
  }
  return arr;
}
