# Lesson 4

Now that we have some dummy data in place, let's start passing this down to our child components. In Vue, we pass data from parent to child via `props`. These look just like HTML attributes but can contain values other than strings such as objects or arrays.

For this case, we simply need to pass the `items` data property to `NewsList`:

```vue
<template>
  <NewsList v-bind:items="items">
</template>
```

The syntax is as follows:

```
v-bind:propName="value"
```

To make it a bit easier, we can remove the `v-bind` prefix and shorten it to the following:

```vue
<template>
  <NewsList :items="items">
</template>
```

If we save the above, we should receive an error. We still haven't defined the `NewsList.vue` file and it's empty. Let's fill it with some default template and let's try to access the `items` prop we passed:

```vue
<template>
  <div>
    {{ items[0].title }}
  </div>
</template>
```

We're getting an error. This is because we haven't defined what props the `NewsList` component accepts. We do that by defining the following inside `NewsList.vue`'s object:

```vue
<script>
export default {
  props: [ 'items' ]
}
</script>
```

Now, we can see the first item getting printed. `props` can be either a simple array of strings or better yet, an object that defines the type of the prop, defaults and more. Let's say that we need the prop to be an array and have a default value of `[]`:

```vue
<script>
export default {
  props: {
    items: Array,
    default: () => []
  }
}
</script>
```

Try passing in a different value to `<NewsList>` component:

```HTML
<NewsList :items="'wrong value'">
```

We should receive an error in our console stating that the prop type check failed. This helps us spot issues with our components while developing. Notice that the value of `default` above is a function for the same reason why `data` is a function: otherwise, the references will be shared amongst multiple instances which is not what we want.

Let's now design and build the `NewsList` component now that we have some of the values we require.

## Building `NewsList`

We need to first render some fallback if we receive an empty array of items. For now, let's assume that if we're receiving an empty array for a prop, it means data is still being fetched. So, we could show a loading spinner.

We could make this ourselves but the great part about Vue being modular is that you can use an external component library to fulfill certain needs. Let's search for a nice loading spinner from [vuejs/awesome-vue](https://github.com/vuejs/awesome-vue). This is a great resource to refer to for solving certain common problems.

For this case, let's use [vue-simple-spinner](https://github.com/dzwillia/vue-simple-spinner). Let's install this by running the following:

```sh
yarn add vue-simple-spinner
```

Now, let's simply import this in our `NewsList.vue` component like so:

```vue
<template>
  <div class="news-list">
    <VueSimpleSpinner />
  </div>
</template>

<script>
import VueSimpleSpinner from 'vue-simple-spinner';
// ...
</script>

<style>
.news-list {
  width: 80%;
  margin: 20px auto 0;
  box-shadow: 0 0.6px 1.5px rgba(0, 0, 0, 0.018), 0 7px 12px rgba(0, 0, 0, 0.08);
}
</style>
```

We should see our spinner on screen. Let's give it a color by setting `line-fg-color` prop:

```vue
<template>
  <VueSimpleSpinner line-fg-color="#F66605" />
</template>
```

Good. We'll get back to how we can hide the spinner when data is available a little later. For now, let's create the markup for a `<NewsListItem>` component. We first import and add this to `<NewsList>` and feed it with some props as follows:

```vue
<template>
  <NewsListItem :title="items[0].title" :numComments="items[0].numComments" :author="items[0].author" :upvotes="items[0].upvotes" />
</template>

<script>
export default {
  components: {
    NewsListItem,
    VueSimpleSpinner
  }
}
</script>
```

We didn't really have to pass the `items` variable here. We could've simply put some static values and designed the component. After adding these styles, the `NewsListItem.vue` file would look like this:

```vue
<template>
  <div class="news-item">
    <div class="upvotes">
      <span>100</span>
    </div>
    <div class="info">
      <h2 class="title">Vue.js is awesome</h2>
      <div class="meta">
        <div class="by">by Sangeeth</div>
        <div class="timestamp">3 hours ago</div>
        <div class="comments">100 comments</div>
      </div>
    </div>
    <div class="favorite">
      <button>♥︎</button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.news-item {
  display: flex;
}

.upvotes {
  color: #F66605;
  font-weight: 700;
  font-size: 1.5em;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info {
  padding: 10px 0;
}

.title {
  font-weight: 400;
  font-size: 1.3em;
  margin: 0;
  color: #333;
}

.meta {
  color: #888;
  font-size: 0.8em;
  display: flex;
  margin-top: 5px;
}

.meta :first-child {
  border-left: none;
  padding-left: 0;
}

.meta > * {
  border-left: 1px solid #888;
  padding-left: 10px;
  padding-right: 10px;
}

.favorite {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin-left: auto;
}

.favorite button {
  background: transparent;
  border: none;
  outline: none;
  color: #ccc;
  font-size: 2em;
}
</style>
```

Notice that we also added a like button to the right side of the item.

Looking good so far. In the next lesson, we'll see how we can show one item per entry in our array by looping over them as well as hiding the spinner when data is present.
