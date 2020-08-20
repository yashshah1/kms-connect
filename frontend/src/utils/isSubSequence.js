const joinString = (string) => string.split(" ").join("");

const isSubSequence = (small, big) => {
  small = joinString(small.toLowerCase());
  big = joinString(big.toLowerCase());
  let smallIndex = 0;
  for (
    let bigIndex = 0;
    bigIndex < big.length && smallIndex < small.length;
    bigIndex++
  ) {
    if (small[smallIndex] === big[bigIndex]) smallIndex++;
  }
  return smallIndex === small.length;
};
export default isSubSequence;
