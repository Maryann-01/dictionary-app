import Home from "./Home/Home"
import { useState} from "react";

import './App.css'

function App() {
  const [themeIcon, setThemeIcon] = useState("light")
  return (
    
    <div className={`fullPg ${themeIcon==="light"?"lighttheme":"darktheme"}`}>
      <Home themeIcon={themeIcon} toggleTheme={() => setThemeIcon((prevTheme) => (prevTheme === "light" ? "dark" : "light"))} />
       
    </div>
  )
}

export default App
