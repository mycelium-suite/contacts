import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { App } from "../App";
import ContactList from "../features/contact/ContactList";
import { Auth } from "../features/auth/Auth";
import AddContact from "../features/contact/AddContact";

export const routes = {
  ADD_CONTACT: "/new"
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route path="/" element={<ContactList />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/new" element={<AddContact />} />
      </Route>
    </>
  )
);