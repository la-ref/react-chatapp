import {BrowserRouter,Routes,Route} from "react-router-dom"
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login"
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Chat/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
