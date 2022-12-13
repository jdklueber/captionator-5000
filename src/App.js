import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/frame/Header";
import Footer from "./components/frame/Footer";
import ContentArea from "./components/frame/ContentArea";
import constants, {pages} from "./constants";

import PictureListPage from "./pages/PictureListPage";
import IndividualPicture from "./pages/IndividualPicture";
import Profile from "./pages/Profile";
import UploadPicture from "./pages/UploadPicture";
import Oauth from "./components/oauth/Oauth";
function App() {
  return (
    <>
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


    </>
  );
}

export default App;
