import { cloneDeep } from 'lodash';
import { Link } from 'react-router-dom';

import { HOME_PATH } from './constant';
import { TypeNavs, TypeRoutes } from './type-nav';
import { Home } from '@/pages';
import { capitalizeFirstLetter } from '@/utils';
import PrivateRouter from '@/routes/private-router';

const navs: TypeNavs[] = [
  {
    key: HOME_PATH,
    label: 'home',
    element: <Home />,
  },
];

const getRoutes = (arr: TypeRoutes[], nav: TypeNavs, basePath = '') => {
  if (nav.children) {
    for (const n of nav.children) {
      getRoutes(arr, n, basePath + nav.key);
    }
  }
  if (!nav.element) return;

  arr.push({
    path: basePath + nav.key,
    element: nav.element && (
      <PrivateRouter>{nav.element}</PrivateRouter>
    ),
  });

  return arr;
};

const addLink = (nav: TypeNavs, path: string) => {
  return nav.children ? (
    capitalizeFirstLetter(nav.label as string)
  ) : (
    <Link to={path}>{capitalizeFirstLetter(nav.label as string)}</Link>
  );
};

const getShowNavigation = (
  nav: TypeNavs,
  basePath = '',
): TypeNavs | undefined => {
  if (!nav.label) return;
  if (nav.children) {
    const arr: TypeNavs[] = [];
    for (const n of nav.children) {
      const formatN = getShowNavigation(n, basePath + nav.key);
      if (formatN) arr.push(formatN);
    }

    nav.children = arr.length > 0 ? arr : undefined;
  }

  return {
    key: basePath + nav.key,
    label: addLink(nav, basePath + nav.key),
    children: nav.children,
    element: nav.element,
  };
};

const menuList: TypeNavs[] = [];
const routeList: TypeRoutes[] = [];
const navList: TypeNavs[] = navs.map((nav) => ({
  key: nav.key,
  label: nav.label,
}));

for (const nav of navs) {
  const nav1 = cloneDeep(nav);
  const n = getShowNavigation(nav1);
  n && menuList.push(n);

  const nav2 = cloneDeep(nav);
  getRoutes(routeList, nav2);
}

export { routeList, menuList, navList };