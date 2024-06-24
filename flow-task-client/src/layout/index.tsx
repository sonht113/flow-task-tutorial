import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import fallbackRender from "./error-boundary/fallback-render";

const LayoutComponent = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full lg:w-3/4 px-4 py-20 mx-auto flex flex-col pt-36">
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Suspense
            fallback={
              <div className="w-full h-screen flex justify-center items-center">
                <span className="text-center">Loading...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default LayoutComponent;
