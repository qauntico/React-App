//import logo from './logo.svg';
import RouterRootLayout from './user/RouterRootLayout';
import AdminRootLayout from './admin/AdminRouteLayout';
import EventRouteLayout from './admin/EventRouteLayout'
import Home from './core/Home'
import Signin from './user/Signin';
import Signup from './user/Signup';
//import Shop from './core/shop';
import { ShoppingCart } from './core/cart';
import ProductDetails from './core/product';
import EditSingleEvent from './admin/EditSingleEvent';
import CreateNewEvent from './admin/CreateNewEvent';
import PrivateRoute from './auth/PrivateRoute';
import AdminPrivateRoute from './auth/AdminPrivateRoute';
import Dashboard from './user/UserDashboard'
import Admin from './user/AdminDashboard';
import { ErrorPage } from './ErrorPage/ErrorPage';
import {loader as shopLoader} from './core/shop'
import {createBrowserRouter,RouterProvider } from 'react-router-dom';
import {loader as loadCategories} from './admin/EventForm';
//import {loader as productDetail} from './core/product';
import Orders from './admin/Order';
import CartProvider from './Contex/CartProvider';
import { lazy,Suspense } from 'react';

const Shop = lazy(() => import('./core/shop'));//using lazy loading on the shop page

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
      element: <Suspense fallback={<p>Loading.....</p>}><Shop /></Suspense>,
      loader: () => import('./admin/EventForm').then(module => module.loader())},
      {path: '/event/:productId',
      loader: (meta) => import('./core/product').then(module => module.loader(meta)),//added lazy loading here 
      id: 'singleEvent',
      element: <EventRouteLayout />,
      children: [
        {index: true,
        element: <ProductDetails /> },
        {path: 'edit/event',
        element: <EditSingleEvent />}
      ]},
      {path: '/cart',
      element: <ShoppingCart />},
      {path: '/signin',
      element: <Signin />},
      {path: '/signup',
      element: <Signup />},
      {path: '/user/dashboard',
      element: <PrivateRoute element={Dashboard} />},
      {path: '/admin/dashboard',
      element: <AdminRootLayout />,
      loader: loadCategories,
      id: 'category',
      children: [
          {index: true,
          element: <AdminPrivateRoute element={Admin} />},
          {path: 'create/event', 
          element: <CreateNewEvent/>},
          {path: 'orders',
          element: <Orders />}
      ]},
      

    ]
  }])
  return <>
    <CartProvider>
        <RouterProvider router={router} />
    </CartProvider>
  </>
}

export default App;
