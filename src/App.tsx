import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import { Login, Gallery, Favorites, Detail } from '@/pages';
import ProtectedRoutes from '@/ProtectedRoutes';

// TODO: create errorboundary component
// function ErrorBoundary() {
//   return <div>error</div>;
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/gallery/image/:id" element={<Detail />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
