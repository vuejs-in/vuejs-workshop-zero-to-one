# Lesson 8

In this lesson, we'll connect to the publicly available HackerNews API and load real data onto our news list. We'll also implement the `<Paginator>` component, which will be linked to our router. There's quite a lot of stuff in this lesson so hop in.

## Fetching data

We'll first implement some convenient functions that'll use the Fetch API to get the data we need. We'll create these in `src/lib/api.js`:

```javascript
const baseURL = 'https://hacker-news.firebaseio.com/v0';

const fetchItem = id => {
  return fetch(`${baseURL}/item/${id}.json`).then(res => res.json());
};

const getTopStories = () => {
  return fetch(baseURL + '/topstories.json').then(res => res.json());
};

export const getPaginatedTopStories = async (page = 1, count = 10) => {
  const allTopStories = await getTopStories();

  const idsToFetch = allTopStories.slice((page - 1) * count, page * count);

  return Promise.all(idsToFetch.map(fetchItem));
};
```

While you could handcraft these APIs yourself, that's not really necessary. The goal is to show how we can get the data loaded into our components for rendering. The functions implemented above are pretty straightforward, although we could've certainly optimized many things around:

- `getTopStories`: fetches IDs of the top stories. About 500 of them by default.
- `fetchItem`: given an ID, gets the JSON representation of a news item.
- `getPaginatedTopStories`: combines above two functions to get us an array of items for a given page number.

## Adding dynamic params to our routes

We'll do a little refactoring of our routes. What we want to do now is:

1. If user visits `/`, redirect to `/top`
2. If user visits `/top/2`, load data for page 2.

So, we'll let our routes indicate part of our state.

`vue-router` allows us to define dynamic components in our routes:

```javascript
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'top' }
  },
  {
    path: '/top/:page?',
    name: 'top',
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
```

As you can see above, we can indicate dynamic components of a route with `:param` syntax. We can access this from our components via the `this.$route.params` object. For the `:page` param above, that'd be `this.$route.params.page`.

The other cool thing about this is that `$route.params` is reactive! As we'll see later, we'd be able to re-fetch the data when the param changes as a result of us clicking within our paginator component.

Let's also make a small change in the `components/NavBar.vue` file so that "Top" link gets active state correctly:

```html
<router-link tag="li" :to="{ name: 'top' }">Top</router-link>
```

## Passing down the fetched data

Let's go to `views/Home.vue` and make some changes:

```vue
<template>
  <div>
    <Paginator :currentPage="currentPage" :totalPages="totalPages" />
    <NewsList :items="items" />
  </div>
</template>

<script>
import Paginator from '@/components/Paginator.vue';
import NewsList from '@/components/NewsList.vue';

export default {
  name: 'home',
  components: {
    NewsList,
    Paginator
  },

  data() {
    return {
      items: []
    };
  },

  watch: {
    currentPage: {
      immediate: true,
      handler() {
        this.fetchStories();
      }
    }
  },

  methods: {
    async fetchStories() {}
  },

  computed: {
    currentPage() {
      return +this.$route.params.page || 1;
    },

    totalPages() {
      return this.items.length || 0;
    }
  }
};
</script>
```

Let's go over the changes. `<Paginator>` would need the current page we're at and the total number of pages. We create two computed properties: `currentPage` and `totalPages` that does this. As mentioned before, we can access the current page by `this.$route.params.page`. This will be a string value which we convert to number by using the unary `+` operator. If this param isn't present, we default to 1.

`totalPages` is straightforward. We just return the length of the `items` data property.

We also create a dummy method called `fetchStories` which we'll populate later.

We use a watcher to notify whenever the `currentPage` computed property changes. `immediate: true` runs the `handler` function once at the beginning when the component is mounted, otherwise, it only gets run when the value of reactive property changes later. As you can see, it simply calls the `this.fetchStories` method which will make the API call and sets the `this.items` property. Let's code that up:

