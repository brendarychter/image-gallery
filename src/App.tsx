import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Home, Gallery, UserGallery } from '@/pages';
import Layout from '@/layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/user-gallery" element={<UserGallery />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
