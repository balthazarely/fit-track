import moment from "moment";

export const workoutDataDemo = [
  {
    createdAt: moment().subtract(15, "days"),
    title: "Sample Workout 1",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 10,
            weight: 60,
            rpe: 8,
          },
          {
            reps: 10,
            weight: 60,
            rpe: 8.5,
          },
          {
            reps: 9,
            weight: 60,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 60,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 12,
            weight: 20,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 20,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 20,
            rpe: 9,
          },
        ],
      },
      {
        name: "Seated Cable Rows",
        sets: [
          {
            reps: 12,
            weight: 105,
            rpe: 8,
          },
          {
            reps: 12,
            weight: 105,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 105,
            rpe: 8.5,
          },
          {
            reps: 15,
            weight: 105,
            rpe: 10,
          },
        ],
      },
      {
        name: "Close-grip pull-down",
        sets: [
          {
            reps: 12,
            weight: 100,
            rpe: 9,
          },
          {
            reps: 12,
            weight: 100,
            rpe: 9,
          },
          {
            reps: 12,
            weight: 100,
            rpe: 9,
          },
        ],
      },
      {
        name: "Incline Hammer Curls",
        sets: [
          {
            reps: 10,
            weight: 30,
            rpe: 9,
          },
          {
            reps: 10,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 30,
            rpe: 8.5,
          },
        ],
      },
    ],
  },

  {
    createdAt: moment().subtract(11, "days"),
    title: "Sample Workout 2",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 6,
            weight: 75,
            rpe: 8,
          },
          {
            reps: 6,
            weight: 75,
            rpe: 8.5,
          },
          {
            reps: 7,
            weight: 75,
            rpe: 8.5,
          },
          {
            reps: 5,
            weight: 75,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 10,
            weight: 25,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 25,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 25,
            rpe: 9,
          },
        ],
      },
      {
        name: "Seated Cable Rows",
        sets: [
          {
            reps: 10,
            weight: 120,
            rpe: 8,
          },
          {
            reps: 10,
            weight: 120,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 120,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 120,
            rpe: 10,
          },
        ],
      },
      {
        name: "Close-grip pull-down",
        sets: [
          {
            reps: 10,
            weight: 115,
            rpe: 9,
          },
          {
            reps: 10,
            weight: 115,
            rpe: 9,
          },
          {
            reps: 10,
            weight: 115,
            rpe: 9,
          },
        ],
      },
      {
        name: "Incline Hammer Curls",
        sets: [
          {
            reps: 10,
            weight: 35,
            rpe: 9,
          },
          {
            reps: 10,
            weight: 35,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 35,
            rpe: 8.5,
          },
        ],
      },
    ],
  },
  {
    createdAt: moment().subtract(6, "days"),
    title: "Sample Workout 3",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 7,
            weight: 75,
            rpe: 8,
          },
          {
            reps: 7,
            weight: 75,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 75,
            rpe: 8.5,
          },
          {
            reps: 9,
            weight: 75,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 8,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 30,
            rpe: 9,
          },
        ],
      },
      {
        name: "Seated Cable Rows",
        sets: [
          {
            reps: 12,
            weight: 120,
            rpe: 8,
          },
          {
            reps: 12,
            weight: 120,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 120,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 130,
            rpe: 10,
          },
        ],
      },
      {
        name: "Close-grip pull-down",
        sets: [
          {
            reps: 10,
            weight: 125,
            rpe: 9,
          },
          {
            reps: 6,
            weight: 125,
            rpe: 9,
          },
          {
            reps: 7,
            weight: 125,
            rpe: 9,
          },
        ],
      },
      {
        name: "Incline Hammer Curls",
        sets: [
          {
            reps: 8,
            weight: 40,
            rpe: 9,
          },
          {
            reps: 8,
            weight: 40,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 30,
            rpe: 8.5,
          },
        ],
      },
    ],
  },
  {
    createdAt: moment().subtract(2, "days"),
    title: "Sample Workout 4",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 7,
            weight: 80,
            rpe: 8,
          },
          {
            reps: 7,
            weight: 80,
            rpe: 8.5,
          },
          {
            reps: 5,
            weight: 80,
            rpe: 8.5,
          },
          {
            reps: 5,
            weight: 80,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 9,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 9,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 7,
            weight: 30,
            rpe: 9,
          },
        ],
      },
      {
        name: "Seated Cable Rows",
        sets: [
          {
            reps: 10,
            weight: 120,
            rpe: 8,
          },
          {
            reps: 10,
            weight: 120,
            rpe: 8.5,
          },
          {
            reps: 11,
            weight: 120,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 130,
            rpe: 10,
          },
        ],
      },
      {
        name: "Close-grip pull-down",
        sets: [
          {
            reps: 11,
            weight: 125,
            rpe: 9,
          },
          {
            reps: 8,
            weight: 125,
            rpe: 9,
          },
          {
            reps: 8,
            weight: 125,
            rpe: 9,
          },
        ],
      },
      {
        name: "Incline Hammer Curls",
        sets: [
          {
            reps: 9,
            weight: 40,
            rpe: 9,
          },
          {
            reps: 5,
            weight: 45,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 30,
            rpe: 8.5,
          },
        ],
      },
    ],
  },
];
