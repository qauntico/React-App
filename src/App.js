//import logo from './logo.svg';
import RouterRootLayout from './user/RouterRootLayout';
import AdminRootLayout from './admin/AdminRouteLayout';
import Home from './core/Home'
import Signin from './user/Singin';
import Signup from './user/Signup';
import Shop from './core/shop';
import { ShoppingCart } from './core/cart';
import ProductDetails from './core/product';
import CreateCategory from './admin/AddCategory';
import CreateProduct from './admin/AddProduct';
import PrivateRoute from './auth/PrivateRoute';
import AdminPrivateRoute from './auth/AdminPrivateRoute';
import Dashboard from './user/UserDashboard'
import Admin from './user/AdminDashboard';
import { ErrorPage } from './ErrorPage/ErrorPage';
import {loader as shopLoader} from './core/shop'
import {createBrowserRouter,RouterProvider } from 'react-router-dom';
import {loader as loadCategories} from './admin/AddProduct';
import {loader as productDetail} from './core/product'


function App() {
  const router = createBrowserRouter([{
    path: '/', element: <RouterRootLayout />,
    id: 'token',
    loader: shopLoader,
    errorElement: <ErrorPage  />,
    children: [
      {index: true, 
      element: <Home />,
      loader: loadCategories},
      {path: '/shop',
      element: <Shop />,
      loader: loadCategories},
      {path: '/product/:productId',
      loader: productDetail,
      element: <ProductDetails />},
      {path: '/Cart',
      element: <ShoppingCart />},
      {path: '/signin',
      element: <Signin />},
      {path: '/signup',
      element: <Signup />},
      {path: '/user/dashboard',
      element: <PrivateRoute element={Dashboard} />},
      {path: '/admin/dashboard',
      element: <AdminRootLayout />,
      children: [
          {index: true,
           element: <AdminPrivateRoute element={Admin} />},
           {path: 'create/category', 
            element: <CreateCategory />},
            {path: 'create/product', 
            element: <CreateProduct />,
            loader: loadCategories}
      ]},
      

    ]
  }])
  return <>
    <RouterProvider router={router} />
  </>
}

export default App;
