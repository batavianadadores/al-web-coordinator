import { useEffect, useState } from "react";
import useCognitoSession from "./useCognitoSession";
import { useStudentLevelListQuery } from "@features/student/core/student-level-api.slice";
import { skipToken } from "@reduxjs/toolkit/query";

export function useStudentLevels() {
    const { updateTokenCallback } = useCognitoSession();
    const [tokenReady, setTokenReady] = useState(false);
    const [tokenError, setTokenError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                // Refresh token (or ensure it's fresh)
                await updateTokenCallback();

                if (!cancelled) {
                    setTokenReady(true);
                    setTokenError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setTokenReady(false);
                    setTokenError(err);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [updateTokenCallback]);

    const query = useStudentLevelListQuery(
        tokenReady ? { isActive: "true" } : skipToken
    );

    return {
        studentLevels: query.data?.items ?? [],
        ...query,
    };
}
