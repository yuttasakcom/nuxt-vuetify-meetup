export default ctx => {
  if (!ctx.store.getters.userIsAuthenticated) {
    ctx.redirect('/users/signin')
  }
}
