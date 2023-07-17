import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import {
  Admin,
  Client,
  Operation,
  Analytics,
  About,
  Clients,
} from "./features";
import Layout from "./components/Layout";
import Graph from "./components/Graph";
import "./index.css";
const isAdmin = true;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Layout}>
      <Route index Component={isAdmin ? Admin : Client} />
      <Route path="about" Component={About} />
      <Route path="analytics" Component={Analytics} />
      <Route path="clients" Component={Clients} />
      <Route path="operation" Component={Operation} />
    </Route>
  )
);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
