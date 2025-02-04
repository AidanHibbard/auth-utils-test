import { ManagementClient } from "auth0"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody(event)
  const { auth0, session: { password } } = useRuntimeConfig()

  const management = new ManagementClient({
    ...auth0
  })

  const response = await management.users.update(
    { id: session.user.sub },
    {
      connection: 'Username-Password-Authentication',
      name: `${body.first} ${body.last}`,
    },
  )

  return response.data
})
