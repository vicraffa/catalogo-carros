import { createBrowserRouter} from "react-router-dom";
import Start from "./pages/Start.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Catalogue from "./pages/Catalogue.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Start />,
        errorElement: <div>404</div>
    },
    {
        path: "/signin",
        element: <Signin />,
        errorElement: <div>404</div>
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <div>404</div>
    },
    {
        path: "/catalogue",
        element: <Catalogue />,
        errorElement: <div>404</div>
    }
]);

export default router;
