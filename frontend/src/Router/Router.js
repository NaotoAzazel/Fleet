import AuthPage from "../Components/Pages/AuthPage";
import TransportList from "../Components/Pages/TransportList";
import MainPage from "../Components/Pages/MainPage";

export const routes = [
  { path: "/", element: MainPage, pageTitle: "Fleet Главная", exact: true },
  { path: "/auth", element: AuthPage, pageTitle: "Авторизация", exact: true },
  { path: "/transport", element: TransportList, pageTitle: "Список транспорта", exact: true }
];
