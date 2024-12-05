import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import ConfirmOrderPage from "./Pages/ConfirmOrderPage/ConfirmOrderPage";
import SearchPage from "./Pages/SearchPage";
import ProductPage from "./Pages/ProductPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<HomePage></HomePage>}></Route>
          <Route path={'/confirm-order'} element={<ConfirmOrderPage></ConfirmOrderPage>}></Route>
          <Route path={`/search/:search`} element={<SearchPage></SearchPage>}></Route>
          <Route path={`/product/ID/:id`} element={<ProductPage></ProductPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
