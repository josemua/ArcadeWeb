import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//public
import { Home } from "../pages/public/Home";
import { NotFound } from "../pages/public/NotFound";
import ProjectList from "../pages/public/ProjectList";
//private
import UserList from "../pages/admin/UserList";

//layouts
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";

const Rutas = () => {
  return (
    <Router>
      <Switch>
        <Route path={["/usuarios"]}>
          <PrivateLayout>
            <Switch>
              <Route path="/usuarios">
                <UserList />
              </Route>
            </Switch>
          </PrivateLayout>
        </Route>
        <Route path={["/", "/proyectos"]}>
          <PublicLayout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/proyectos">
                <ProjectList />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </PublicLayout>
        </Route>
      </Switch>
    </Router>
  );
};

export default Rutas;
