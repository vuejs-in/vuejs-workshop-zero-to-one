<template>
  <div class="paginator">
    <div class="controls">
      <span class="prev" @click="prevPage()">&lt; prev</span>
      <span v-if="!totalPages">...</span>
      <span v-else class="marker">{{ currentPage }} / {{ totalPages }}</span>
      <span class="next" @click="nextPage()">next &gt;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number
  },

  methods: {
    prevPage() {
      this.$router.push({
        name: 'top',
        params: {
          page: this.currentPage - 1 >= 1 ? this.currentPage - 1 : 1
        }
      });
    },

    nextPage() {
      this.$router.push({
        name: 'top',
        params: {
          page:
            this.currentPage + 1 <= this.totalPages
              ? this.currentPage + 1
              : this.totalPages
        }
      });
    }
  }
};
</script>

<style scoped>
.paginator {
  background: white;
  position: sticky;
  top: 0;
}

.controls {
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  padding: 10px 20px;
  box-shadow: 0 1px 2px #ccc;
  user-select: none;
}

.prev,
.next {
  display: inline-block;
  cursor: pointer;
}

.prev {
  margin-right: 10px;
}

.next {
  margin-left: 10px;
}
</style>
