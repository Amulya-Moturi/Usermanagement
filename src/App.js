import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import AddUser from './components/adduser/AddUser'
import Users from './components/users/Users'
import RemovedUser from './components/removeduser/RemovedUser'
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"/",
          element:<AddUser/>
        },
        {
          path:"/users",
          element:<Users/>
        },
        {
          path:"/removedusers",
          element:<RemovedUser/>
        }
      ]
    }
  ]
  )
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
