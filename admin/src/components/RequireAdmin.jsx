import { Navigate, Outlet, useLocation, useOutletContext } from "react-router";

export default function RequireAdmin() {
    const outletContext = useOutletContext();
    const { currentUser } = outletContext;
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (currentUser.role !== "ADMIN") {
        return <Navigate to="/login" state={{ from: location, notAdmin: true }} replace />;
    }

    return <Outlet context={outletContext} />;
}