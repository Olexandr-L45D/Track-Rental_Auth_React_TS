import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const TruckFeatures = lazy(() => import("../TruckFeatures/TruckFeatures"));
const TruckReviews = lazy(() => import("../TruckReviews/TruckReviews"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

const TruckPageFilters = lazy(() =>
  import("../../pages/TruckPageFilters/TruckPageFilters")
);

const TruckDetalsPage = lazy(() =>
  import("../../pages/TruckDetalsPage/TruckDetalsPage")
);
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

import { Layout } from "../Layout/Layout";

export default function App() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<TruckPageFilters />} />
          <Route path="/catalog/:id" element={<TruckDetalsPage />}>
            <Route path="features" element={<TruckFeatures />} />
            <Route path="reviews" element={<TruckReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
