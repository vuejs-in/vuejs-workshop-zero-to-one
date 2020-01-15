<template>
  <div>
    <ul>
      <li v-for="(todo, index) of todos" :key="todo.name">
        {{ index }}.
        {{ todo.name }}
      </li>
    </ul>
    <input type="text" @keyup.enter="addTodo($event)">
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [
        {
          name: 'Buy eggs'
        },
        {
          name: 'Buy cheese'
        },
        {
          name: 'Buy ham'
        }
      ]
    };
  },

  methods: {
    addTodo(event) {
      this.todos.push({ name: event.target.value });
    }
  }
};
</script>
