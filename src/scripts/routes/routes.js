import Home from '../views/pages/home';
import AllResto from '../views/pages/all-resto';
import SearchResult from '../views/pages/search-result';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': Home,
  '/restaurants': AllResto,
  '/search': SearchResult,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
