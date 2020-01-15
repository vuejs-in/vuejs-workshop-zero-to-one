<template>
  <div class="news-list">
    <VueSimpleSpinner line-fg-color="#F66605" />
    <NewsListItem
      :title="items[0].title"
      :numComments="items[0].numComments"
      :author="items[0].author"
      :upvotes="items[0].upvotes"
    />
  </div>
</template>

<script>
import VueSimpleSpinner from 'vue-simple-spinner';

import NewsListItem from './NewsListItem';

export default {
  components: {
    VueSimpleSpinner,
    NewsListItem
  },

  props: {
    items: Array,
    default: () => []
  }
};
</script>

<style>
.news-list {
  width: 80%;
  margin: 20px auto 0;
  box-shadow: 0 0.6px 1.5px rgba(0, 0, 0, 0.018), 0 7px 12px rgba(0, 0, 0, 0.08);
}
</style>
