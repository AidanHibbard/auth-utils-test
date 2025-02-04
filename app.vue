<script setup lang='ts'>
const { user, fetch } = useUserSession()

const splitName = (name: string): string[] => name.split(' ')
const [first, last] = user.value?.name ? splitName(user.value.name) : splitName('John Doe')

const name = reactive({
  first,
  last
})

const updateUser = async () => {
  if (!user.value) {
    alert('Please sign in first!')
    return;
  } else {
    await useRequestFetch()('/api/user/update', {
      method: 'POST',
      body: {
        first: name.first,
        lastName: name.last,
      },
    })
    await fetch()
    const split = splitName(user.value.name)
    name.first = split[0]
    name.last = split[1]
  }
}
</script>

<template>
  <AuthState>
    <a v-if="!user" href="/api/auth/auth0">Sign In</a>
    <div>
      <input type="text" v-model="name.first" />
      <input type="text" v-model="name.last" />
      <button @click="updateUser">Update name</button>
    </div>
  </AuthState>
</template>