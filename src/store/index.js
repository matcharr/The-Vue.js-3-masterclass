import { createStore } from 'vuex';
import sourceData from '@/data.json';

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    authUser: (state) => {
      // eslint-disable-next-line no-shadow
      const user = state.users.find((user) => user.id === state.authId);
      if (!user) return null;
      return {
        ...user,
        // authUser.postsCount
        // authUser.postsCount()
        get postsCount() {
          return this.posts.length;
        },
        // authUser.posts
        get posts() {
          return state.posts.filter((post) => post.userId === user.id);
        },
        // authUser.threadsCount
        get threadsCount() {
          return this.threads.length;
        },
        // authUser.threads
        get threads() {
          return state.threads.filter((post) => post.userId === user.id);
        },
      };
    },
  },
  actions: {
    createPost({
      commit,
      state,
    }, post) {
      post.id = `ggqq${Math.random()}`;
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      commit('setPost', { post }); // set the post
      commit('appendPostToThread', {
        postId: post.id,
        threadId: post.threadId,
      });
    },
    createThread({
      commit,
      state,
      dispatch,
    }, {
      text,
      title,
      forumId,
    }) {
      const id = 'ggqq' + Math.random();
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = {
        forumId,
        title,
        publishedAt,
        userId,
        id,
      };
      commit('setThread', { thread });
      commit('appendThreadToUser', {
        userId,
        threadId: id,
      });
      commit('appendThreadToForum', {
        forumId,
        threadId: id,
      });
      dispatch('createPost', {
        text,
        threadId: id,
      });
    },
    updateUser({ commit }, user) {
      commit('setUser', {
        user,
        userId: user.id,
      });
    },
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post);
    },
    setThread(state, { thread }) {
      state.threads.push(thread);
    },
    setUser(state, {
      user,
      userId,
    }) {
      // eslint-disable-next-line no-shadow
      const userIndex = state.users.findIndex((user) => user.id === userId);
      state.users[userIndex] = user;
    },
    appendPostToThread(state, {
      postId,
      threadId,
    }) {
      // eslint-disable-next-line no-shadow
      const thread = state.threads.find((thread) => thread.id === threadId);
      thread.posts = thread.posts || [];
      thread.posts.push(postId);
    },
    appendThreadToForum(state, {
      forumId,
      threadId,
    }) {
      const forum = state.forums.find(forum => forum.id === forumId);
      forum.threads = forum.threads || [];
      forum.threads.push(threadId);
    },
    appendThreadToUser(state, {
      userId,
      threadId,
    }) {
      const user = state.users.find(user => user.id === userId);
      user.threads = user.threads || [];
      user.threads.push(threadId);
    },
  },
});
