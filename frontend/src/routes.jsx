import { createBrowserRouter} from "react-router-dom";
import Iniciar from "./components/Iniciar.jsx";
import Signin from "./components/Signin.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Iniciar />,
        errorElement: <div>404</div>
    },
    {
        path: "/signin",
        element: <Signin />,
        errorElement: <div>404</div>
    }
]);

export default router;