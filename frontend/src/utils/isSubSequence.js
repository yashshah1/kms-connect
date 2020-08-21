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

const isSubSequenceNew = (small, big) => {
  small = small.toLowerCase().split(" ");
  big = big.toLowerCase().split(" ");
  if (small.length > big.length) return false;
  let isMatched = true;
  for (let i = 0; i < small.length; i++) {
    if (!big[i].startsWith(small[i])) {
      isMatched = false;
      break;
    }
  }
  return isMatched;
};

export default isSubSequenceNew;
