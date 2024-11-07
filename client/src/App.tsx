import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./DefaultLayout.js";
import DashboardLayout from "./DashboardLayout.js";
import Home from "./pages/default/Home/index";
import { styled } from "styled-components";
import { Theme } from "./types/default/types.js";
import About from "./pages/default/About/index.js";
import MyConference from "./pages/dashboard/Author/Dashboard/index.js";
import AllConferences from "./pages/dashboard/Author/AllConferences/index.js";
import RegisterForm from "./pages/Form/registration/index.js";
import LoginForm from "./pages/Form/login/index.js";
import { ProjectsProvider } from "./context/ProjectsContext.js";
import ReviewerResponse from "./pages/dashboard/Author/Results/index.js";
import SubmittedConferences from "./pages/dashboard/Reviewer/SubmittedConferences/index.js";
import { GlobalStyle } from "./styles/globalStyle.js";
import useAuthentication from "./hooks/useAuthentication.js";
import { useTheme } from "./context/ThemeContext.js";
import { useEffect } from "react";
import AuthorNavbar from "./components/dashboard/Author/Navbar/index.js";
import AuthorSidebar from "./components/dashboard/Author/Sidebar/index.js";
import AdminSidebar from "./components/dashboard/Admin/Sidebar/index.js";
import CreateConference from "./pages/dashboard/Admin/CreateConference/index.js";
import ConfirmReview from "./pages/dashboard/Admin/ConfirmReview/index.js";
import Papers from "./pages/dashboard/Admin/Papers/index.js";
import { Toaster } from "react-hot-toast";
import MaterialUI from "./types/components/dashboard/mutual/MaterialUI.js";
import ReviewerNavbar from "./components/dashboard/Reviewer/Navbar/index";
import ReviewerSidebar from "./components/dashboard/Reviewer/Sidebar/index";
import AdminNavbar from "./components/dashboard/Admin/Navbar/index";
import Layout from "./components/newDashboard/Author/Layout.js";
import Profile from "./pages/dashboard/Author/Profile/index.js";
import MyConferencesPage from "./pages/dashboard/Author/MyConferences/index.js";
import ReviewerLayout from "./components/newDashboard/Reviewer/Layout.js";
import ReviewerDashboard from "./pages/dashboard/Reviewer/Dashboard/index";
import AdminLayout from "./components/newDashboard/Admin/Layout.js";
import AdminDashboard from "./pages/dashboard/Admin/Dashboard/index";
import NoPageAvailable from "./pages/NoPageAvailable/NoPageAvailable.js";
import "./style.css";
import ApprovaAbstract from "./pages/dashboard/Admin/ApprovaAbstract/index";
import PaperAssessmentForm from "./pages/dashboard/Reviewer/PaperAssesment/index";

const StyledMain = styled.main<{ theme: Theme }>`
  /* ${({ theme }) => theme.heights.footerHeight}; */
  height: ${({ theme }) => (theme.isUserLoggedIn ? "100vh" : "auto")};
  width: 100%;
  background-color: ${({ theme }) =>
    theme.isUserLoggedIn ? theme.dashboards.author.colors.primaryBG : ""};
  position: ${({ theme }) => (theme.isUserLoggedIn ? "relative" : "static")};
  display: flex;
`;

function App() {
  const { theme, updateTheme } = useTheme();
  const authUser = useAuthentication();

  // auth.signOut();

  const handleModeChange = () => {
    updateTheme((prevTheme) => ({
      ...prevTheme,
      isUserLoggedIn: authUser === null ? false : true,
    }));
  };
  useEffect(() => {
    handleModeChange();
  }, [authUser]);
  return (
    <div className="App">
      <ProjectsProvider>
        <GlobalStyle theme={theme} />
        <StyledMain>
          <Routes>
            <Route path="*" element={<NoPageAvailable />} />
            <Route path="/signin" element={<LoginForm />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/">
              <Route element={<DefaultLayout />} id="defaultRoute">
                <Route index element={<Home />} />
                <Route path="/about" element={<Home />} />
                <Route path="/contact" element={<Home />} />
                <Route path="/how-it-works" element={<Home />} />
              </Route>
            </Route>
            {authUser ? (
              <>
                {/* AUTHOR DASHBOARD */}
                <>
                  <Route
                    path="/author-dashboard"
                    element={<Layout></Layout>}
                    id="dashboardRoute"
                  >
                    <Route
                      path="/author-dashboard"
                      index
                      element={<MyConference />}
                    />
                    <Route
                      path="/author-dashboard/all-conferences"
                      element={<AllConferences />}
                    />
                    <Route
                      path="/author-dashboard/reviewer-response"
                      element={<ReviewerResponse />}
                    />

                    <Route
                      path="/author-dashboard/my-conferences"
                      element={<MyConferencesPage />}
                    />
                  </Route>
                </>
                {/* REVIEWER DASHBOARD */}
                <>
                  <Route
                    path="/reviewer-dashboard"
                    element={<ReviewerLayout></ReviewerLayout>}
                  >
                    <Route
                      path="/reviewer-dashboard"
                      index
                      element={<ReviewerDashboard />}
                    />
                    <Route
                      path="/reviewer-dashboard/assess-papers"
                      index
                      element={<SubmittedConferences />}
                    />

                    <Route
                      path="/reviewer-dashboard/assess-papers/:id"
                      index
                      element={<PaperAssessmentForm />}
                    />
                    {/* <Route
                      path="/reviewer-dashboard/all-conferences"
                      element={<AllConferences />}
                    /> */}
                  </Route>
                </>
                {/* ADMIN DASHBOARD */}
                <>
                  <Route
                    path="/admin-dashboard"
                    element={<AdminLayout></AdminLayout>}
                  >
                    <Route
                      path="/admin-dashboard/"
                      index
                      element={<AdminDashboard />}
                    />
                    <Route
                      path="/admin-dashboard/create-conference"
                      index
                      element={<CreateConference />}
                    />
                    <Route
                      path="/admin-dashboard/abstracts"
                      element={<ApprovaAbstract />}
                    />
                    <Route
                      path="/admin-dashboard/papers"
                      element={<Papers />}
                    />
                    <Route
                      path="/admin-dashboard/confirm-review"
                      element={<ConfirmReview />}
                    />
                    <Route
                      path="/admin-dashboard/all-conferences"
                      element={<AllConferences />}
                    />
                  </Route>
                </>
              </>
            ) : (
              <></>
            )}
          </Routes>
          <Toaster />
          <MaterialUI />
        </StyledMain>
      </ProjectsProvider>
    </div>
  );
}

export default App;
