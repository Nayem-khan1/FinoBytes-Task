import Landing from "@/pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                {/* <Route path="/login/admin" element={<AdminLogin />} />
                <Route path="/login/merchant" element={<MerchantLogin />} />
                <Route path="/login/member" element={<MemberLogin />} />
                <Route
                    path="/dashboard/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/merchant"
                    element={
                        <ProtectedRoute role="merchant">
                            <MerchantDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/member"
                    element={
                        <ProtectedRoute role="member">
                            <MemberDashboard />
                        </ProtectedRoute>
                    }
                /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
