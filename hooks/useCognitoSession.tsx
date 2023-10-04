import { useAuthenticator } from "@aws-amplify/ui-react";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { useCallback, useEffect, useState } from "react";

import { useAppDispatch } from "app/hooks";
import { setToken } from "@features/auth/auth.slice";

function useCognitoSession() {
    const { user } = useAuthenticator((context) => [context.user]);
    const dispatch = useAppDispatch();

    const getIdTokenCallback = useCallback(async () => {
        return new Promise<string>((resolve, reject) => {
            if (user) {
                user.getSession((e: any, s: CognitoUserSession) => {
                    if (e) {
                        reject(e);
                    }

                    resolve(s.getIdToken().getJwtToken());
                });
            } else {
                reject(new Error("User not instanciated"));
            }
        });
    }, [user]);

    const updateTokenCallback = useCallback(async () => {
        const token = await getIdTokenCallback();
        dispatch(setToken(token));
        return token;
    }, [user]);

    return {
        user,
        getIdTokenCallback,
        updateTokenCallback,
    };
}

export default useCognitoSession;
