import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagerDashboard from "./pages/ManagerDashboard";
import AddNotice from "./pages/AddNotice";
import ShowApplicant from "./pages/ShowApplicant";

import ExtrasHome from "@pages/ExtrasHome";
import ExtraCastingBoard from "@pages/ExtraCastingBoard";
import DateSelectedNoticeList from "@pages/DateSelectedNoticeList";
// import Scheduler from "@pages/Scheduler";
import CompanyHome from "@pages/CompanyHome";
import ExtraShootManagePage from "@pages/ExtraShootManagePage";
import CompanyShootManagePage from "@pages/CompanyShootManagePage";
import { ApplicantDetail } from "@pages/ApplicantDetail";
import DetailPage from "@pages/DetailPage";
import NotFound from "@pages/Error/NotFound";
import DateSelectedNoticeListForCom from "@pages/DateSelectedNoticeListForCom";
import SchedulerPage from "@pages/Scheduler";

import ThemePreviewPage from "@pages/ThemePreview";
import LoginPage from "@pages/Sign/LoginPage";
// import MainPage from "@pages/Sign/MainPage";
import MainFormPage from "@pages/Sign/MainFormPage";
import AuthenticationPage from "@pages/Sign/AuthenticationPage";
import SelectUserTypePage from "@pages/Sign/SelectUserTypePage";
import MemberInfoFormPage from "@pages/Sign/MemberInfoFormPage";
import AccountFormPage from "@pages/Sign/AccountFormPage";
import TattooFormPage from "@pages/Sign/TattooFormPage";
import TattooSelectFormPage from "@pages/Sign/TattooSelectFormPage";
import CompanyInfoFormPage from "@pages/Sign/CompanyInfoFormPage";
import CompanyShootManageDetailPage from "@pages/Manage/CompanyShootManageDetailPage";
import ActorListPage from "@pages/Manage/ActorListPage";
import ClothesConfirmStatusListPage from "@pages/Manage/ClothesConfirmStatusListPage";
import CameraPage from "@pages/Manage/CameraPage";
import MemberShootManageDetailPage from "@pages/Manage/MemberShootManageDetailPage";
import AttendancePage from "@pages/Manage/AttendancePage";
import ClockInPage from "@pages/Manage/ClockInPage";
import ClockOutPage from "@pages/Manage/ClockOutPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* sign process */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/main-form" element={<MainFormPage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="/user-type" element={<SelectUserTypePage />} />
          <Route path="/member-info-form" element={<MemberInfoFormPage />} />
          <Route path="/tattoo-form" element={<TattooFormPage />} />
          <Route
            path="/tattoo-select-form"
            element={<TattooSelectFormPage />}
          />
          <Route path="/company-info-form" element={<CompanyInfoFormPage />} />
          <Route path="/account-form" element={<AccountFormPage />} />

          {/* member */}
          {/* member home */}
          <Route path="/member/home" element={<ExtrasHome />} />
          <Route
            path="/member/home/extra-casting-board/:jobPostId"
            element={<ExtraCastingBoard />}
          />
          <Route
            path="/member/home/date-selected-notice-list"
            element={<DateSelectedNoticeList />}
          />
          {/* scheduler */}
          <Route path="/member/scheduler" element={<SchedulerPage />} />
          {/* member manage */}
          <Route path="/member/manage" element={<ExtraShootManagePage />} />
          <Route
            path="/member/manage/detail"
            element={<MemberShootManageDetailPage />}
          />

          {/* company */}
          {/* home */}
          <Route path="/company/home" element={<CompanyHome />} />
          <Route
            path="/company/home/date-selected-notice-list"
            element={<DateSelectedNoticeListForCom />}
          />
          {/* company manage */}
          <Route path="/company/manage" element={<CompanyShootManagePage />} />
          <Route
            path="/company/manage/detail"
            element={<CompanyShootManageDetailPage />}
          />
          <Route path="/company/manage/actor" element={<ActorListPage />} />
          <Route
            path="/company/manage/clothes-confirm"
            element={<ClothesConfirmStatusListPage />}
          />
          <Route path="/company/manage/camera" element={<CameraPage />} />
          <Route
            path="/company/manage/attendance"
            element={<AttendancePage />}
          />
          <Route path="/company/manage/clock-in" element={<ClockInPage />} />
          <Route path="/company/manage/clock-out" element={<ClockOutPage />} />
          {/* company notice */}
          <Route path="/company/notice" element={<ManagerDashboard />} />

          <Route path="/applicants" element={<ShowApplicant />} />
          <Route path="/applicants/detail" element={<ApplicantDetail />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route
            path="/detail/:jobPostId/applicants"
            element={<ShowApplicant />}
          />
          <Route path="/add-notice" element={<AddNotice />} />

          <Route path="/*" element={<NotFound />} />

          {/* for testing theme */}
          <Route path="/theme-preview" element={<ThemePreviewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
