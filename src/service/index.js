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

module.exports = { getLevelActivity, hitungBMI };
