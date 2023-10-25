import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// We load the pages as we need them. We split the bundle in separate chunks.
// It's one of the most important features we can implement.
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          {/* When we navigate from one page to another there is time when the chunk has not been downloaded yet.
          Then is when we display the SpinnerFullPage when the chunk in being loaded.
          */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path={"/"} element={<Homepage />} />
              <Route path={"product"} element={<Product />} />
              <Route path={"pricing"} element={<Pricing />} />
              <Route path={"login"} element={<Login />} />
              <Route
                path={"app"}
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to={"cities"} />} />
                <Route path={"cities/:id"} element={<City />} />
                <Route path={"cities"} element={<CityList />} />
                <Route path={"countries"} element={<CountryList />} />
                <Route path={"form"} element={<Form />} />
              </Route>
              <Route path={"*"} element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
