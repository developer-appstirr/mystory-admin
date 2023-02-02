import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Stories from "views/stories/stories.js";
import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";
import Users from "views/users/users.js";
import Icons from "views/examples/Icons.js";
import Journals from "views/journals/journals";
import FamilyMembers from "views/familyMembers/familyMembers";
import Notifications from "views/notifications/Notifications";
import AllMedia from "views/stories/allMedia";
import PrivacyPolicy from "views/privacy policy/privacyPolicy";
import Terms from "views/termsAndCondition/terms";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    isSideBarActive: true,
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-single-02 text-yellow",
    component: Users,
    layout: "/admin",
    isSideBarActive: true,
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  {
    path: "/stories",
    name: "Stories",
    icon: "ni ni-folder-17 text-blue",
    component: Stories,
    layout: "/admin",
    isSideBarActive: true,
  },
  {
    path: "/journals",
    name: "Journals",
    icon: "ni ni-archive-2 text-yellow",
    component: Journals,
    layout: "/admin",
    isSideBarActive: true,
  },
  {
    path: "/familyMembers",
    name: "Family Members",
    icon: "ni ni-vector text-blue",
    component: FamilyMembers,
    layout: "/admin",
    isSideBarActive: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ni ni-planet text-yellow",
    component: Notifications,
    layout: "/admin",
    isSideBarActive: true,
  },
  {
    path: "/PrivacyPolicy",
    name: "Privacy Policy",
    icon: "ni ni-circle-08 text-pink",
    component: PrivacyPolicy,
    layout: "/admin",
    isSideBarActive: true,
  },
  {
    path: "/Terms&Condition",
    name: "Terms and Condition",
    icon: "ni ni-circle-08 text-pink",
    component: Terms,
    layout: "/admin",
    isSideBarActive: true,
  },
  {
    path: "/allMedia",
    name: "AllMedia",
    icon: "ni ni-planet text-blue",
    component: AllMedia,
    layout: "/admin",
    isSideBarActive: false,
  },

  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
