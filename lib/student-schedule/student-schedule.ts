export type State =
    | "pending"
    | "attended"
    | "missed"
    | "recovered"
    | "to_recover"
    | "canceled"
    | "frozen"
    | "transferred"
    | "to_program";

export const States = Object.freeze([
    "pending",
    "attended",
    "missed",
    "recovered",
    "to_recover",
    "canceled",
    "frozen",
    "transferred",
    "to_program",
]);

export const StateDescription = Object.freeze({
    pending: "Programada",
    attended: "Asistida",
    missed: "Perdida",
    recovered: "Recuperada",
    to_recover: "Por recuperar",
    canceled: "Cancelada",
    frozen: "Congelada",
    transferred: "Transferida",
    to_program: "Por programar",
});
