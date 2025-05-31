import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Layout } from "./shared/components/Layout";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { Dashboard } from "./features/dashboard/components/Dashboard";
import { CandidateForm } from "./features/candidates/components/CandidateForm";
import Login from "./features/auth/components/Login";
import Home from "./features/products/components/Home";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas con Layout */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    {/* Ruta principal - redirige al dashboard */}
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace />}
                    />

                    {/* Dashboard principal */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Rutas de candidatos */}
                    <Route path="/candidates">
                      <Route
                        index
                        element={<Navigate to="/dashboard" replace />}
                      />
                      <Route path="new" element={<CandidateForm />} />
                      <Route path="edit/:id" element={<CandidateForm />} />
                      <Route
                        path="view/:id"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">
                              Candidate Details
                            </h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                    </Route>

                    {/* Rutas de productos/posiciones */}
                    <Route path="/positions">
                      <Route index element={<Home />} />
                      <Route
                        path="new"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">New Position</h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                      <Route
                        path="edit/:id"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">
                              Edit Position
                            </h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                      <Route
                        path="view/:id"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">
                              Position Details
                            </h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                    </Route>

                    {/* Rutas de reportes y analytics */}
                    <Route path="/reports">
                      <Route
                        index
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">
                              Reports Dashboard
                            </h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                      <Route
                        path="candidates"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">
                              Candidate Reports
                            </h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                      <Route
                        path="positions"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">
                              Position Reports
                            </h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                      <Route
                        path="pipeline"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">
                              Pipeline Analytics
                            </h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                    </Route>

                    {/* Rutas de configuración */}
                    <Route path="/settings">
                      <Route
                        index
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">
                              General Settings
                            </h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                      <Route
                        path="profile"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">User Profile</h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                      <Route
                        path="team"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">
                              Team Management
                            </h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                      <Route
                        path="integrations"
                        element={
                          <div className="p-6">
                            <h2 className="text-2xl font-bold">Integrations</h2>
                            <p className="text-gray-600 mt-2">
                              Feature coming soon...
                            </p>
                          </div>
                        }
                      />
                    </Route>

                    {/* Ruta catch-all - redirige al dashboard */}
                    <Route
                      path="*"
                      element={<Navigate to="/dashboard" replace />}
                    />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
