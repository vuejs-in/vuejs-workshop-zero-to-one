# Lesson 6

> Some packages have been updated in this exercise to their latest stable build. Run `yarn` if you are checking out this branch. Use the latest Node.js LTS version.

Client-side routing is an essential part of SPAs. Essentially, we tap into browser's History API to programatically control navigation. While we could definitely do this ourselves, we'd be much better off relying on a convenient wrapper on top of this that contains all the necessary features. Luckily, the Vue.js community has an official solution for this: `vue-router`.

Let's install this package by running—but let's try something different:

```sh
vue ui
```

You should see an awesome UI dashboard popup on your screen right now. This gives you a completely different way of managing your project. There are plenty of features for you to explore here but we will go to the Plugins section > Add vue-router on the top bar. This will install the router in your application. You could've also done `vue add router` to get the same thing.

This would've created a folder called `views/` and added two `.vue` files. It probably would've broken the app as well. So, let's see what's up. Let's start with `router/index.js`:

```js
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/new',
    name: 'new',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
];

const router = new VueRouter({
  routes
});

export default router;
```

> `@/` matches the `src` directory and is a better way to import components when relative paths get too long and unreadable. Use them wisely.

This is basically the initialization code for the router. The `routes` variable is an array of paths that the router is aware of. You can add multiple paths in here, even nest them for sub-views. When someone visits a path, the component specified under `component` is loaded. That's the gist of it.

But let's make a change so that `vue-router` uses the History API and not the hash-based routing that it uses by default:

```diff
const router = new VueRouter({
+  mode: 'history',
   routes
});
```

`src/views` is just a good way of organizing your pages/views or whatever the routes load. This is a good way to separate your normal components from your pages. Let's refactor `App.vue`:

```vue
<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  name: 'app',

  components: {
    NavBar
  }
};
</script>

<style scoped>
@import 'assets/normalize.css';
@import 'assets/styles.css';
</style>
```

`<router-view>` is a special component added by `vue-router`. It indicates the area where the component pointed to by the current route will be loaded into.

Let's also change `Home.vue`:

```vue
<template>
  <NewsList v-bind:items="items" />
</template>

<script>
import NewsList from '@/components/NewsList.vue';

export default {
  name: 'Home',
  components: {
    NewsList
  },
  data() {
    return {
      items: [
        {
          title: 'Thank HN: You helped me get a new job',
          author: 'atum47',
          upvotes: 941,
          timestamp: '2019-08-09T05:18:28.802Z',
          commentCount: 357
        },
        {
          title:
            'Patch Critical Cryptographic Vulnerability in Microsoft Windows [pdf] (media.defense.gov)',
          author: 'Moral_',
          upvotes: 610,
          timestamp: '2019-07-05T01:40:47.265Z',
          commentCount: 344
        },
        {
          title:
            'DevDegree: Work at Shopify and get a free CS degree in parallel (devdegree.ca)',
          author: 'PandawanFr',
          upvotes: 190,
          timestamp: '2019-08-01T19:59:59.050Z',
          commentCount: 9
        },
        {
          title: 'Hipmunk Says Goodbye (hipmunk.com)',
          author: 'ienjoythebeach',
          upvotes: 516,
          timestamp: '2019-09-20T21:49:18.323Z',
          commentCount: 112
        },
        {
          title:
            'Apple can be sued by app developers “on a monopsony theory.” (npr.org)',
          author: 'moorage',
          upvotes: 36,
          timestamp: '2019-09-20T12:20:19.440Z',
          commentCount: 315
        },
        {
          title: 'Bug #915: Solved (nedbatchelder.com)',
          author: 'ingve',
          upvotes: 273,
          timestamp: '2019-06-05T00:20:03.958Z',
          commentCount: 134
        },
        {
          title: 'Show HN: A pure reference counting GC in Go (github.com)',
          author: 'sendilkumarn',
          upvotes: 17,
          timestamp: '2019-08-12T06:52:43.795Z',
          commentCount: 425
        },
        {
          title:
            'Stripe can make automatic LLCs but a wire transfer from Citi nearly ended me (abe-winter.github.io)',
          author: 'awinter-py',
          upvotes: 259,
          timestamp: '2019-07-10T19:43:22.348Z',
          commentCount: 143
        },
        {
          title:
            'Show HN: An open-source distributed graph database written in C++ (github.com)',
          author: 'jamie-vesoft',
          upvotes: 66,
          timestamp: '2019-07-30T19:21:12.041Z',
          commentCount: 156
        },
        {
          title: 'NOBUS (Nobody but Us) (en.wikipedia.org)',
          author: 'apsec112',
          upvotes: 107,
          timestamp: '2019-07-21T22:47:48.729Z',
          commentCount: 72
        },
        {
          title: 'Working for someone vs. doing your own thing (tik.dev)',
          author: 'thakobyan',
          upvotes: 242,
          timestamp: '2019-07-18T15:02:51.680Z',
          commentCount: 62
        },
        {
          title: 'Nobody Cares (2011) (a16z.com)',
          author: 'prostoalex',
          upvotes: 70,
          timestamp: '2019-08-22T12:13:36.419Z',
          commentCount: 301
        },
        {
          title:
            'Get Me Off Your Fucking Mailing List [pdf] (scs.stanford.edu)',
          author: 'af16090',
          upvotes: 83,
          timestamp: '2019-06-08T19:49:47.661Z',
          commentCount: 227
        },
        {
          title:
            'Reusable vs. Re-editable Code (2018) [pdf] (hal.archives-ouvertes.fr)',
          author: 'akkartik',
          upvotes: 16,
          timestamp: '2019-08-18T04:36:18.428Z',
          commentCount: 214
        },
        {
          title:
            'Thinking Fast and Slow, Deep Learning, and AI [video] (lexfridman.com)',
          author: 'AlanTuring',
          upvotes: 201,
          timestamp: '2019-05-31T15:56:19.346Z',
          commentCount: 114
        },
        {
          title:
            'How the U.S. military thinks about AI [audio] (changelog.com)',
          author: 'killjoywashere',
          upvotes: 32,
          timestamp: '2019-06-30T23:20:07.371Z',
          commentCount: 363
        },
        {
          title: 'How to Make a Raspberry Pi VPN Server (electromaker.io)',
          author: 'FoxMulder23',
          upvotes: 170,
          timestamp: '2019-08-02T21:40:47.105Z',
          commentCount: 253
        },
        {
          title: 'Real-Time Ray-Tracing in WebGPU (maierfelix.github.io)',
          author: 'Schampu',
          upvotes: 94,
          timestamp: '2019-08-18T05:25:49.419Z',
          commentCount: 367
        },
        {
          title:
            "Life's clockwork: Scientist shows how molecular engines keep us ticking (phys.org)",
          author: 'lelf',
          upvotes: 6,
          timestamp: '2019-07-23T20:32:41.394Z',
          commentCount: 229
        },
        {
          title: 'Video Gaming Will Take Over (matthewball.vc)',
          author: 'thesauri',
          upvotes: 125,
          timestamp: '2019-07-30T07:33:48.879Z',
          commentCount: 247
        }
      ]
    };
  }
};
</script>
```

