<template>
  <div>
    <div>
      Enter a stupid question:
    </div>
    <input type="text" v-model="question" />
    <div>
      {{ answer }}
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getAnswer = debounce(this.getAnswer.bind(this), 2000);
  },

  data() {
    return {
      answer: 'Type a question',
      question: ''
    };
  },

  watch: {
    question: {
      handler() {
        this.answer = 'Waiting for you to stop typing...';
        this.getAnswer(this.question);
      }
    }
  },

  methods: {
    async getAnswer(question) {
      if (!question) {
        this.answer = "That wasn't a question.";
        return;
      }

      this.answer = await fetch('https://yesno.wtf/api')
        .then(resp => resp.json())
        .then(json => json.answer);
    }
  }
};

const debounce = (fn, ms) => {
  let handler = null;

  return (...args) => {
    if (handler) {
      clearTimeout(handler);
    }

    handler = setTimeout(() => {
      handler = null;
      fn(...args);
    }, ms);
  };
};
</script>
