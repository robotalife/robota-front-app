import {adminRoot} from "./config";
import {UserRole} from "../utils/auth.roles";

const data = [{
    id: "piaf",
    icon: "iconsminds-shop",
    label: "menu.dashboard",
    to: `${adminRoot}/piaf`
},
    {
        id: "second-menu",
        icon: "iconsminds-chemical",
        label: "menu.smartTrade",
        to: `${adminRoot}/second-menu`
    },
    {
        id: "pages",
        icon: "iconsminds-digital-drawing",
        label: "menu.myPortfolio",
        to: "/user/login"
    },
    {
        id: "market",
        icon: "iconsminds-digital-drawing",
        label: "menu.market",
        to: "/user/login"
    },
    {
        id: "single",
        icon: "iconsminds-three-arrow-fork",
        label: "menu.settings",
        to: `${adminRoot}/single`,
    }
];
export default data;
