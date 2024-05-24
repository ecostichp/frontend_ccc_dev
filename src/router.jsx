import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import storeLoader from "./loaders/storeLoader";
import AboutUs from "./routes/about-us";
import Contact from "./routes/contact";
import Gallery from "./routes/gallery";
import Home from "./routes/home";
import Locations from "./routes/locations";
import StoreInfo from "./routes/locations/store-info";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/sucursales",
                    element: <Locations />,
                },
                {
                    path: "/contacto",
                    element: <Contact />,
                },
                {
                    path: "/galería",
                    element: <Gallery />,
                },
                {
                    path: "/sobre-nosotros",
                    element: <AboutUs />,
                },
                {
                    path: "/sucursal/:storeId",
                    element: <StoreInfo />,
                    loader: storeLoader,
                }
            ],
        },
    ]
)

export default router;