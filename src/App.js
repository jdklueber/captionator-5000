import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/frame/Header";
import Footer from "./components/frame/Footer";
import ContentArea from "./components/frame/ContentArea";
import UploadPicture from "./pages/UploadPicture";
function App() {
  return (
    <>
        <Header/>
        <ContentArea>
              <BrowserRouter>
                  <Routes>
                      <Route path={"/"} element={<UploadPicture/>}/>
                  </Routes>
              </BrowserRouter>
        </ContentArea>
        <Footer/>
    </>
  );
}

export default App;
