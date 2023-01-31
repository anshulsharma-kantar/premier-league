import logo from "./logo.svg";
import "./App.css";

import { GoogleLogin } from "@react-oauth/google";

function App() {
  return (
    <div>
      <h1>hello</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default App;
