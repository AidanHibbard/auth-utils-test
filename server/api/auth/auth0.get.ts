const { oauthNamespace } = useRuntimeConfig()

export default defineOAuthAuth0EventHandler({
  async onSuccess(event, { user }) {
    try {
      const namespace = oauthNamespace
      const transformedUser = {
        sub: user.sub,
        name: user[`${namespace}name`] || user.name,
      }

      await setUserSession(event, { user: transformedUser })

      return sendRedirect(event, '/')
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error during authentication',
      })
    }
  },
  onError(event) {
    return sendRedirect(event, '/')
  },
})