export default {
  setUsers(state, payload) {
    state.users = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  setUserUpdated(state, payload) {
    state.userUpdated = payload
  },
  setUserPermissions(state, payload) {
    state.userPermissions = payload
  },
}
