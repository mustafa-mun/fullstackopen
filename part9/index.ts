import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNotNumber } from "./utils/helper";
const app = express();

app.use(express.json());

app.get("/hello", (_req: Request, res: Response<string>) => {
  res.send("Hello Full Stack!");
});

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.get("/bmi", (req: Request, res: Response) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({
      error: "height and weight are required",
    });
  }

  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmi = calculateBmi(height, weight);
  return res.json({
    weight,
    height,
    bmi,
  });
});

type exerciseDays = number[];
type target = number;
app.post("/exercises", (req: Request, res: Response) => {
  const { daily_exercises, target } = req.body;

  const dailyExercises = daily_exercises as exerciseDays;
  const t = target as target;

  if (!dailyExercises || !target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  return res.json(calculateExercises(dailyExercises, t));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
