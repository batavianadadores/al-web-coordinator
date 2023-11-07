// API response types
type APIErrorResponse = {
    errorCode: number;
    userMessage: string;
    developerMessage: string;
    moreInfo: string;
};

type APIPoolResponse = {
    poolId: number;
    name: string;
    description: string;
    address: string;
};

type APIPaginationResponse<T> = {
    totalItems: number;
    items: T[];
};

type APIGeneralResponse = {
    idTypes: APIGeneralItem[];
    sellers: APIGeneralItem[];
    holidays: APIGeneralItem[];
    paymentTypes: APIGeneralItem[];
};

type APIGeneralItem = {
    value: string;
    description: string;
    validator: string;
};

type APIStudentResponse = {
    studentId: number;
    accountId: number;
    names: string;
    motherFamilyName: string;
    fatherFamilyName: string;
    idType: string;
    idNumber: string;
    birthday: string;
    phoneNumber1: string;
    phoneNumber2: string;
    email: string;
    comment: string;
    createdBy: string;
    allowInscription: boolean;
    createdAt: string;
};

type APICourseResponse = {
    courseId: number;
    name: string;
    description: string;
    ageMin: number;
    ageMax: number;
    product: APIProductResponse[];
};

type APIProductResponse = {
    name: string;
    productId: number;
    price: string;
    validityFrom: string;
    validityTo: string;
    lessonsNumber: number;
    canChangeSchedule: boolean;
    lessonsPerWeek: number;
    poolId: number;
    state: string;
    courseId: number;
    showInWeb: boolean;
    course: APICourseResponse;
};

type APIScheduleResponse = {
    scheduleId: number;
    poolId: number;
    courseId: number;
    name: string;
    from: string;
    to: string;
    day: number;
    capacity: number;
    quota: number;
};

type APISaleResponse = {
    saleId: number;
    date: string;
    debt: string;
    webId: string;
    billId: string;
    eiLink: string;
    seller: number;
    soldBy: string;
    eiEmail: string;
    eiNames: string;
    eiIdType: string;
    eiIdNumber: string;
    totalAmount: string;
    referenceCode: string;
    partialPayment: string;
    eiFatherFamilyName: string;
    eiMotherFamilyName: string;
    isElectronicInvoice: boolean;
    payments: APISalePaymentResponse[];
};

type APISalePaymentResponse = {
    amount: string;
    paymentType: string;
};

type APINewScheduleResponse = {
    day: string;
    dayOfWeek: number;
    capacity: number;
    quota: number;
};

type APIScheduleQuotaResponse = {
    days: APIScheduleQuotaDayResponse[];
};

type APIScheduleQuotaDayResponse = {
    day: string;
    state: string;
    hours: APIScheduleQuotaHourResponse[];
};

type APIScheduleQuotaHourResponse = {
    datetime: string;
    capacity: number;
    quota: number;
    hour: string;
};

type APIQuotaStudentScheduleResponse = {
    studentSchedule: APIQuotaStudentScheduleItemResponse[];
};

type APIQuotaStudentScheduleItemResponse = {
    studentScheduleId: number;
    saleDetailId: number;
    studentId: number;
    init: string;
    end: string;
    state: string;
    attendanceTime: string;
    poolId: number;
    updatedBy: string;
    updatedAt: string;
    accountId: number;
    names: string;
    motherFamilyName: string;
    fatherFamilyName: string;
    idType: String;
    idNumber: string;
    birthday: string;
    phoneNumber1: string;
    phoneNumber2: string;
    email: string;
    comment: string;
    allowInscription: boolean;
    createdBy: string;
    createdAt: string;
    cognito: boolean;
};

type APIStudentLessonsResponse = {
    lessons: APIStudentLessonResponse[];
};

type APIStudentLessonResponse = {
    studentScheduleId: number;
    saleDetailId: number;
    init: string;
    end: string;
    state: string;
    attendanceTime: string;
    courseId: number;
    poolId: number;
    number: number;
    saleDetailInitDate: string;
    saleDetailEndDate: string;
};

type APILessonState = {
    value: APILessonStateType;
    description: string;
    color: string;
};

type APILessonStateType =
    | "canceled"
    | "attended"
    | "to_recover"
    | "missed"
    | "pending"
    | "recovered"
    | "frozen"
    | "transferred"
    | "to_program";

type APIRescheduleResponse = {
    studentScheduleId: number;
    saleDetailId: number;
    studentId: number;
    init: string;
    end: string;
    state: string;
    attendanceTime: string;
    poolId: number;
    updatedBy: string;
    updatedAt: string;
};

type APILastSaleDetailResponse = {
    saleDetail: APISaleDetailResponse;
    saleDetailSchedule: APISaleDetailScheduleResponse[];
};

type APISaleDetailResponse = {
    saleDetailId: number;
    saleId: number;
    productId: number;
    studentId: number;
    price: string;
    lessonsNumber: number;
    initDate: string;
    endDate: string;
};

