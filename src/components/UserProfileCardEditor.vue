<template>
  <div class="profile-card">
    <form @submit.prevent="save">
      <p class="text-center">
        <img
          :alt="`${user.name} profile picture`"
          :src="user.avatar"
          class="avatar-xlarge img-update"
        />
      </p>

      <div class="form-group">
        <input
          v-model="activeUser.username"
          class="form-input text-lead text-bold"
          placeholder="Username"
          type="text"
        />
      </div>

      <div class="form-group">
        <input
          v-model="activeUser.name"
          class="form-input text-lead"
          placeholder="Full Name"
          type="text"
        />
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          id="user_bio"
          v-model="activeUser.bio"
          class="form-input"
          placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr/>

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          id="user_website"
          v-model="activeUser.website"
          autocomplete="off"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          id="user_email"
          v-model="activeUser.email"
          autocomplete="off"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          id="user_location"
          v-model="activeUser.location"
          autocomplete="off"
          class="form-input"
        />
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click="cancel">Cancel</button>
        <button class="btn-blue" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserProfileCardEditor',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeUser: { ...this.user },
    };
  },
  methods: {
    save() {
      this.$store.dispatch('updateUser', { ...this.activeUser });
      this.$router.push({ name: 'Profile' });
    },
    cancel() {
      this.$router.push({ name: 'Profile' });
    },
  },
};
</script>
