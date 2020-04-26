import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import SayThanks from '../views/SayThanks.vue'
import ContributorList from "@/views/ContributorList.vue";
import FavoriteList from "@/views/FavoriteList.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/favorites',
        name: 'Favorites',
        component: FavoriteList
    },
    {
        path: '/thanks',
        name: 'Say Thanks',
        component: SayThanks
    },
    {
        path: '/contributors',
        name: 'Contributors',
        component: ContributorList
    },
    {
        path: '/:language?/:category?',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Medical Phrasebook | TranslateForSG',
            metaTags: [
                {
                    name: 'description',
                    content: 'Phrasebook for medical staff attending foreigners of Bengali and other origins. Contains common phrases, and pronunciation also. '
                }
            ]
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el: any) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map((tagDef: any) => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  }).forEach((tag: any) => document.head.appendChild(tag));

  next();
});

export default router
