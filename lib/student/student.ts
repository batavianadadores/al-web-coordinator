export type Level =
    | "no_level"
    | "mom_baby"
    | "toddler_pool"
    | "beginner1"
    | "beginner2"
    | "beginner3"
    | "intermeditate"
    | "advanced"
    | "adults";

export const LevelFields = Object.freeze({
    all: [
        "no_level",
        "mom_baby",
        "toddler_pool",
        "beginner1",
        "beginner2",
        "beginner3",
        "intermeditate",
        "advanced",
        "adults",
    ],
    no_level: {
        description: "Sin nivel",
        value: "no_level",
    },
    mom_baby: {
        description: "Mamá bebé",
        value: "mom_baby",
    },
    toddler_pool: {
        description: "Patera",
        value: "toddler_pool",
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
        description: "Intermedio",
        value: "intermeditate",
    },
    advanced: {
        description: "Avanzado",
        value: "advanced",
    },
    adults: {
        description: "Adultos",
        value: "adults",
    },
});
