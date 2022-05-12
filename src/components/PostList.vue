<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="user-info">
        <a class="user-name" href="#">
          {{ userById(post.userId).name }}
        </a>
        <a aria-label="avatar" href="#">
          <img :src="userById(post.userId).avatar" alt="" class="avatar-large">
        </a>
        <p class="desktop-only text-small">107 posts</p>
      </div>

      <div class="post-content">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>
      <div class="post-date text-faded">
        <AppDate :timestamp="post.publishedAt"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PostList',
  props: {
    posts: {
      required: true,
      type: Array,
    },
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    userById(userId) {
      return this.users.find((p) => p.id === userId);
    },
  },
};
</script>

<style scoped>

</style>
