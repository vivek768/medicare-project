import './App.css';
import Navbar from './components/main/Navbar';
import Home from './components/main/Homepage';
import Viewer from './components/main/PDFViewer';
import Uploads from './components/main/Uploads';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Dashboard from './components/main/Dashboard';
//import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /></>,
    },
    {
      path: "/reports",
      element: <><Navbar /><Uploads /></>,
    },
    {
      path: "/upload",
      element: <><Navbar /><Viewer /></>,
    },
    {
      path: "/dashboard",
      element: <><Navbar /><Dashboard /></>,
    }
  ]);

  return (
    <>
      {/* <h1>Hello Clerk!</h1>
      <SignedIn>
        <UserButton afterSignOutUrl={window.location.href} />
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal' />
      </SignedOut> */}

      <RouterProvider router={router} />

    </>
  );
}

export default App;
