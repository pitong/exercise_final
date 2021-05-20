import React, {FC, Fragment} from "react";
import {Route} from "react-router-dom";
import {Page} from "../../models";
import RouteComponentFactory from "./route-component-factory";

const RouteWrapper:FC<{pages: Page[]}> = ({pages}) => {
    const buildAllRoutes = (routes: Page[]) => {
        return routes.map((route: Page, index: number) => {
          return (
            <Fragment key={index}>
              <Route
                exact
                path={`/${route.url}`}
                render={() => <RouteComponentFactory route={route}/>}
              />

              {route.children?.length && buildAllRoutes(route.children)}
            </Fragment>
          )
        });
      }

    return (
        <>
            <Route
              exact
              path="/"
              render={() => <div>Main page</div>}
            />

            {buildAllRoutes(pages)}
        </>
    )
}

export default RouteWrapper;
