import { createRouter, createWebHashHistory } from 'vue-router';
import {
  Layout, Login, Register, AccountView,
} from '@/views/account';
import AboutView from '@/views/AboutView.vue';
import HomeView from '../views/HomeView.vue';
import GenreView from '../views/movielist/GenreView.vue';
import MoviesView from '../views/movielist/MoviesView.vue';
import MovieView from '../views/information/MovieView.vue';
import ActorView from '../views/information/ActorView.vue';
import SearchView from '../views/movielist/SearchView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/genre/:id',
    name: 'genre',
    component: GenreView,
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: MovieView,
  },
  {
    path: '/actor/:id',
    name: 'actor',
    component: ActorView,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    props: (route) => ({ query: route.query.query }),
  },
  {
    path: '/account',
    component: Layout,
    children: [
      { path: '', redirect: 'login' },
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register },
      { path: '/accountView', name: 'accountView', component: AccountView },

    ],
  },
  {
    path: '/movies',
    name: 'movies',
    component: MoviesView,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
