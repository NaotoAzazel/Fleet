import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../Router/PrivateRoute.jsx";
import AuthRoute from "../Router/AuthRoute.jsx";
import MainPage from "./Pages/MainPage.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import AuthPage from "./Pages/AuthPage.jsx";
import TransportList from "./Pages/TransportList.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/transport" element={<TransportList />} />
      </Route>
      <Route path="/" element={<MainPage />} />
      <Route element={<AuthRoute />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRouter