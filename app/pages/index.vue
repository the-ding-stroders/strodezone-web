<template>
  <div class="max-w-screen-xl self-center w-full">
    <h1 class="title">
      TDS Strodezone
    </h1>
    <h2 class="subtitle">
      Community management website for The Ding Stroders
    </h2>
    <!-- <ExtraLifeTeamSidebar /> -->
  </div>
</template>

<script>
// import ExtraLifeTeamSidebar from '~/components/ExtraLifeTeamSidebar.vue'

export default {
  auth: false,
  // components: {
  //   ExtraLifeTeamSidebar,
  // },
}
</script>

<style lang="postcss" scoped>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
