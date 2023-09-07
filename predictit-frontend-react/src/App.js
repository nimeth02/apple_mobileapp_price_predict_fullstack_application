import logo from "./logo.svg";
import "./App.css";
import Signin from "./pages/signin";
import Selectitem from "./pages/selectitem";
import Predictitform from "./pages/predictform";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [authed, setauthed] = useState(false);
  const [brand, setbrand] = useState("");
  // console.log(authed, brand);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              authed ? null : <Signin authed={authed} setauthed={setauthed} />
            }
          >
            <Route
              path="select"
              element={<Selectitem brand={brand} setbrand={setbrand} />}
            />
            <Route path="predictit" element={<Predictitform />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
