export type Level =
    | "no_level"
    | "beginner1"
    | "beginner2"
    | "beginner3"
    | "intermeditate"
    | "intermeditate2"
    | "advanced";

export const LevelFields = Object.freeze({
    all: [
        "no_level",
        "beginner1",
        "beginner2",
        "beginner3",
        "intermeditate",
        "intermeditate2",
        "advanced",
    ],
    no_level: {
        description: "Sin nivel",
        value: "no_level",
    },
    beginner1: {
        description: "Principiante 1",
        value: "beginner1",
    },
    beginner2: {
        description: "Principiante 2",
        value: "beginner2",
    },
    beginner3: {
        description: "Principiante 3",
        value: "beginner3",
    },
    intermeditate: {
        description: "Intermedio 1",
        value: "intermeditate",
    },
    intermeditate2: {
        description: "Intermedio 2",
        value: "intermeditate2",
    },
    advanced: {
        description: "Avanzado",
        value: "advanced",
    },
});
