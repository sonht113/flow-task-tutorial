import { lazy } from "react";

const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));
const SignUp = lazy(() => import('@/pages/sign-up'));

export { Home, Login, SignUp }
