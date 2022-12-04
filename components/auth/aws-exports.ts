const config = {
    Auth: {
        region: process.env.NEXT_PUBLIC_COGNITO_REGION,
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_POOL_ID,
        userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        mandatorySignIn: true,
        authenticationFlowType: "USER_PASSWORD_AUTH",
    },
};

export default config;
