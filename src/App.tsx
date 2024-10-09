import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Homepage } from "./layout/HomePage/Home";
import { SignIn } from "./layout/SignInPage/SignIn";
import { DashBoard } from "./layout/DashBoardPage/DashBoard";
import { DeviceManage } from "./layout/DevicePage/DeviceManager";
import { UserInfo } from "./layout/UserInfoPage/UserInfo";
import PrivateRoute from "./components/PrivateRoute";
import { auth } from "./config/firebase";
import { UserHistory } from "./layout/UserHistoryPage/UserHistory";
import { NumberManage } from "./layout/NumberManagePage/NumberMagage";
import { Report } from "./layout/ReportPage/Report";
import { RoleList } from "./layout/RolePage/RoleList";
import { RoleCU } from "./layout/RolePage/RoleCU";
import { UserList } from "./layout/UserManagePage/UserList";
import { UserCU } from "./layout/UserManagePage/UserCU";
import { ForgotPW } from "./layout/ForgotPWPage/ForgotPW";
import { ResetPassword } from "./layout/ForgotPWPage/ResetPW";
import { ServiceList } from "./layout/ServicePage/ServiceList";
import { ServiceCU } from "./layout/ServicePage/ServiceCU";
import { ServiceDetail } from "./layout/ServicePage/ServiceDetail";

function App() {
  console.log(auth?.currentUser?.email);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            }
          >
            {/* Thông tin tài khoản */}
            <Route path="user-info" element={<UserInfo />} />

            {/* Dashboard */}
            <Route path="dashboard" element={<DashBoard />} />
            <Route index element={<Navigate to="dashboard" />} />

            {/* Thiết bị */}
            <Route path="device" element={<DeviceManage />} />

            {/* Dịch vụ */}
            <Route path="service" element={<ServiceList />} />
            <Route path="/home/service/add" element={<ServiceCU />} />
            <Route
              path="/home/service/detail/:id"
              element={<ServiceDetail />}
            />
            <Route path="/home/service/update/:id" element={<ServiceCU />} />

            {/* Cấp số */}
            <Route path="number" element={<NumberManage />} />

            {/* Báo cáo */}
            <Route path="report" element={<Report />} />

            {/* Vai trò */}
            <Route path="role" element={<RoleList />} />
            <Route path="/home/role/add" element={<RoleCU />} />
            <Route path="/home/role/:id" element={<RoleCU />} />

            {/* Tài khoản */}
            <Route path="user-manage" element={<UserList />} />
            <Route path="/home/user-manage/add" element={<UserCU />} />
            <Route path="/home/user-manage/:id" element={<UserCU />} />

            {/* Lịch sử người dùng */}
            <Route path="user-history" element={<UserHistory />} />
          </Route>

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot" element={<ForgotPW />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
