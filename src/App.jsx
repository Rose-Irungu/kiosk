import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  publicRoutes, 
  adminRoutes,
  securityRoutes,
  tenantRoutes
} from "./routes/routeConfig";

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}

          {/* Admin Protected Routes */}
          {adminRoutes.map((route, index) => (
            <Route
              key={`admin-${index}`}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}

          {/* Security Protected Routes */}
          {securityRoutes.map((route, index) => (
            <Route
              key={`security-${index}`}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={['security']}>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}

          {/* Tenant Protected Routes */}
          {tenantRoutes.map((route, index) => (
            <Route
              key={`tenant-${index}`}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={['tenant']}>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}

          <Route
            path="/userprofile"
            element={
              <ProtectedRoute allowedRoles={['admin', 'security', 'tenant']}>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#4caf50',
            },
          },
          error: {
            style: {
              background: '#f44336',
            },
          },
        }}
      />
    </>
  );
};

export default App;