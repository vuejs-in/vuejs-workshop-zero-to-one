<template>
  <div class="news-item">
    <div class="upvotes">
      <span>{{ upvotes }}</span>
    </div>
    <div class="info">
      <h2 class="title">
        <a :href="url">{{ title }}</a>
      </h2>
      <div class="meta">
        <div class="by">{{ author }}</div>
        <div class="timestamp">{{ ago }}</div>
        <div class="comments">{{ numComments }} comments</div>
      </div>
    </div>
    <div class="favorite">
      <button>♥︎</button>
    </div>
  </div>
</template>

<script>
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

export default {
  props: {
    title: String,
    author: String,
    numComments: Number,
    upvotes: Number,
    timestamp: Date,
    url: String
  },

  computed: {
    ago() {
      return formatDistanceStrict(this.timestamp, new Date(), {
        includeSeconds: true,
        addSuffix: true
      });
    }
  }
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
  flex-basis: 50px;
  flex-shrink: 0;
  text-align: center;
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

.title a {
  text-decoration: none;
  color: inherit;
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
