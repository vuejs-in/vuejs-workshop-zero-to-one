# Lesson 7

## Reactivity

Let's take a break from coding and talk about how Vue's reactivity works. Vue achieves reactivity at present by converting properties into getters and setters via the `Object.defineProperty()` function.

Let's look at an example of how that works:

```javascript
let obj = { name: 'Sangeeth' };

function onNameChanged() {
  console.log('Name changed!');
}

obj.name = 'Peter';
```

Suppose I want to call the `onNameChanged` function when the value of `obj.name` changes, what can I do? Sure, if we imagine `obj.name` to be a function, we could call `onNameChanged` inside it but that wouldn't be very convenient. Luckily, we have getters and setters:

```javascript
let obj = { name: 'Sangeeth' };

function onNameChanged() {
  console.log('Name changed!');
}

let nameValue = obj.name;

Object.defineProperty(obj, 'name', {
  get() {
    return currentValue;
  },

  set(newValue) {
    currentValue = newValue;

    onNameChanged();

    return currentValue;
  }
});

obj.name = 'Peter';
```

The `get()` function is invoked whenever we simply try to access the `name` property. The `set()` function is called whenever we try to change the `name` property. As you can see, we can simply put `onNameChanged` in the `set()` function and it will be called whenever `obj.name` changes.

This is the fundamental system that Vue.js uses to deliver the sort of reactivity you see. Think of it, on a macroscopic level: with computed properties and methods and templates being converted into tiny functions that are triggered whenever the associated properties change.

> [examples/07-lifecycle/reactivity.js](../examples/07-lifecycle/reactivity.js) contains a basic means to track dependencies and re-run updater functions for an object.

> For more on this topic, check https://vuejs.org/v2/guide/reactivity.html

![Vue Reactivity](images/reactivity.png)

## Don't add/delete new properties a.k.a always define data properties

Due to limitations, Vue.js won't be able to detect addition or removal of properties. i.e:

```vue
<script>
export default {
  data() {
    return {
      data: { a: 1 }
    }
  },

  methods: {
    createProps() {
      this.data.b = 2; // Doesn't work

      this.$set(this.data, 'b', 2); // This works
    }
  }
}
</script>
```

## Lifecycle

A Vue component goes through many phases from the time of its creation, to being rendered and to finally being removed from the memory and DOM. It also provides us hooks via special methods on the component object where we can execute arbitrary code. Let's understand the lifecycle and what each and every hook means:

![Vue component lifecycle](images/lifecycle.png)

1. `beforeCreate`: Called synchronously immediately after the instance has been initialized, before data observation and event/watcher setup.
2. `created`: Called synchronously after the instance is created. Data props, computed props, methods, watchers are all set up. But, mounting hasn't yet started (i.e, adding to the DOM);
3. `beforeMount`: Called right before the mounting begins: the render function is about to be called for the first time.
4. `mounted`: Called after the instance has been mounted. Doesn't guarantee child components are also mounted.
5. `beforeUpdate`: Called when data changes, before the DOM is patched.
6. `updated`: Called after a data change causes the virtual DOM to be re-rendered and modified.
7. `activated/deactivated`: See https://vuejs.org/v2/api/#activated
8. `beforeDestroy`: Right before instance is destroyed and instance is still fully functional and available in this stage.
9. `destroyed`: Called after instance is destroyed. All child instances are also destroyed at this point.

We can take a look at [examples/07-lifecycle/lifecycle.vue](../examples/07-lifecycle/lifecycle.vue) to see how all these hooks are executed for a component.

So, how do you make sense of these and what do you need?

- Use `created` or `mounted` hooks to make API calls and to change state.
- Use `mounted` hook to set up custom event listeners as only when this is executed, the DOM belong to the component is rendered, except for child components.
- Use `updated` if you want to deal with DOM after it's render post state-change. To react to state changes only, use computed/watchers.
- Use `beforeDestroy` if you have things to be cleaned up related to either DOM within the component or outside.
