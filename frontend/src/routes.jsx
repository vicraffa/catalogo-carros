import { createBrowserRouter} from "react-router-dom";
import Start from "./components/Start.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Catalogue from "./components/Catalogue.jsx";

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
