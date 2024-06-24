import { Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';

import RenderRouter from './render-router';

const Routes = () => {
  return (
    <Suspense fallback={<div className="w-full h-screen flex justify-center items-center">
      <span className="text-center">Loading...</span>
    </div>}>
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;