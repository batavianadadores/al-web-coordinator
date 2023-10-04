import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { RangePickerProps } from "antd/lib/date-picker";
import { Typography, Space, DatePicker, Select, message } from "antd";

import { PoolModel } from "@lib/pool/model/pool.model";
import useCognitoSession from "@hooks/useCognitoSession";
import { ErrorModel } from "@lib/common/model/error.model";
import { Question } from "entities/survey/question/question";
import { ReportController } from "@lib/report/controller/report.controller";
import { useLazyListQuestionsQuery } from "@features/survey/survey-api.slice";
import { wrapTryCatchOverAPICallWithReturn } from "@components/utils/component.util";

const { Option } = Select;
const { Text } = Typography;
const { RangePicker } = DatePicker;

export type ReportFilterSelectedValues = {
    interval?: [Moment, Moment];
    questionId?: number;
};

type SurveyReportFilterProps = {
    selectedValues: ReportFilterSelectedValues;
    onSelectedValuesChanged: (values: ReportFilterSelectedValues) => void;
};

const SurveyReportFilter: React.FC<SurveyReportFilterProps> = ({
    selectedValues,
    onSelectedValuesChanged,
}) => {
    const { updateTokenCallback } = useCognitoSession();
    const reportController = new ReportController();

    const disabledDate: RangePickerProps["disabledDate"] = (current) => {
        return current && current > moment().endOf("day");
    };

    const [getQuestionsTrigger, getQuestionsResult] =
        useLazyListQuestionsQuery();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [pools, setPools] = useState<PoolModel[]>([]);
    const [isLoadingPoolsAndCourses, setIsLoadingPoolsAndCourses] =
        useState(false);

    useEffect(() => {
        loadPoolsAndCourses();
    }, []);

    const loadPoolsAndCourses = async () => {
        setIsLoadingPoolsAndCourses(true);
        try {
            const p = await reportController.listPools();
            const allPools = new PoolModel();
            allPools.name = "Todas las piscinas";
            allPools.poolId = 0;
            p.push(allPools);
            p.sort((a, b) => a.poolId - b.poolId);

            setPools(p);
        } catch (error) {
            if (error instanceof ErrorModel) {
                message.error(error.message);
            } else {
                message.error("No pudimos completar tu solicitud");
            }
        } finally {
            setIsLoadingPoolsAndCourses(false);
        }
    };

    useEffect(() => {
        (async () => {
            const questions = [...(await listQuestionsAPI()).items];
            questions.splice(0, 0, {
                questionId: 0,
                description: "Todas las preguntas",
                surveyId: 0,
                title: "",
                minScore: 0,
                maxScore: 0,
                maxScoreText: "",
                minScoreText: "",
                isDeleted: false,
                descriptionAdult: "",
            });
            setQuestions(questions);
        })();
    }, []);

    //#region API calls
    const listQuestionsAPI = () => {
        return wrapTryCatchOverAPICallWithReturn(async () => {
            await updateTokenCallback();
            const result = await getQuestionsTrigger(undefined).unwrap();
            return result;
        });
    };
    //#endregion

    return (
        <Space direction="vertical" style={{ width: "100%" }} size={[10, 0]}>
            <div
                style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "space-around",
                    margin: "2rem 2rem 1rem 2rem",
                }}
            >
                <Space>
                    <Text>
                        Periodo:
                        {`Del ${
                            selectedValues?.interval?.[0]?.format("MMMM") ?? "-"
                        } al ${
                            selectedValues?.interval?.[1]?.format("MMMM") ?? "-"
                        }`}
                    </Text>
                </Space>
            </div>
            <div
                style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "space-around",
                    margin: "2rem 2rem 1rem 2rem",
                }}
            >
                <Space>
                    <Text>Preguntas:</Text>
                    <Select
                        loading={getQuestionsResult.isFetching}
                        style={{ width: "60rem" }}
                        defaultValue={0}
                        value={selectedValues.questionId}
                        onSelect={(questionId) => {
                            if (questionId === 0) {
                                onSelectedValuesChanged({
                                    ...selectedValues,
                                    questionId: undefined,
                                });
                                return;
                            }

                            onSelectedValuesChanged({
                                ...selectedValues,
                                questionId,
                            });
                        }}
                    >
                        {questions.map((e) => (
                            <Option value={e.questionId} key={e.questionId}>
                                {e.description}
                            </Option>
                        ))}
                    </Select>
                </Space>
            </div>
        </Space>
    );
};

export default SurveyReportFilter;
