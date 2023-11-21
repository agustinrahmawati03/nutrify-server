const getLevelActivity = (levActivicty) => {
  if (levActivicty === 1) {
    return 1.2;
  }
  if (levActivicty === 1) {
    return 1.4;
  }
  if (levActivicty === 3) {
    return 1.5;
  }
  if (levActivicty === 4) {
    return 1.7;
  }
  if (levActivicty === 5) {
    return 1.9;
  }

  return 1.2;
};

module.exports = { getLevelActivity };
