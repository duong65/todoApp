import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    // Navigate,
} from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
// import { isAuthenticated } from "./service/UserApi";
import "./assets/app.css";

const HomePage = React.lazy(() => import("./pages/Home"));
const LoginPage = React.lazy(() => import("./pages/Login"));
const RegisterPage = React.lazy(() => import("./pages/Register"));
const CategoryPage = React.lazy(() => import("./pages/Category"));

// const LoginRouter = ({ path, element }) => {
//   const isLogin = isAuthenticated();
//   return (
//     <Route
//       path={path}
//       element={({ location }) =>
//         isLogin ? (
//           <Navigate to={{ pathname: "/", state: { from: location } }} />
//         ) : (
//           element
//         )
//       }
//     />
//   );
// };

const App = () => {
    return (
        <Router>
            <Suspense fallback={<Skeleton animation="wave" />}>
                <Routes>
                    <Route path="/*" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/category" element={<CategoryPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;