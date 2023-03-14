import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const App = ({ signOut, user }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout signOut={signOut} user={user} />}>
            <Route index path="/" element={<Home />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default withAuthenticator(App);
