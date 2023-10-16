import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import "./Styles/globals.css"
import { useEffect, useState, useMemo, useCallback } from "react";
import { AuthContext } from "./Components/context/index.js";
import Navbar from "./Components/UI/Navbar.jsx";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lphkjfehwkufelsdxcjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaGtqZmVod2t1ZmVsc2R4Y2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0NDkxMTIsImV4cCI6MjAwNjAyNTExMn0.16oJ7M-_hJU2k92qEswCS0iNTrjU5iHypwq7DrhrOHw"
);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const handleUserData = useCallback(async() => {
    await supabase.auth.getUser().then(value => {
      if(value?.data.user) {
        setUser(value.data.user);
      }
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    handleUserData();
  }, [handleUserData]);

  const authContext = useMemo(() => {
    return { user, setUser, loading };
  }, [user, loading]);

  if(loading) return null;

  return (
    <AuthContext.Provider value={authContext}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
