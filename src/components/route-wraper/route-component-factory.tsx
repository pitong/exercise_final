import React, {FC} from "react";
import {Page} from "../../models";

const RouteComponentFactory:FC<{route: Page}> = ({route}) => {
    switch (route.url) {
        default:
            return <div>Selected route: {route.title}</div>
    }
}

export default RouteComponentFactory;
