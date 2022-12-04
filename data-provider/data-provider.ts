import PPFetch from "./fetch";

const ppfetch = new PPFetch(process.env.NEXT_PUBLIC_API_URL_BASE);

export class CancelablePromise<T> extends Promise<T> {
    cancel?: () => void;
}

const DataProvider = {
    async listPools(): Promise<APIPoolResponse[]> {
        try {
            let result = (await ppfetch.get(
                "/pool"
            )) as APIPaginationResponse<APIPoolResponse>;
            return result.items;
        } catch (error) {
            throw error;
        }
    },

    async listGeneral(): Promise<APIGeneralResponse> {
        try {
            let result = (await ppfetch.get("/general")) as APIGeneralResponse;

            result.paymentTypes = result.paymentTypes.filter(
                (e) => e.value !== "transferencia"
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    searchStudentByName(
        name: string,
        maxResults: number,
        startIndex: number
    ): CancelablePromise<APIPaginationResponse<APIStudentResponse>> {
        return DataProvider.searchStudent(
            name,
            "fullname",
            maxResults,
            startIndex
        );
    },

    searchStudentByIdNumber(
        idNumber: string,
        maxResults: number,
        startIndex: number
    ): CancelablePromise<APIPaginationResponse<APIStudentResponse>> {
        return DataProvider.searchStudent(
            idNumber,
            "idNumber",
            maxResults,
            startIndex
        );
    },

    searchStudentByBillId(
        billId: string,
        maxResults: number,
        startIndex: number
    ): CancelablePromise<APIPaginationResponse<APIStudentResponse>> {
        return DataProvider.searchStudent(
            billId,
            "billId",
            maxResults,
            startIndex
        );
    },

    searchStudent(
        q: string,
        by: "billId" | "idNumber" | "fullname",
        maxResults: number,
        startIndex: number
    ): CancelablePromise<APIPaginationResponse<APIStudentResponse>> {
        const controller = new AbortController();
        const signal = controller.signal;

        const promise = new CancelablePromise<
            APIPaginationResponse<APIStudentResponse>
        >(async (resolve, reject) => {
            try {
                let result = (await ppfetch.get(
                    "/student/search",
                    {
                        q: q,
                        field: by,
                        maxResults: maxResults.toString(),
                        startIndex: startIndex.toString(),
                    },
                    undefined,
                    signal
                )) as APIPaginationResponse<APIStudentResponse>;
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
        promise.cancel = () => {
            controller.abort();
        };

        return promise;
    },

    async addStudent(
        parameters: APIStudentParameters,
        token: string
    ): Promise<APIStudentResponse> {
        try {
            let result = (await ppfetch.post(
                "/student",
                parameters,
                undefined,
                token
            )) as APIStudentResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async updateStudent(
        studentId: number,
        parameters: APIStudentUpdateParameters,
        token: string
    ): Promise<APIStudentResponse> {
        try {
            let result = (await ppfetch.patch(
                `/student/${studentId}`,
                parameters,
                undefined,
                token
            )) as APIStudentResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async getStudent(studentId: number): Promise<APIStudentResponse> {
        try {
            let result = (await ppfetch.get(
                `/student/${studentId}`
            )) as APIStudentResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async listCourses(): Promise<APICourseResponse[]> {
        try {
            let result = (await ppfetch.get(
                "/course"
            )) as APIPaginationResponse<APICourseResponse>;
            return result.items;
        } catch (error) {
            throw error;
        }
    },

    async listSchedule(
        poolId: number,
        productId: number,
        startDate: string
    ): Promise<APIScheduleResponse[]> {
        try {
            let result = (await ppfetch.get("/schedule", {
                poolId: poolId.toString(),
                productId: productId.toString(),
                startDate,
            })) as APIPaginationResponse<APIScheduleResponse>;
            return result.items;
        } catch (error) {
            throw error;
        }
    },

    async addSale(
        sale: APISaleParameters,
        token: string
    ): Promise<APISaleResponse> {
        try {
            let result = await ppfetch.post(
                "/sale",
                sale,
                {
                    fullSchedule: "true",
                },
                token
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    async newListSchedule(
        poolId: number,
        courseId: number,
        from: string,
        to: string,
        hour: string,
        token: string
    ): Promise<APINewScheduleResponse[]> {
        try {
            let result = (await ppfetch.get(
                "/schedule",
                {
                    fullSchedule: "true",
                    poolId: poolId.toString(),
                    courseId: courseId.toString(),
                    from,
                    to,
                    hour,
                },
                token
            )) as APIPaginationResponse<APINewScheduleResponse>;
            return result.items;
        } catch (error) {
            throw error;
        }
    },

    async listCourseHours(poolId: number, courseId: number): Promise<string[]> {
        try {
            let result = (await ppfetch.get("/schedule", {
                poolId: poolId.toString(),
                courseId: courseId.toString(),
            })) as APIPaginationResponse<APIScheduleResponse>;

            let hours = result.items.map((e) => `${e.from}:00`);
            let uniqueHours = Array.from(new Set(hours));
            uniqueHours = uniqueHours.sort();

            return uniqueHours;
        } catch (error) {
            throw error;
        }
    },

    async listScheduleQuota(
        poolId: number,
        courseId: number,
        from: string,
        to: string,
        token: string
    ): Promise<APIScheduleQuotaResponse> {
        try {
            let result = (await ppfetch.get(
                "/schedule/quota",
                {
                    poolId: poolId.toString(),
                    courseId: courseId.toString(),
                    from,
                    to,
                },
                token
            )) as APIScheduleQuotaResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async listQuotaStudentSchedule(
        poolId: number,
        courseId: number,
        datetime: string,
        token: string
    ): Promise<APIQuotaStudentScheduleItemResponse[]> {
        try {
            let result = (await ppfetch.get(
                "/schedule/quota/studentSchedule",
                {
                    poolId: poolId.toString(),
                    courseId: courseId.toString(),
                    datetime,
                },
                token
            )) as APIQuotaStudentScheduleResponse;
            return result.studentSchedule;
        } catch (error) {
            throw error;
        }
    },

    async listStundentLessons(
        studentId: number,
        token: string
    ): Promise<APIStudentLessonResponse[]> {
        try {
            let result = (await ppfetch.get(
                `/student/${studentId}/lessons`,
                undefined,
                token
            )) as APIStudentLessonsResponse;
            return result.lessons;
        } catch (error) {
            throw error;
        }
    },

    listLessonStates(): APILessonState[] {
        return [
            {
                value: "canceled",
                description: "Cancelada",
                color: "red",
            },
            {
                value: "attended",
                description: "Asistida",
                color: "green",
            },
            {
                value: "to_recover",
                description: "Pendiente",
                color: "orange",
            },
            {
                value: "missed",
                description: "Perdida",
                color: "volcano",
            },
            {
                value: "pending",
                description: "Pendiente",
                color: "orange",
            },
            {
                value: "recovered",
                description: "Recuperada",
                color: "green",
            },
        ];
    },

    async reschedule(
        init: string,
        poolId: number,
        studentScheduleId: number,
        token: string
    ): Promise<APIRescheduleResponse> {
        try {
            let result = (await ppfetch.post(
                `/studentSchedule/${studentScheduleId}/reschedule`,
                {
                    init: init,
                    poolId: poolId,
                },
                undefined,
                token
            )) as APIRescheduleResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async getLastSaleDetail(
        studentId: number,
        token: string
    ): Promise<APISaleDetailItemResponse> {
        try {
            let result = (await ppfetch.get(
                `/student/${studentId}/saledetail`,
                { last: "true" },
                token
            )) as APISaleDetailItemResponse;

            return result;
        } catch (error) {
            throw error;
        }
    },

    async listStudentSaleDetails(
        studentId: number,
        maxResults: number,
        startIndex: number,
        token: string
    ): Promise<APISaleDetailsResponse> {
        try {
            let result = (await ppfetch.get(
                `/student/${studentId}/saledetail`,
                {
                    maxResults: maxResults.toString(),
                    startIndex: startIndex.toString(),
                    swa: "true",
                },
                token
            )) as APISaleDetailsResponse;

            return result;
        } catch (error) {
            throw error;
        }
    },

    async attachSale(
        sale: APIAttachSaleParameters,
        token: string
    ): Promise<APISaleResponse> {
        try {
            let result = await ppfetch.post(
                "/sale/attach",
                sale,
                undefined,
                token
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    async rescheduleBatch(
        batch: APIBatchParameters,
        token: string
    ): Promise<APIRescheduleBatchResponse> {
        try {
            let result = (await ppfetch.post(
                `/studentSchedule/rescheduleBatch`,
                batch,
                undefined,
                token
            )) as APIRescheduleBatchResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async setAttendance(
        studentScheduleId: number,
        poolId: number,
        token: string
    ): Promise<APISetAttendanceResponse> {
        try {
            let result = (await ppfetch.post(
                `/studentSchedule/${studentScheduleId}/attendance`,
                { poolId },
                undefined,
                token
            )) as APISetAttendanceResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async cancelLesson(
        studentScheduleId: number,
        token: string
    ): Promise<APICancelLessonResponse> {
        try {
            let result = (await ppfetch.post(
                `/studentSchedule/${studentScheduleId}/cancel`,
                {},
                undefined,
                token
            )) as APICancelLessonResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async listAttendanceReport(
        date: string,
        poolId: number,
        token: string
    ): Promise<APIAttendanceReportResponse> {
        try {
            let result = (await ppfetch.get(
                "/report/attendance",
                {
                    poolId: poolId.toString(),
                    date: date,
                },
                token
            )) as APIAttendanceReportResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async setLessonSmallPool(
        studentScheduleId: number,
        isSmallPool: boolean,
        token: string
    ): Promise<APISetLessonSmallPoolResponse> {
        try {
            let result = (await ppfetch.post(
                `/studentSchedule/${studentScheduleId}/smallPool`,
                { isSmallPool },
                undefined,
                token
            )) as APISetLessonSmallPoolResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async lookupStudentByIdNumber(
        idNumber: string
    ): CancelablePromise<APILookupStudentResponse> {
        const controller = new AbortController();
        const signal = controller.signal;

        const promise = new CancelablePromise<APILookupStudentResponse>(
            async (resolve, reject) => {
                try {
                    let result = (await ppfetch.get(
                        "/student/lookup",
                        {
                            q: idNumber,
                            field: "idNumber",
                        },
                        undefined,
                        signal
                    )) as APILookupStudentResponse;
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }
        );
        promise.cancel = () => {
            controller.abort();
        };

        return promise;
    },

    async setStudentAttendance(
        token: string,
        studentId: number,
        poolId: number
    ): Promise<APISetAttendanceResponse> {
        try {
            let result = (await ppfetch.post(
                `/studentSchedule/attendance`,
                {
                    studentId,
                    poolId,
                },
                undefined,
                token
            )) as APISetAttendanceResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async getBonusByCode(
        code: string,
        token: string
    ): Promise<APIBonusResponse> {
        try {
            let result = (await ppfetch.get(
                `/bonus/${code}`,
                {
                    p: "code",
                },
                token
            )) as APIBonusResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async getBonusById(id: number, token: string): Promise<APIBonusResponse> {
        try {
            let result = (await ppfetch.get(
                `/bonus/${id}`,
                {
                    p: "id",
                },
                token
            )) as APIBonusResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async listBonusForProduct(
        productId: number,
        token: string
    ): Promise<APIPaginationResponse<APIBonusResponse>> {
        try {
            let result = (await ppfetch.get(
                `/bonus`,
                {
                    startIndex: "0",
                    maxResults: "40",
                    productId: productId.toString(),
                    hasCode: "false",
                },
                token
            )) as APIPaginationResponse<APIBonusResponse>;
            return result;
        } catch (error) {
            throw error;
        }
    },

    async getPos(
        token: string,
        amount: string,
        productId: number,
        sucursal: number,
        bonusId?: number
    ): Promise<APIGetPosResponse> {
        try {
            const parameters: any = {
                amount: amount,
                sucursal: sucursal.toString(),
                productId: productId.toString(),
            };
            if (bonusId) {
                parameters.bonusId = bonusId.toString();
            }

            let result = (await ppfetch.get(
                `/sale/pos`,
                parameters,
                token
            )) as APIGetPosResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },
    async listReasons(token: string): Promise<APIExtraLessonReasonResponse[]> {
        try {
            let result = (await ppfetch.get(
                `/extraLessonReason`,
                undefined,
                token
            )) as APIPaginationResponse<APIExtraLessonReasonResponse>;
            return result.items;
        } catch (error) {
            throw error;
        }
    },
    async addLesson(
        token: string,
        body: APIAddLessonParameters
    ): Promise<APIResponse> {
        try {
            let result = (await ppfetch.post(
                `/studentSchedule`,
                body,
                undefined,
                token
            )) as APIResponse;
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default DataProvider;
