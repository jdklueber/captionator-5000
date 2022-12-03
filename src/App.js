import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/frame/Header";
import Footer from "./components/frame/Footer";
import ContentArea from "./components/frame/ContentArea";
function App() {
  return (
    <>
        <Header/>
        <ContentArea>
              <BrowserRouter>
                  <Routes>
                      <Route path={"/"} element={<Home/>}/>
                  </Routes>
              </BrowserRouter>
        </ContentArea>
        <Footer/>
    </>
  );
}

export default App;
