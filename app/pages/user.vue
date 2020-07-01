<template>
  <div class="max-w-screen-xl self-center w-full">
    <h1 class="title">
      user page
    </h1>
    <h2 class="subtitle">Hello, {{ username }}!</h2>
    <div>
      Here's your super-secret TDS Streamaganza Key. Keep it safe, Clark Kent.
    </div>
    <form class="w-full max-w-sm">
      <!-- <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="stream-url"
      >
        Stream URL
      </label>
      <input
        id="stream-url"
        v-model="streamUrl"
        type="text"
        readonly
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
      /> -->
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="stream-key"
      >
        Stream Key
      </label>
      <input
        id="stream-key"
        v-model="streamKey"
        :type="passwordFieldType"
        readonly
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
      />
    </form>
    <button
      type="button"
      class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
      @click="switchVisibility"
    >
      show / hide
    </button>
  </div>
</template>

<script>
export default {
  middleware: ['redirectIfNotAuth'],
  async asyncData({ $axios }) {
    try {
      const data = await $axios.$get('/users/me')
      const streamerData = await $axios.$get('/streamers/' + data.streamer)
      return {
        username: data.username,
        streamKey: streamerData.streamKey,
        // avatar: data.avatar
      }
    } catch (error) {
      return {
        username: '',
      }
    }
  },
  data() {
    return {
      passwordFieldType: 'password',
      // streamUrl: '',
    }
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
    },
  },
  head() {
    return {
      title: 'Users',
    }
  },
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
