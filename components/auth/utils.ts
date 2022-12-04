/**
 * Authentication configuration
 */
export interface AuthEnabledComponentConfig {
    auth: AuthConfig;
}

export interface AuthConfig {
    role: string[];
    unauthorized: string; // redirect to this url
    removeLayout: boolean;
}

/**
 * A component with authentication configuration
 */
export type ComponentWithAuth<PropsType = any> = React.FC<PropsType> &
    AuthEnabledComponentConfig;
