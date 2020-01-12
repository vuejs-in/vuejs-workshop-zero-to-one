# Lesson 0

Welcome to the Vue.js Essentials workshop. This is the beginning of the workshop and we'll cover the pre-requisites and fundamentals.

## Pre-requisites

1. Need to have prior web-dev experience. We won't cover HTML, CSS or JavaScript essentials although we'll touch up on some modern JavaScript primitives that we will be using extensively.
2. You need to have the latest Node.js LTS installed on your machine. That's pretty much all that's required. If you're having an older Node.js release, you might face issues while following the workshop.

## What is Vue.js?

Vue.js is a progressive front-end framework. It stands out from others in the crowd by sticking close to the web primitives and not introducing many foreign imperatives, if any at all. Unlike React, you don't need to write non-standard HTML or mix your JavaScript with your templates. Unlike Angular, Vue.js doesn't force you to use a different language or follow MVC primitives strictly. And the _progressive_ is no marketing lingo—you can adopt Vue.js on your legacy web application incrementally and Vue.js fits in nicely.

Vue.js will make you feel at home. If you used jQuery before, you'd know what that feels like. Vue.js is no different, yet, it is very powerful.

Part of the reason why Vue.js is powerful is because of its community. While Vue.js on its own, doesn't include state management or routing libraries built-in, the Vue.js community has provided official solutions that strive to be the best so that you can use them confidently unless you really need something different. So, it doesn't force you to use them if you don't want to. There's a host of community-supported libraries and open-source libraries that serve almost every need of modern Single Page Applications (SPAs).

## Creating a simple Vue.js application

Creating a Vue.js application is as easy as linking to the CDN build in our `index.html`. While we will be utilizing modern tooling for better development experience later on, you can play around without needing anything else.

Paste the following before closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

This will load the CDN build of Vue.js which has the compiler for parsing template strings we'll be writing as well as the Vue runtime itself. Now, add the following to the `<body>`:

```html
<div id="app"></div>
```

This is where we'll be loading all the components we'll be writing as part of the Vue app. Here's where Vue will render the main application. It doesn't need to be have an `id` of `app` but that's usually the norm. It can be a different tag as well but `<div>` is as generic it can get.

Now, paste the following code just before the closing `</body>`, right below the `<script>` tag we wrote:

```html
<script>
  new Vue({
    el: '#app',
    template: `
            <h1>Hello, world!</h1>
        `
  });
</script>
```

This will instantiate a new Vue application by using the global `Vue` constructor function. It accepts an object of options. Let's see what these options do:

- `el`: this lets us provide a selector string to tell Vue where to _mount_ the application inside—i.e, Vue will render the application within this element.
- `template`: This lets us define a Vue.js template string which supports a lot of features (we'll cover these later). Here, we're just rendering an `<h1>` element with a static text value.

Save this file and open it in a browser. You'll see "Hello, world" rendered.

Now, let's create a component. Replace the newly added `<script>` tag with the following:

```html
<script>
  Vue.component('cool-heading', {
    props: ['headingText'],
    template: `
          <h1>{{ headingText }}</h1>
      `
  });

  new Vue({
    el: '#app',
    template: `
          <cool-heading headingText="Hello, world!" />
      `
  });
</script>
```

Here, we are defining a new Vue component using the `Vue.component()` function. Components are a powerful abstraction in Vue.js that lets us reuse related HTML, CSS and JavaScript in multiple places. Let's see what we're doing here:

- `Vue.component()` accepts two paremeters: a name for the component that we can use in Vue templates as well as an object defining the template and other properties.
- `props`: This lets us accept custom attributes for our component.
- `template`: Same as before but here, we notice the `{{ }}` aka _mustache_ operator. This lets us insert dynamic values into our template and Vue will re-render based on changes to this value.

We also modified template in `Vue` constructor to use the new `cool-heading` component we wrote. You can see that we're using the prop `headingText` to pass the content.

Save the file and refresh. You'll now see it rendered onto the screen.

You can have most valid JavaScript expressions within the curly braces. Try modifying the `template` of `<cool-heading>` to:

```javascript
`<h1>{{ headingText.toUpperCase() }}</h1>`
```

## End

Hopefully, you got a taste of what Vue.js packs. We won't be using the CDN build for the upcoming lessons and we'll start scaffolding the project we are building.
