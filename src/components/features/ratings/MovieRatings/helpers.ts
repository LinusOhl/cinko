export const getRatingColor = (score: number) => {
  switch (true) {
    case score < 2:
      return "red";
    case score < 3:
      return "orange";
    case score < 4:
      return "yellow";
    case score < 5:
      return "lime";
    case score === 5:
      return "green";
  }
};
