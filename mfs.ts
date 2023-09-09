/**
 * Sorts a list of ids by multiple fields.
 * @param ids an object of { id: [field1, field2, ...] }; this will be modified while sorting.
 */
function multiFieldSort(ids: Record<string, number[]>): string[] {
  const values = Object.values(ids);
  const numFields = values[0].length;
  for (let i = 0; i < numFields; ++i) {
    const sortedUniqueFields = [...new Set(values.map(v => v[i]))].sort((a, b) => a - b);
    const uniqueLen = sortedUniqueFields.length;
    const valToIdx: Map<number, number> = new Map();
    sortedUniqueFields.forEach((val, idx) => valToIdx.set(val, (idx + 1) / uniqueLen));
    values.forEach(v => v[i] = valToIdx.get(v[i])!);  // will not be undefined
  }
  values.forEach(v => v.push(v.reduce((a, b) => a * b)));
  return Object.keys(ids).sort((a, b) => {
    return ids[a][numFields] - ids[b][numFields];
  });
}