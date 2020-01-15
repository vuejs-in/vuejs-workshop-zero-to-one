<template>
  <div>
    <ul>
      <ListItem v-for="(todo, index) of todos" :key="index" :name="todo.name" />
    </ul>
    <input type="text" @keyup.enter="addTodo($event)" />
  </div>
</template>

<script>
const ListItem = {
  name: 'ListItem',
  render() {
    return <li>{this.modified}</li>;
  },
  data() {
    return {
      modified: this.name.toUpperCase()
    }
  },
  props: ['name']
};

export default {
  components: {
    ListItem
  },

  data() {
    return {
      todos: [
        {
          name: 'Buy eggs',
          done: true
        },
        {
          name: 'Buy cheese',
          done: false
        },
        {
          name: 'Buy ham',
          done: true
        }
      ]
    };
  },

  methods: {
    addTodo(event) {
      this.todos.unshift({ name: event.target.value, done: false });
    },

    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>
