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
        description: "Burbujas",
        value: "beginner1",
    },
    beginner2: {
        description: "Flecha",
        value: "beginner2",
    },
    beginner3: {
        description: "Pateo",
        value: "beginner3",
    },
    intermeditate: {
        description: "Braceo circular",
        value: "intermeditate",
    },
    advanced: {
        description: "Estilos",
        value: "advanced",
    },
    adults: {
        description: "Adultos",
        value: "adults",
    },
});
