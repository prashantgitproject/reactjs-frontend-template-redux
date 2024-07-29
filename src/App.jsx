import { Suspense, lazy, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {ProtectRoute, AdminRoute} from "./components/auth/ProtectRoute"
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/shared/Loader";
import axios from "axios";
import { server } from "./constants/config";
import { userExists, userNotExists } from "./redux/reducers/auth";
// import { AdminFalse, AdminTrue } from "./redux/reducers/admin";
// import { getAdmin } from "./components/layout/AdminLayout";

// const Contact = lazy(() => import('./pages/Contact'));
// const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/profile/Profile'));
// const Subscribe = lazy(() => import('./pages/payment/Subscribe'));
const Authenticate = lazy(() => import('./pages/auth/Authenticate'));
const ForgetPassword = lazy(() => import('./pages/auth/ForgetPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
// const PaymentSuccess = lazy(() => import('./pages/payment/PaymentSuccess'));
// const PaymentFail = lazy(() => import('./pages/payment/PaymentFail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
// const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
// const Users = lazy(() => import('./pages/admin/Users'));
// const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Verify = lazy(() => import('./pages/auth/Verify'));


export const getUser = async () => {
  try {
    console.log(server)
    const { data } = await axios.get(`${server}/api/v1/user/me`, { withCredentials: true });
    return data.user;
  } catch (error) {
    console.log(error);
  }
}

const App = () => {

  const {user, loader} = useSelector((state) => state.auth)
  // const {isAdmin} = useSelector((state) => state.admin)

  const dispatch = useDispatch();


  useEffect(() => {

    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        dispatch(userExists(user));
      } else {
        dispatch(userNotExists());
      }
    }

    // const fetchAdmin = async () => {
    //   const admin = await getAdmin();
    //   if (admin) {
    //     dispatch(AdminTrue());
    //   } else {
    //     dispatch(AdminFalse());
    //   }
    // }

    fetchUser();
    // fetchAdmin();
    
  }, [dispatch])

  return loader? (<Loader/>) : (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route element={<ProtectRoute user={user}/>}>
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/subscribe" element={<Subscribe user={user}/>} /> */}
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectRoute user={!user} redirect="/"/>}>
            <Route path="/authenticate" element={<Authenticate />} />
          </Route>

          <Route path="/" element={<Home />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          {/* <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/paymentfail" element={<PaymentFail />} /> */}
          <Route path="/verify" element={<Verify />} />

          
          {/* <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminRoute isAdmin={isAdmin}/>}>
            <Route path="/admin/dashboard" element={<Dashboard/>} />
            <Route path="/admin/users" element={<Users />} />
          </Route> */}

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>  
      <Toaster />
    </BrowserRouter>
  )
}

export default App