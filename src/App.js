import './App.css';

//npm i bootstrap
//Bootstrap is a popular CSS framework that provides pre-defined styles and components for building responsive web pages.
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Navbar from './layout/Navbar';//react component
import Home from './pages/Home';     //react component
import AddUser from './users/AddUser';//react component
import EditUser from './users/EditUser';//react component
import ViewUser from './users/ViewUser';//react component



function App() {
  return (
    <div className="App">
    

      {/*The <Router> component is being used to wrap the entire application, indicating that we're using React Router for routing
      REACT ROUTER DOM kullaniliyorsa tum REACT COMPONENTLER BUNUN ICINE YAZILMALIDIR*/}
      <Router>
        
        <Navbar/>{/*path'i olmayan REACT COMPONENT her pathte rendered olur */}

        {/*HANGI URL'DE HANGI .JS SAYFASI OLACAK ONU BELIRLIYORUZ
        <Routes> component is being used to define the available routes within the application.*/}
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/adduser" element={<AddUser/>}/>
          <Route exact path="/edituser/:id" element={<EditUser/>}/>
          <Route exact path="/viewuser/:id" element={<ViewUser/>}/>
        </Routes>

      </Router>
    
    </div>
  );
}

export default App;
/*
Finally, the export default App statement exports the App function, 
making it available for use in other parts of the application.
*/
