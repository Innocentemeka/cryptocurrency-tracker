import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/coins/:id" Component={Coinpage} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
