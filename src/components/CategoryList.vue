<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :category-id="category.id"
    :forums="getForumsForCategory(category)"
    :title="category.name"
  />
</template>

<script>
import ForumList from '@/components/ForumList.vue';

export default {
  components: { ForumList },
  props: {
    categories: {
      required: true,
      type: Array,
    },
  },
  methods: {
    getForumsForCategory(category) {
      return this.$store.state.forums.filter((forum) => forum.categoryId === category.id);
    },
  },
};
</script>

<style scoped>
</style>
