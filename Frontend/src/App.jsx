import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/Home";
import News from "./component/News";
import PaymentMethod from "./component/PaymentMethod";
import Faq from "./component/Faq";
import Login from "./component/Login";
import ErrorPage from "./component/Error";
import Contact from "./component/Contact";
import SignUp from "./component/SignUp";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },

 



    {
      path: "/blog",
      element: <News />,
    },


    {
      path: "/payment-method",
      element: <PaymentMethod />,
    },
    {
      path: "/faq",
      element: <Faq />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/404",
      element: <ErrorPage />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />{" "}
    </>
  );
}

export default App;
