<template>
  <div>
    <Paginator :currentPage="currentPage" :totalPages="totalPages" />
    <NewsList :items="items" />
  </div>
</template>

<script>
import { getPaginatedTopStories } from '@/lib/api';

import Paginator from '@/components/Paginator.vue';
import NewsList from '@/components/NewsList.vue';

export default {
  name: 'home',
  components: {
    NewsList,
    Paginator
  },

  data() {
    return {
      items: []
    };
  },

  watch: {
    currentPage: {
      immediate: true,
      handler() {
        this.fetchStories();
      }
    }
  },

  methods: {
    async fetchStories() {
      const items = await getPaginatedTopStories(this.currentPage, 20);

      this.items = items.map(item => ({
        title: item.title,
        author: item.by,
        upvotes: item.score,
        timestamp: new Date(item.time * 1000).toUTCString(),
        url: item.url,
        commentCount: (item.kids || []).length
      }));
    }
  },

  computed: {
    currentPage() {
      return +this.$route.params.page || 1;
    },

    totalPages() {
      return this.items.length || 0;
    }
  }
};
</script>
