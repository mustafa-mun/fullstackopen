import { isNotNumber } from "./utils/helper";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  dailyHours: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): exerciseValues => {
  if (args.length < 2) throw new Error("Not enough arguments");

  let dailyHours: number[] = args.slice(3, args.length).map((val) => {
    if (!isNotNumber(val)) {
      return Number(val);
    }
    throw new Error("daily hours needs to be numbers");
  });

  const target = Number(args[2]);

  if (isNotNumber(target)) {
    throw new Error("Target must be a number value!");
  }

  return {
    dailyHours,
    target,
  };
};

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const ratings: { [key: number]: string } = {
    1: "too bad",
    2: "not too bad but could be better",
    3: "excellent",
  };

  const trainingDays: number[] = dailyHours.filter((hour) => hour !== 0);
  const average: number =
    dailyHours.reduce((acc, curr) => {
      return acc + curr;
    }, 0) / dailyHours.length;
  const success: boolean = average >= target;
  let rating: number = 0;

  const diffrence = target - average;

  switch (true) {
    case diffrence < 0:
      rating = 3;
      break;
    case diffrence <= 0.5:
      rating = 2;
      break;
    default:
      rating = 1;
      break;
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: trainingDays.length,
    success,
    rating,
    ratingDescription: ratings[rating],
    target,
    average,
  };
};

const exerciseValues = parseExerciseArguments(process.argv);
console.log(
  calculateExercises(exerciseValues.dailyHours, exerciseValues.target)
);
