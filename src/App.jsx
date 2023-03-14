import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Layout from "./components/Layout";
import Home from "./pages/Home";
import UpdateProduct from "./pages/UpdateProduct";
import CreateProduct from "./pages/CreateProduct";

import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const App = ({ signOut, user }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout signOut={signOut} />}>
          <Route index path="/" element={<Home />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default withAuthenticator(App);
