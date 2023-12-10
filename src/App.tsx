import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SessionProvider } from "@inrupt/solid-ui-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@inrupt/solid-ui-react";

export function App() {

  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    if (!session.info.isLoggedIn) {
      navigate("/login");
    }
  }, [session.info.isLoggedIn]);

  return (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  );
}