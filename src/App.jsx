import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.routes";
import Navigation from "./routes/navigation/navigation.routes";
import SignIn from "./routes/sign-in/sign-in.component";


const Shop = () => {
  return (
    <h1>shop test</h1>
  )
}

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
 