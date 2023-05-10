import moment from "moment";

export const workoutDataDemo = [
  {
    createdAt: moment().subtract(20, "days"),
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
    createdAt: moment().subtract(16, "days"),
    title: "Sample Workout 2",
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
            reps: 8,
            weight: 65,
            rpe: 8.5,
          },
          {
            reps: 9,
            weight: 65,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 65,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 12,
            weight: 25,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 25,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 25,
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
            weight: 110,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 110,
            rpe: 8.5,
          },
          {
            reps: 11,
            weight: 110,
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
            reps: 13,
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
            weight: 35,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 35,
            rpe: 8.5,
          },
        ],
      },
    ],
  },
  {
    createdAt: moment().subtract(13, "days"),
    title: "Sample Workout 3",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 10,
            weight: 65,
            rpe: 8,
          },
          {
            reps: 10,
            weight: 65,
            rpe: 8.5,
          },
          {
            reps: 9,
            weight: 65,
            rpe: 8.5,
          },
          {
            reps: 9,
            weight: 65,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 13,
            weight: 25,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 10,
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
            weight: 115,
            rpe: 8,
          },
          {
            reps: 10,
            weight: 115,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 110,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 110,
            rpe: 10,
          },
        ],
      },
      {
        name: "Close-grip pull-down",
        sets: [
          {
            reps: 10,
            weight: 110,
            rpe: 9,
          },
          {
            reps: 10,
            weight: 110,
            rpe: 9,
          },
          {
            reps: 10,
            weight: 110,
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
            reps: 7,
            weight: 40,
            rpe: 8.5,
          },
          {
            reps: 7,
            weight: 40,
            rpe: 8.5,
          },
        ],
      },
    ],
  },
  {
    createdAt: moment().subtract(10, "days"),
    title: "Sample Workout 4",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 8,
            weight: 70,
            rpe: 8,
          },
          {
            reps: 5,
            weight: 75,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 70,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 65,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 10,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 11,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 12,
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
            reps: 8,
            weight: 120,
            rpe: 8.5,
          },
          {
            reps: 8,
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
            reps: 11,
            weight: 110,
            rpe: 9,
          },
          {
            reps: 12,
            weight: 110,
            rpe: 9,
          },
          {
            reps: 12,
            weight: 110,
            rpe: 9,
          },
        ],
      },
      {
        name: "Incline Hammer Curls",
        sets: [
          {
            reps: 11,
            weight: 35,
            rpe: 9,
          },
          {
            reps: 8,
            weight: 40,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 40,
            rpe: 8.5,
          },
        ],
      },
    ],
  },

  {
    createdAt: moment().subtract(7, "days"),
    title: "Sample Workout 5",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 10,
            weight: 70,
            rpe: 8,
          },
          {
            reps: 9,
            weight: 70,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 70,
            rpe: 8.5,
          },
          {
            reps: 11,
            weight: 70,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 12,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 30,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 35,
            rpe: 9,
          },
        ],
      },
      {
        name: "Seated Cable Rows",
        sets: [
          {
            reps: 11,
            weight: 120,
            rpe: 8,
          },
          {
            reps: 10,
            weight: 120,
            rpe: 8.5,
          },
          {
            reps: 9,
            weight: 120,
            rpe: 8.5,
          },
          {
            reps: 5,
            weight: 125,
            rpe: 10,
          },
        ],
      },
      {
        name: "Close-grip pull-down",
        sets: [
          {
            reps: 12,
            weight: 110,
            rpe: 9,
          },
          {
            reps: 12,
            weight: 110,
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
            reps: 12,
            weight: 35,
            rpe: 9,
          },
          {
            reps: 9,
            weight: 40,
            rpe: 8.5,
          },
          {
            reps: 7,
            weight: 40,
            rpe: 8.5,
          },
        ],
      },
    ],
  },
  {
    createdAt: moment().subtract(5, "days"),
    title: "Sample Workout 6",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 11,
            weight: 70,
            rpe: 8,
          },
          {
            reps: 10,
            weight: 70,
            rpe: 8.5,
          },
          {
            reps: 11,
            weight: 70,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 70,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 10,
            weight: 35,
            rpe: 8.5,
          },
          {
            reps: 11,
            weight: 35,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 35,
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
            reps: 10,
            weight: 115,
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
            reps: 12,
            weight: 120,
            rpe: 9,
          },
          {
            reps: 8,
            weight: 120,
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
            reps: 9,
            weight: 40,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 40,
            rpe: 8.5,
          },
        ],
      },
    ],
  },
  {
    createdAt: moment().subtract(3, "days"),
    title: "Sample Workout 7",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 12,
            weight: 70,
            rpe: 8,
          },
          {
            reps: 10,
            weight: 75,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 75,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 70,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 12,
            weight: 35,
            rpe: 8.5,
          },
          {
            reps: 11,
            weight: 35,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 35,
            rpe: 9,
          },
        ],
      },
      {
        name: "Seated Cable Rows",
        sets: [
          {
            reps: 13,
            weight: 120,
            rpe: 8,
          },
          {
            reps: 10,
            weight: 125,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 125,
            rpe: 8.5,
          },
          {
            reps: 11,
            weight: 125,
            rpe: 10,
          },
        ],
      },
      {
        name: "Close-grip pull-down",
        sets: [
          {
            reps: 12,
            weight: 120,
            rpe: 9,
          },
          {
            reps: 12,
            weight: 125,
            rpe: 9,
          },
          {
            reps: 12,
            weight: 125,
            rpe: 9,
          },
        ],
      },
      {
        name: "Incline Hammer Curls",
        sets: [
          {
            reps: 10,
            weight: 40,
            rpe: 9,
          },
          {
            reps: 10,
            weight: 40,
            rpe: 8.5,
          },
          {
            reps: 10,
            weight: 45,
            rpe: 8.5,
          },
        ],
      },
    ],
  },
  {
    createdAt: moment().subtract(0, "days"),
    title: "Sample Workout 8",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: [
          {
            reps: 13,
            weight: 70,
            rpe: 8,
          },
          {
            reps: 11,
            weight: 75,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 80,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 70,
            rpe: 9,
          },
        ],
      },
      {
        name: "Chest dip",
        sets: [
          {
            reps: 12,
            weight: 35,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 35,
            rpe: 8.5,
          },
          {
            reps: 8,
            weight: 35,
            rpe: 9,
          },
        ],
      },
      {
        name: "Seated Cable Rows",
        sets: [
          {
            reps: 13,
            weight: 125,
            rpe: 8,
          },
          {
            reps: 11,
            weight: 125,
            rpe: 8.5,
          },
          {
            reps: 12,
            weight: 125,
            rpe: 8.5,
          },
          {
            reps: 11,
            weight: 125,
            rpe: 10,
          },
        ],
      },
      {
        name: "Close-grip pull-down",
        sets: [
          {
            reps: 12,
            weight: 120,
            rpe: 9,
          },
          {
            reps: 12,
            weight: 125,
            rpe: 9,
          },
          {
            reps: 13,
            weight: 125,
            rpe: 9,
          },
        ],
      },
      {
        name: "Incline Hammer Curls",
        sets: [
          {
            reps: 10,
            weight: 40,
            rpe: 9,
          },
          {
            reps: 10,
            weight: 45,
            rpe: 8.5,
          },
          {
            reps: 13,
            weight: 45,
            rpe: 8.5,
          },
        ],
      },
    ],
  },
];