type APISaleDetailScheduleResponse = {
    saleDetailScheduleId: number;
    saleDetailId: number;
    day: number;
    init: string;
};

type APISaleDetailsResponse = APIPaginationResponse<APISaleDetailItemResponse>;

type APISaleDetailItemResponse = {
    saleDetailId: number;
    saleId: number;
    productId: number;
    studentId: number;
    price: string;
    lessonsNumber: number;
    initDate: string;
    endDate: string;
    bonusId: number;
    bonusAmount: string;
    bonusLessons: number;
    sale: APISaleResponse;
    product: APIProductResponse;
    studentSchedule: APIStudentScheduleResponse[];
    saleDetailSchedule: APISaleDetailScheduleResponse[];
};

type APIStudentScheduleResponse = {
    studentScheduleId: number;
    saleDetailId: number;
    studentId: number;
    init: string;
    end: string;
    state: string;
    attendanceTime: string;
    poolId: number;
    updatedBy: string;
    updatedAt: string;
    attendanceBy: string;
    isSmallPool: boolean;
};

type APIRescheduleBatchResponse = {
    items: (APIRescheduleResponse | APIErrorResponse)[];
};

type APISetAttendanceResponse = {
    message: string;
    isSuccess: boolean;
    student: APIStudentResponse;
    activeDetail?: APISaleDetailItemResponse;
    lastDetail?: APISaleDetailItemResponse;
};

type APICancelLessonResponse = APISetAttendanceResponse;

type APISetLessonSmallPoolResponse = APISetAttendanceResponse;

type APIAttendanceReportResponse = {
    result: APIAttendanceReportItemResponse[];
};

type APIAttendanceReportItemResponse = APIStudentScheduleResponse & {
    courseId: number;
    name: string;
};

type APILookupStudentResponse = APIStudentResponse & {
    saleDetails: APISaleDetailItemResponse[];
};

type APIBonusResponse = {
    bonusId: number;
    name: string;
    description: string;
    code: string;
    lessonsNumber: number;
    amountFixed: string;
    amountPercentage: string;
    isNewStudent: boolean;
    initDate: string;
    endDate: string;
    state: APIBonusState;
    terms: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    bonusProducts: APIBonusProductResponse[];
};

type APIBonusState = "enabled" | "disabled";

type APIBonusProductResponse = {
    bonusId: number;
    productId: number;
    createdBy: string;
    createAt: string;
    updatedBy: string;
    updatedAt: string;
    product: APIProductResponse;
};

type APIGetPosResponse = {
    pos: string;
    message: string;
};

type APIResponse = {
    message: string;
};

type APIExtraLessonReasonResponse = {
    extraLessonReasonId: number;
    name: string;
    description: string;
    lessons: number;
};

// API parameters type

type APIStudentParameters = {
    names: string;
    motherFamilyName: string;
    fatherFamilyName: string;
    idType: string;
    idNumber: string;
    birthday: string;
    email: string;
    comment?: string;
    phoneNumber1?: string;
    phoneNumber2?: string;
};

type APIStudentUpdateParameters = {
    names?: string;
    motherFamilyName?: string;
    fatherFamilyName?: string;
    idType?: string;
    idNumber?: string;
    birthday?: string;
    email?: string;
    comment?: string;
    phoneNumber1?: string;
    phoneNumber2?: string;
};

type APISaleParameters = {
    sucursal: number;
    referenceCode?: string;
    eiIdType: string;
    eiIdNumber: string;
    eiNames: string;
    eiFatherFamilyName: string;
    eiMotherFamilyName: string;
    eiEmail: string;
    eiAddress?: string;
    iType: string;
    payment: APISalePaymentParameters[];
    detail: APISaleDetailParameters[];
};

type APISalePaymentParameters = {
    type: string;
    amount: string;
};

type APISaleDetailParameters = {
    productId: number;
    studentId: number;
    bonusId?: number;
    price: string;
    schedules: APISaleDetailScheduleParameters[];
    studentSchedule: APISaleDetailStudentScheduleParameters[];
};

type APISaleDetailScheduleParameters = {
    day: number;
    init: string;
};

type APISaleDetailStudentScheduleParameters = string;

type APIAttachSaleParameters = APISaleParameters & {
    saleDetailId: number;
};

type APIBatchParameters = {
    items: APIBatchParametersItem[];
};

type APIBatchParametersItem = {
    init: string;
    poolId: number;
    studentScheduleId: number;
};

type APIAddLessonParameters = {
    saleDetailId: number;
    extraLessonReasonId: number;
    poolId: number;
    lessons: string[];
};

// Components
type GeneralData = {
    pools: APIPoolResponse[];
    idTypes: APIGeneralItem[];
    sellers: APIGeneralItem[];
    holidays: APIGeneralItem[];
    paymentTypes: APIGeneralItem[];
    courses: APICourseResponse[];
    lessonStates: APILessonState[];
};
