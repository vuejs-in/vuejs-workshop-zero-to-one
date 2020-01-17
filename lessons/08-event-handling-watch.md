# Lesson 8

Let's see how we can react to DOM events, generating custom events from our components and `watch` expressions.

## `v-on:` directive

We can handle events from DOM elements using the `v-on:eventname` directive. For example:

```vue
<template>
  <button v-on:click="callMethod($event)">Click me</button>
</template>

<script>
export default {
  methods: {
    callMethod(event) {
      alert('Button clicked!');
    }
  }
};
</script>
```

This will execute the method `callMethod` defined in our component. The `$event` identifier available within the `<template>` is special and indicates the event object associated with the current event. Be sure to pass it explicitly if you need it.

Just like `v-bind:` which is shortened to `:`, we can shorten `v-on:` to `@`:

```html
<button @click="callMethod($event)">Click me</button>
```

Open [examples/08-event-handling-watch/events.vue](../examples/08-event-handling-watch/events.vue). Observe this:

```html
<input @keyup.enter="submitInput($event.target.value)" />
```

Vue allows custom _modifiers_ that can be appended to the event name. For `KeyboardEvent` types, we can append key names as shown above to only call the method when the key is pressed such as processing an input when the enter key is pressed.

Modifiers such as `.stop` for calling `event.stopPropagation()` and `.prevent` for calling `event.preventDefault()` are also present. These can be chained as well.

## Generating custom events

We most likely want to generate events from our own components as well. For this, we can use the `$emit()` method which is a part of a Vue component to generate arbitrary events, and pass data as well.

Open [examples/08-event-handling-watch/custom.vue](../examples/08-event-handling-watch/custom.vue). We can see that we're binding a method to a an event of `<FancyButton>` component named `click`. Don't let this confuse `click` is not added by default. But you can see here that not only we get to listen to a custom event on a custom component, we are also getting custom data from the generated event in the `$event` object. In this case, our `<FancyButton>` component accepts a `data` prop and you get the same back.

Let's see how `<FancyButton>` is implemented. Open [examples/08-event-handling-watch/FancyButton.vue](../examples/08-event-handling-watch/FancyButton.vue).

It's nothing but a good old HTML Button element. All we're doing is listening on the `click` event from the native button element and then calling `$emit()` (Remember that we don't need to prefix `this` inside template) and passing the data we need to pass. Pretty fancy, eh?

## `watch`

Sometimes, we just want to run some arbitrary code whenever one of our reactivity property changes—possibly to change another data property, or make a network call, or modify the DOM? Whatever the case is, Vue has got you covered.

You can define a handler function inside the `watch` section of the component object which will run everytime the associated property changes. Defining it is straightforward: just give it the same name as the reactive property of the component you want to observe.

Take a look at [examples/08-event-handling-watch/events.vue](../examples/08-event-handling-watch/events.vue). Forget about all the other sections and just focus on the `watch` section:

```diff
  data() {
    return {
      answer: 'Type a question',
      question: ''
    };
  },

+ watch: {
+   question: {
+     handler() {
+       this.answer = 'Waiting for you to stop typing...';
+       this.getAnswer(this.question);
+     }
+   }
+ }
```

As you can see, naming the property `question` is enough to start watching the `question` data property. The `handler()` method will be invoked everytime `question` changes. The `handler` function will get the new value and old value as arguments if you want to use them.
