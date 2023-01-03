export type CapacityType = "F" | "M" | "R";

export const CapacityTypes = Object.freeze(["F", "M", "R"]);

export const CapacityTypeDescription = Object.freeze({
    F: "Fijo",
    M: "Máximo",
    R: "Flexible",
});

export type Status = "enabled" | "disabled";

export const Statuses = Object.freeze(["enabled", "disabled"]);

export const StatusDescription = Object.freeze({
    enabled: "Activo",
    disabled: "No activo",
});
