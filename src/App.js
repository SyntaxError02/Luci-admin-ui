import { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "./store";
import classes from "./App.module.scss";
import PrivateRoute from "./utils/PrivateRoute";
import SideDrawer from "./components/SideDrawer/SideDrawer";

const Login = lazy(() => import("./pages/Login/Login"));
const Sidebar = lazy(() => import("./components/sidebar/Sidebar"));
const TopBar = lazy(() => import("./components/topbar/TopBar"));
const Individual = lazy(() => import("./pages/User/User"));

const App = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return (
    <Provider>
      <Router>
        <Suspense fallback="">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <>
              <TopBar onOpen={toggle} />
              <div className={classes.container}>
                <SideDrawer show={show} onClose={toggle} />
                <Sidebar />
                <div className={classes.container__main}>
                  <PrivateRoute
                    exact
                    path="/dashboard"
                    component={Individual}
                  />
                </div>
              </div>
            </>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
