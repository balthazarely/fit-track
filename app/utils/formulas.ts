export const oneRepMaxFormula = (weight: number, reps: number) =>
  parseFloat((weight / (1.0278 - 0.0278 * reps)).toFixed(1));
