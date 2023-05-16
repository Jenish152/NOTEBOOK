import "./App.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import NoteState from "./context/notes/NoteState.js";
import Navbar from "./component/Navbar.js";
import Home from "./component/Home.js";
import About from "./component/About.js";
import Alert from "./component/Alert.js";
import Login from "./component/Login.js";
import Signup from "./component/Signup.js";
function App() {
  const [alert, setAlert] = useState(null);
  const showalert = (type, message) => {
    setAlert({ type: type, message: message })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showalert={showalert} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showalert={showalert} />}></Route>
              <Route exact path="/signup" element={<Signup showalert={showalert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
/* <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
      <Routes>
      <Route exact path="/"  element={<News api={this.apikey} setprogress={this.setprogress} key="general" pagesize={15} category="general"/>}>    
      
      </Route>
      <Route exact path="/bussiness" element={<News api={this.apikey} setprogress={this.setprogress} key="bussiness" pagesize={15} category="bussiness"/>} >    
      
      </Route>
      <Route exact path="/entertainment" element={<News api={this.apikey} setprogress={this.setprogress} key="entertainment" pagesize={15} category="entertainment"/>} >    
      
      </Route>
      <Route exact path="/health" element={ <News api={this.apikey} setprogress={this.setprogress} key="health" pagesize={15} category="health"/>} >    
     
      </Route>
      <Route exact path="/science" element={<News api={this.apikey} setprogress={this.setprogress} key="science" pagesize={15} category="science"/>} >    
      
      </Route>
      <Route exact path="/sports" element={<News api={this.apikey} setprogress={this.setprogress} key="sports" pagesize={15} category="sports"/>} >    

      </Route>
      <Route exact path="/technology" element={<News api={this.apikey} setprogress={this.setprogress} key="technology" pagesize={15} category="technology"/>}>    
      
      </Route>
      </Routes>
      </Router>
     */
