import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import ConfirmOrderPage from "./Pages/ConfirmOrderPage/ConfirmOrderPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<HomePage></HomePage>}></Route>
          <Route path={'/confirm-order'} element={<ConfirmOrderPage></ConfirmOrderPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
