import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/frame/Header";
import Footer from "./components/frame/Footer";
import ContentArea from "./components/frame/ContentArea";
import constants, {pages} from "./constants";
import {ToastContainer} from "react-toastify";

import PictureListPage from "./pages/PictureListPage";
import IndividualPicture from "./pages/IndividualPicture";
import Profile from "./pages/Profile";
import UploadPicture from "./pages/UploadPicture";
import Oauth from "./components/oauth/Oauth";
import AuthProvider from "./context/AuthContext";
function App() {
  return (
    <>
        <AuthProvider>
                <BrowserRouter>
                    <Header/>
                    <ContentArea>
                              <Routes>
                                  <Route path={pages.HOME} element={<PictureListPage/>}/>
                                  <Route path={pages.PICTURE + "/:id"} element={<IndividualPicture/>}/>
                                  <Route path={pages.PROFILE} element={<Profile/>}/>
                                  <Route path={pages.UPLOAD} element={<UploadPicture/>}/>
                                  <Route path={pages.SIGN_IN}
                                         element={<Oauth initial_mode={constants.oauth.SIGN_IN}/>}/>
                                  <Route path={pages.SIGN_UP}
                                         element={<Oauth initial_mode={constants.oauth.SIGN_UP}/>}/>
                                  <Route path={pages.FORGOT_PASSWORD}
                                         element={<Oauth initial_mode={constants.oauth.FORGOT_PASSWORD}/>}/>
                              </Routes>
                    </ContentArea>
                    <Footer/>
                </BrowserRouter>

                <ToastContainer //copied and pasted from the configure page
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
        </AuthProvider>
    </>
  );
}

export default App;
