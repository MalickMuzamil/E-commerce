import './App.css';
import { RouterProvider } from "react-router-dom";
import routes from './Routes/CallingRoutes/CallingRoutes';

function App() {

  return (
   <RouterProvider router={routes }/>
  )
}

export default App;
