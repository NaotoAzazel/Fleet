import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import Navbar from "./Components/UI/Navbar.jsx";
import { AuthProvider } from "./hooks/Auth.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Navbar />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
