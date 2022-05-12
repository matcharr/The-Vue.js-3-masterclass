import HomePage from '@/pages/HomePage.vue';
import ThreadShow from '@/pages/ThreadShow.vue';
import NotFound from '@/pages/NotFound.vue';
import Forum from '@/pages/Forum.vue';
import Category from '@/pages/CategoryPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import sourceData from '@/data.json';
import Profile from '@/pages/ProfilePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: {
      toTop: true,
      smoothScroll: true,
    },
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true },
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true,
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true,
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      // check if thread exists
      const threadExists = sourceData.threads.find((thread) => thread.id === to.params.id);
      // if exists continue
      if (threadExists) {
        return next();
      }
      next({
        name: 'NotFound',
        params: {
          pathMatch: to.path.substring(1)
            .split('/'),
        },
        query: to.query,
        hash: to.hash,
      });
      // if it doesn't exist redirect to not found
      return false;
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];
export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = 'smooth';
    return {
      top: 0,
      behavior: 'scroll',
    };
  },
});
