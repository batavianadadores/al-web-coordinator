export type StudentLevel = {
    levelId: number;
    name: string;
    code: string;
    isActive: boolean;
};

export type StudentLevelListResponse = { items: StudentLevel[] };
