export type State =
    | "pending"
    | "attended"
    | "missed"
    | "recovered"
    | "to_recover"
    | "canceled";

export const States = Object.freeze([
    "pending",
    "attended",
    "missed",
    "recovered",
    "to_recover",
    "canceled",
]);

export const StateDescription = Object.freeze({
    pending: "Programada",
    attended: "Asistida",
    missed: "Perdida",
    recovered: "Recuperada",
    to_recover: "Por recuperar",
    canceled: "Cancelada",
});