```javascript
import { getPaginatedTopStories } from '@/lib/api';

// ..

async fetchStories() {
  const items = await getPaginatedTopStories(this.currentPage, 20);

  this.items = items.map(item => ({
    title: item.title,
    author: item.by,
    upvotes: item.score,
    timestamp: new Date(item.time * 1000).toUTCString(),
    commentCount: (item.kids || []).length
  }));
}
```

Nothing too complicated. Although, we're mapping over the items we receive into the format we're expecting when we pass it down to `<NewsList>`. Alright, try saving and reload. You should see actual data being fetched and rendered! Alright! 🙌 We're not done yet, we need to implement `<Paginator>`.

## Building `<Paginator>`

Remember, we're determining the current page state via router params. So, when someone clicks the Next/Previous buttons, we basically need to change the route. The reactivity takes care of the rest.

You have two choices here:

1. Use `<router-link>` for the prev/next buttons and simply pass a `params` property with `page: currentPage - 1` and `page: currentPage + 1` respectievely.
2. Use the `this.$router.push()` function to do it imperatively from within a method. It accepts a route object, just like `<router-link>`. Give it a shot on your own. Take a peek at the below implementation for some inspiration.

```vue
<template>
  <div class="paginator">
    <div class="controls">
      <span class="prev" @click="prevPage()">&lt; prev</span>
      <span v-if="!totalPages">...</span>
      <span v-else class="marker">{{ currentPage }} / {{ totalPages }}</span>
      <span class="next" @click="nextPage()">next &gt;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number
  },

  methods: {
    prevPage() {
      this.$router.push({
        name: 'top',
        params: {
          page: this.currentPage - 1 >= 1 ? this.currentPage - 1 : 1
        }
      });
    },

    nextPage() {
      this.$router.push({
        name: 'top',
        params: {
          page:
            this.currentPage + 1 <= this.totalPages
              ? this.currentPage + 1
              : this.totalPages
        }
      });
    }
  }
};
</script>

<style scoped>
.paginator {
  background: white;
  position: sticky;
  top: 0;
}

.controls {
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  padding: 10px 20px;
  box-shadow: 0 1px 2px #ccc;
  user-select: none;
}

.prev,
.next {
  display: inline-block;
  cursor: pointer;
}

.prev {
  margin-right: 10px;
}

.next {
  margin-left: 10px;
}
</style>
```

Try it out. You should now see that clicking the prev/next buttons would not only change the route, but also fetch data for the page you're viewing. Neato!

## Improvising

Let's add the popular `date-fns` package to format the timestamp value we receive into a more, human-readable string:

```sh
yarn add date-fns
```

Open `components/NewsListItem.vue`:

```diff
<template>
  <div class="news-item">
    <div class="upvotes">
      <span>{{ upvotes }}</span>
    </div>
    <div class="info">
      <h2 class="title">
        {{ title }}
      </h2>
      <div class="meta">
        <div class="by">{{ author }}</div>
+        <div class="timestamp">{{ ago }}</div>
        <div class="comments">{{ numComments }} comments</div>
      </div>
    </div>
    <div class="favorite">
      <button>♥︎</button>
    </div>
  </div>
</template>

<script>
+ import formatDistanceStrict from 'date-fns/formatDistanceStrict';

export default {
  props: {
    title: String,
    author: String,
    numComments: Number,
    upvotes: Number,
    timestamp: Date
  },

+  computed: {
+    ago() {
+      return formatDistanceStrict(this.timestamp, new Date(), {
+        includeSeconds: true,
+        addSuffix: true
+      });
+    }
+  }
}
</script>
```

## What next?

Nice. You have a working HackerNews clone written in Vue.js. You could do so much more:

1. Add a user view, item view with comment threads
2. Link to the actual post via the `url` from item response
3. Load data more efficiently: you could use the firebase SDK for realtime updates and cache already seen item responses so that you don't have to re-fetch them.
4. Make it a PWA!

There's also lot more to learn about Vue.js. Check the excellent Vue.js docs: https://vuejs.org/
