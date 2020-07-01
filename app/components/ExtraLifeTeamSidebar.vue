<template>
  <div class="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="flex items-center px-6 py-4">
      <p>{{ elTeam.name }}</p>
      <p>{{ elTeam.event.name }}</p>
      <p>{{ elTeam.fundraisingGoal }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elTeam: {
        event: {},
      },
    }
  },
  async mounted() {
    try {
      await this.$axios
        .$post({
          url: '/graphql',
          method: 'post',
          data: {
            query: `
            query	{
                elTeams {
                  name,
                  fundraisingGoal,
                  event {
                    name
                  }
                }
              }
          `,
          },
        })
        .then((result) => {
          this.elTeam = result.data.data.elTeams[0]
        })
    } catch (error) {}
  },
}
</script>

<style lang="postcss" scoped></style>
