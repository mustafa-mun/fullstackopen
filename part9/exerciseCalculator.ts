interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 2, 2, 4.5, 0, 3, 1], 2));