> Note that adding a plugin might be destructive in later stages of a project and is only advised when you're just bootstrapping one. Make sure you have committed your changes before adding any plugin as well.

Save the changes and refresh. If you visit http://localhost:8080, you should see the list of items since `Home.vue` is getting loaded. If you visit http://localhost:8080/about, you should see the about page getting loaded.

## Linking from navigation bar

Now, let's link the items in the navigation bar to these pages. Open `components/NavBar.vue` and make the following change:

```html
<div class="navbar">
  <div class="logo">
    <span>V</span>
  </div>

  <ul class="navbar-links">
    <li>
      <router-link :to="{ name: 'home' }">Top</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'new' }">New</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'about' }">About</router-link>
    </li>
  </ul>
</div>
```

Save and check the preview. You should see links for these items and now and on clicking them, the active view should change as well as the URL without refreshing. Nice, but doesn't look good, does it?

We can tell `<router-link>` to not create any link elements by changing the above to the following:

```html
<ul class="navbar-links">
  <router-link tag="li" :to="{ name: 'home' }">Top</router-link>
  <router-link tag="li" :to="{ name: 'new' }">New</router-link>
  <router-link tag="li" :to="{ name: 'about' }">About</router-link>
</ul>
```

This will render `<li>` tags since we specified the `tag` prop. Let's also make some style changes so that the active link gets highlighted. If you inspect these `<li>` elements, you can see the `vue-router` adds the `router-link-active` class to the active `<router-link>`. We can use this to create a subtle color change:

```css
li {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}

li.router-link-active {
  color: #fff;
}
```

## `exact` prop

There seems to be one last itch though. When you switch to `About`, even though it's a different URL, `Top` is still getting active status. Why is that? Well, Top is our home page which is route `/`. By default, `<router-link>` active applies on exact matches as well as matches the beginning of paths such as `/about`. If we want to tell it to match only when it's exact, then we simple specify the `exact` prop:

```html
<router-link tag="li" :to="{ name: 'home' }" exact>Top</router-link>
```

There are much more features to `vue-router` that we aren't exploring in this lesson. Check the [docs]() for more details such as programmatic navigation and route guards.

Add some details to `About.vue` as well.
