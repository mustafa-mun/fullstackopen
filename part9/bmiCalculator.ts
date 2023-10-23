const calculateBmi = (height: number, kg: number): string => {
  const bmi: number = kg / Math.pow(height / 100, 2);
  console.log(bmi);

  let message: string = "";

  switch (true) {
    case bmi < 16:
      message = "Underweight (Severe thinness)";
      break;
    case bmi < 16.9:
      message = "Underweight (Moderate thinness)";
      break;
    case bmi < 18.4:
      message = "Underweight (Mild thinness)";
      break;
    case bmi < 24.9:
      message = "Normal range";
      break;
    case bmi < 29.9:
      message = "Overweight (Pre-obese)";
      break;
    case bmi < 34.9:
      message = "Obese (Class I)";
      break;
    case bmi < 34.9:
      message = "Obese (Class I)";
      break;
    case bmi < 39.9:
      message = "Obese (Class II)";
      break;
    case bmi >= 40.0:
      message = "Obese (Class III)";
      break;
    default:
      break;
  }

  return message;
};

console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 120));
