// [1, 1, 2, 2, 2, 3, 3, 3, 4, 5] -> ["", "", 2, "", "", 3, "", "", "", 5]
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

    // prevent 2 close months
    // [1, 2, 3] => ["", "", "3"]
    if (arr[i + 2] && arr[i] !== arr[i + 2]) {
      arr[i] = "";
    }
  }
  return arr;
}

export const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
});

export const commitDateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});
