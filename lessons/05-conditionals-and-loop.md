# Lesson 5

## Conditionals: `v-if` directive

Open [examples/05-conditionals-and-loop/if.vue](../examples/05-conditionals-and-loop/if.vue) and run using `vue serve if.vue`. Understand how conditional logic works in Vue.

```vue
<template>
  <div v-if="activeComponent === 'uploading'">
    File is uploading...
  </div>
  <div v-else-if="activeComponent === 'typing'">
    {{ recepientName }} is typing...
  </div>
  <div v-else>It's {{ formattedTime }} for {{ recepientName }}</div>
</template>
```

You can pass any valid JavaScript expression into these _directives_ which will be determined as truthy/falsey according to JavaScript's rules.

If you open the inspector, you can notice that these directives will remove nodes if their values are falsey and only the node that has the truthy value will be kept. This is important to understand. If node creation is expensive and you rather want to toggle the visibility of the nodes, you can use `v-show` instead.

## Looping: `v-for` directive

Open [examples/05-conditionals-and-loop/for.vue](../examples/05-conditionals-and-loop/for.vue) and run using `vue serve for.vue`.

```vue
<template>
  <ul>
    <li v-for="todo of todos" :key="todo.name">
      {{ todo.name }}
    </li>
  </ul>
</template>
```

`v-for` syntax looks just like JavaScript's for loop syntax. You can also use the `in` operator instead and it'll work just fine without any of the side effects of the regular `in` operator in JS.

If you need the index, you can get that by changing it to the following:

```vue
<template>
  <ul>
    <li v-for="(todo, index) of todos" :key="todo.name">
      {{ index }}.
      {{ todo.name }}
    </li>
  </ul>
</template>
```

You can also combine `v-for` with `v-if` to add/remove certain nodes based on the item in the list. This could be useful, say, if you only want to show all the active items in a to-do list.

## `:key` and why it's important

You might've noticed that if you omitted `:key` attribute, you'll get an error. This is because of our linter settings and even though `:key` is optional in reality, you **must always provide it**. The value of `:key` helps Vue determine whether a node should be kept or not when the list changes. For a static collection that doesn't change, it's fine to leave out `:key` although it's better to be explicit and set it to the index of the item.

However, for any list that's dynamic, **you should not set key to index**. Even though Vue is pretty smart and you can get away with a lot of cases using index as key, it can really bite you when you least expect it to. We can see why this can be a problem with an example.

Open [examples/05-conditionals-and-loop/key.vue](../examples/05-conditionals-and-loop/key.vue) and run using `vue serve key.vue`.

In this modified example, we add items to the beginning of the list. Try typing something like "Buy milk" and enter a couple times. Uh, oh.

The reason is because, say, if we have 3 elements in a list, the indices of those items would be 0, 1 and 2 respectively. When you add a new item to the beginning of list, we have 0, 1, 2 and 3 now. Vue.js sees the keys and see that, oh, we have a new key and it is "3". It doesn't know that the item is prepended and it gets confused. Now, what's at index 3 after we prepended an item? That's right: "Buy ham". The same thing happens every time you insert an item.

This is why, using indices is almost always a bad idea. Always make sure you set a unique value for `key`.

## Rendering the list of news items

This should be pretty straightforward now. Open `NewsList.vue` and change the `<NewsListItem />` part to the following:

```diff
<template>
  <NewsListItem
+   v-for="item of items"
    :key="item.title"
    :title="item.title"
    :numComments="item.commentCount"
    :author="item.author"
    :upvotes="item.upvotes"
    :timestamp="new Date(item.timestamp)"
  />
</template>
```

We'll refactor some of these later when we add the actual data source but this will do for now.

We also need to change `NewsListItem.vue` so that it accepts these props as expressions in template:

```vue
<template>
  <div class="news-item">
    <div class="upvotes">
      <span>{{ upvotes }}</span>
    </div>
    <div class="info">
      <h2 class="title">{{ title }}</h2>
      <div class="meta">
        <div class="by">{{ author }}</div>
        <div class="timestamp">{{ timestamp }}</div>
        <div class="comments">{{ numComments }} comments</div>
      </div>
    </div>
    <div class="favorite">
      <button>♥︎</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    author: String,
    numComments: Number,
    upvotes: Number,
    timestamp: Date
  }
};
</script>
```

Perfect. We can see the list of items rendering. Huzzah!

But, it's pretty annoying to see the loader still spinning even though the data is loaded. Let's fix that shall we? Add a `v-if`/`v-else` check for `items.length` to toggle these:

```diff
<template>
  <VueSimpleSpinner
+   v-if="items.length === 0"
    line-fg-color="#F66605" />
  <NewsListItem
+   v-else
  />
</template>
```

Sweet!
