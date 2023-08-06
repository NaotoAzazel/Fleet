import { BrowserRouter, Route } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import "./Styles/globals.css"
import { useEffect, useState } from "react";
import { AuthContext } from "./Components/context/index.js";
import Header from "./Components/UI/Header.jsx";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lphkjfehwkufelsdxcjc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaGtqZmVod2t1ZmVsc2R4Y2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0NDkxMTIsImV4cCI6MjAwNjAyNTExMn0.16oJ7M-_hJU2k92qEswCS0iNTrjU5iHypwq7DrhrOHw"
);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if(value?.data.user) {
          setUser(value.data.user);
        }
      });

      setLoading(false);
    }

    getUserData();
  }, []);

  if(loading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
