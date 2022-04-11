import React from "react";
import {withAuthenticationRequired} from "@auth0/auth0-react";

export default function ProtectedRoute({protectedComponent}) {
    const Component = withAuthenticationRequired(protectedComponent);
    return <Component/>;
}