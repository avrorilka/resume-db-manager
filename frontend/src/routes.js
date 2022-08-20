import PanelCompaniesPage from "./pages/company/admin/PanelCompaniesPage";
import PanelCompanyCreatePage from "./pages/company/admin/PanelCompanyCreatePage";
import PanelCompanyShowPage from "./pages/company/admin/PanelCompanyShowPage";
import PanelCompanyUpdatePage from "./pages/company/admin/PanelCompanyUpdatePage";
import PanelUsersPage from "./pages/user/admin/PanelUsersPage";
import PanelUserCreatePage from "./pages/user/admin/PanelUserCreatePage";
import PanelUserShowPage from "./pages/user/admin/PanelUserShowPage";
import PanelUserUpdatePage from "./pages/user/admin/PanelUserUpdatePage";
import PanelCvsPage from './pages/cv/admin/PanelCvsPage';
import PanelCvShowPage from './pages/cv/admin/PanelCvShowPage';
import UserLoginPage from "./pages/user/user/UserLoginPage";
import ResetPasswordPage from "./pages/user/user/ResetPasswordPage";
import ChangePassword from "./pages/user/user/ChangePasswordPage";
import HomePage from "./pages/home/HomePage";
import CompanyPage from "./pages/company/user/CompanyPage";
import CvUploadPage from "./pages/cv/user/CvUploadPage";
import RegistrationPage from "./pages/user/user/RegistrationPage";
import UserProfilePage from "./pages/user/user/UserProfilePage";
import UserEditProfilePage from "./pages/user/user/UserEditProfilePage";
import UserChangePasswordPage from "./pages/user/user/UserChangePasswordPage";
import CvShowPage from "./pages/cv/user/CvShowPage";
import CvUpdatePage from "./pages/cv/user/CvUpdatePage";
const routes = [
    {
        path: "/panel/companies",
        element: <PanelCompaniesPage/>,
        exact: false,
    },
    {
        path: "/panel/users",
        element: <PanelUsersPage/>,
        exact: false,
    },
    {
        path: "/panel/companies/create",
        element: <PanelCompanyCreatePage/>,
        exact: false,
    },
    {
        path: "/panel/users/create",
        element: <PanelUserCreatePage/>,
        exact: false,
    },
    {
        path: "/panel/companies/update/:id",
        element: <PanelCompanyUpdatePage/>,
        exact: false,
    },
    {
        path: "/panel/users/update/:id",
        element: <PanelUserUpdatePage/>,
        exact: false,
    },
    {
        path: "/panel/companies/:id",
        element: <PanelCompanyShowPage/>,
        exact: false,
    },
    {
        path: "/panel/users/:id",
        element: <PanelUserShowPage/>,
        exact: false,
    },
    {
        path: "/panel",
        element: <PanelCompaniesPage/>,
        exact: true,
    },

    {
        path: "/panel/cv",
        element: <PanelCvsPage/>,
        exact: false,
    },
    {
        path: "/panel/cv/:id",
        element: <PanelCvShowPage/>,
        exact: false,
    },
    {
        path: "/login",
        element: <UserLoginPage/>,
        exact: false,
    },
    {
        path: "/registration",
        element: <RegistrationPage/>,
        exact: false,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage/>,
        exact: false,
    },
    {
        path: "/reset-password/reset/:token",
        element: <ChangePassword/>,
        exact: false,
    },
    {
        path: "/",
        element: <HomePage/>,
        exact: false,
    },
    {
        path: "/companies/:id",
        element: <CompanyPage/>,
        exact: false,
    },
    {
        path: "/companies/:id/upload",
        element: <CvUploadPage/>,
        exact: false,
    },
    {
        path: "/profile",
        element: <UserProfilePage/>,
        exact: false,
    },
    {
        path: "/profile/update",
        element: <UserEditProfilePage/>,
        exact: false,
    },
    {
        path: "/profile/password-change",
        element: <UserChangePasswordPage/>,
        exact: false,
    },
    {
        path: "/cv/:id",
        element: <CvShowPage/>,
        exact: false,
    },
    {
        path: "/cv/update/:id",
        element: <CvUpdatePage/>,
        exact: false,
    },
    // reset-password
    // {
    //     path: "/logout",
    //     element: <UserLogoutPage/>,
    //     exact: false,
    // },
    // {
    //     path: "/auth/register",
    //     element: <RegistrationPage/>,
    //     exact: false,
    // },
    // {
    //     path: "/",
    //     element: <Home/>,
    //     exact: false,
    // }

];

export default routes;
