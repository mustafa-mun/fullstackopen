interface bmiValues {
  height: number;
  kg: number;
}

const parseBmiArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      kg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, kg: number): string => {
  const bmi: number = kg / Math.pow(height / 100, 2);

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

const bmiValues = parseBmiArguments(process.argv);
console.log(calculateBmi(bmiValues.height, bmiValues.kg));
