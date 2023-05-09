import { oneRepMaxFormula } from "@/utils/formulas";
import moment from "moment";

export const parseExerciseDataForGraph = (exerciseData: any) => {
  return exerciseData
    ?.map((dataset: any) => {
      const bestSet = dataset.sets.reduce(function (prev: any, current: any) {
        return prev.weight * prev.reps > current.weight * current.reps
          ? prev
          : current;
      });
      const bestSetObj = {
        weight: bestSet.weight,
        reps: bestSet.reps,
      };
      const oneRepMax = oneRepMaxFormula(bestSetObj.weight, bestSetObj.reps);

      const totalVolume = dataset.sets.reduce((acc: any, set: any) => {
        return acc + set.reps * set.weight;
      }, 0);

      return {
        createdAt: moment(dataset.createdAt).format("MM-DD-YYYY"),
        bestSet: bestSetObj,
        totalVolume: totalVolume,
        oneRepMax: oneRepMax,
        sets: dataset.sets,
      };
    })
    .sort((a: any, b: any) =>
      moment(a.createdAt, "MM-DD-YYYY").diff(moment(b.createdAt, "MM-DD-YYYY"))
    );
};
