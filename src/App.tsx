import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Login, Gallery, UserGallery, Picture } from '@/pages';
import ProtectedRoutes from '@/ProtectedRoutes';

// TODO: create errorboundary component
function ErrorBoundary() {
  return <div>error</div>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/user-gallery" element={<UserGallery />} />
        <Route path="/image/id/:id" element={<Picture />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
