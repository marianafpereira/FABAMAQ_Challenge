import HomePage from "./pages/HomePage.jsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import NewUserPage from "./pages/NewUserPage.jsx";
import ErrorPage from "./pages/Status/ErrorPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import UserPostsCommentsPage from "./pages/UserPostsCommentsPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
            <Route path="new-user" element={<NewUserPage />} />
            <Route path="user/:userId" element={<UserPage />} />
            <Route path="user/:userId/posts-comments" element={<UserPostsCommentsPage />} />
            <Route path="*" element={<ErrorPage />} />
        </>
    )
);

const App = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;
