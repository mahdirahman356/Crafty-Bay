"use client"
import { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthProvider;