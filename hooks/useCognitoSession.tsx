import { useAuthenticator } from "@aws-amplify/ui-react";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { useCallback, useEffect, useState } from "react";

function useCognitoSession() {
    const { user } = useAuthenticator((context) => [context.user]);

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

    return {
        user,
        getIdTokenCallback,
    };
}

export default useCognitoSession;
