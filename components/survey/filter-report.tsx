import { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Typography, Space, Select } from "antd";

import useCognitoSession from "@hooks/useCognitoSession";
import { Question } from "entities/survey/question/question";
import { Pool } from "entities/pool/pool";
import { useLazyListPoolsQuery } from "@features/pool/pool-api.slice";
import { useLazyListQuestionsQuery } from "@features/survey/survey-api.slice";
import { wrapTryCatchOverAPICallWithReturn } from "@components/utils/component.util";

const { Option } = Select;
const { Text } = Typography;

export type ReportFilterSelectedValues = {
    interval: [Moment, Moment];
    questionId?: number;
    poolId?: number;
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

    const [getQuestionsTrigger, getQuestionsResult] =
        useLazyListQuestionsQuery();
    const [questions, setQuestions] = useState<Question[]>([]);

    const [listPoolsTrigger, listPoolsResult] = useLazyListPoolsQuery();
    const [pools, setPools] = useState<Pool[]>([]);

    useEffect(() => {
        (async () => {
            const questions = [...((await listQuestionsAPI())?.items ?? [])];
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
        (async () => {
            const pools = (await listPoolsAPI())?.items ?? [];
            setPools(pools);
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
    const listPoolsAPI = () => {
        return wrapTryCatchOverAPICallWithReturn(async () => {
            await updateTokenCallback();
            const result = await listPoolsTrigger({
                maxResults: 10,
                startIndex: 0,
            }).unwrap();
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
                        Periodo:{" "}
                        {`Del ${
                            selectedValues?.interval?.[0]?.format("DD MMMM") ??
                            "-"
                        } al ${
                            selectedValues?.interval?.[1]?.format("DD MMMM") ??
                            "-"
                        }`}
                    </Text>
                </Space>
                <Space>
                    <Text>
                        Piscina:{" "}
                        {`${
                            pools.find(
                                (e) => e.poolId === selectedValues.poolId
                            )?.name ?? "-"
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
