<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
          <textarea id="" v-model="text" aria-label="textarea"
                    class="form-input" cols="30" name=""
                    rows="10"/>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PostEditor',
  data() {
    return {
      text: '',
    };
  },
  methods: {
    save() {
      const post = {
        text: this.text,
      };
      this.$emit('save', { post }); // Access under eventData.post
      this.text = '';
    },
  },
};
</script>

<style scoped>

</style>
