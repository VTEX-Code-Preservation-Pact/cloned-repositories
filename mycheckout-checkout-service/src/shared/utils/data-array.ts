export function splitArrayIntoChunksOfLen(arr, len = 25, cb = (arr) => arr) {
  const chunks = [];
  let i = 0;
  const n = arr.length;
  while (i < n) {
    chunks.push(cb(arr.slice(i, (i += len))));
  }
  return chunks;
}

export function deleteNull(attrs) {
  Object.keys(attrs).forEach(
    (index) => attrs[index] === null && delete attrs[index],
  );
  return attrs;
}
