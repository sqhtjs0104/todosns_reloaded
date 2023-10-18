import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import reset from "styled-reset"
import { createGlobalStyle, styled } from "styled-components"

import auth from "./firebase"

import LoadingScreen from "./components/loading-screen"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/Profile"
import SignIn from "./routes/sign-In"
import SignUp from "./routes/sign-up"
import UserOnlyRoute from "./routes/user-only-route"

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <UserOnlyRoute>
        <Layout />
      </UserOnlyRoute>
    </>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  },
  {
    path: "/signIn",
    element: <SignIn />
  },
  {
    path: "/signUp",
    element: <SignUp />
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App