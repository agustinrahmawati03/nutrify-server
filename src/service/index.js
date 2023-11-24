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

function hitungBMI(berat, tinggi) {
  // Konversi tinggi ke dalam meter
  let tinggiMeter = tinggi / 100; // Tinggi dalam cm, dikonversi ke meter

  // Hitung BMI
  let bmi = berat / (tinggiMeter * tinggiMeter);

  if (bmi < 18.5) {
    return 'Kurang';
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal';
  }
  if (bmi >= 25.0 && bmi <= 29.9) {
    return 'kelebihan berat badan';
  }
  if (bmi > 30) {
    return 'Obesitas';
  }
}
const findByDate = (data, trackDate) => {
  const tracking = data.findIndex((el) =>
    el.date.toISOString().includes(trackDate)
  );
  return tracking;
};
const totalNutri = (data) => {
  let totCarb = 0;
  let totProtein = 0;
  let totFat = 0;
  let totCal = 0;
  if (data) {
    totCarb = data.food.reduce(
      (prev, curr) => prev + curr.foodId.carb * curr.portion,
      0
    );
    totProtein = data.food.reduce(
      (prev, curr) => prev + curr.foodId.protein * curr.portion,
      0
    );
    totFat = data.food.reduce(
      (prev, curr) => prev + curr.foodId.fat * curr.portion,
      0
    );
    totCal = data.food.reduce(
      (prev, curr) => prev + curr.foodId.cal * curr.portion,
      0
    );
  }

  const nutri = {
    totCarb: Number(totCarb.toFixed(2)),
    totProtein: Number(totProtein.toFixed(2)),
    totFat: Number(totFat.toFixed(2)),
    totCal: Number(totCal.toFixed(2)),
  };
  return nutri;
};

module.exports = {
  getLevelActivity,
  hitungBMI,
  findByDate,
  totalNutri,
};
