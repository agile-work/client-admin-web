<template>
  <section>
    <div class="column">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link to="/">
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/admin/users">
              User List
            </router-link>
          </li>
          <li>
            <router-link :to="`/admin/users/${userID}`">
              Edit User
            </router-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">Add Group</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="column card hero">
      <b-notification v-if="error" type="is-danger">
        {{ error }}
      </b-notification>
      <UserGroupForm @formToParent="submit" />
    </div>
    <b-loading
      :is-full-page="true"
      :active.sync="loading"
      :can-cancel="false"
    />
  </section>
</template>

<script>
import UserGroupForm from '@/components/userGroup/Form.vue'

export default {
  name: 'UserGroupCreate',
  components: {
    UserGroupForm,
  },
  data() {
    return {
      userID: this.$route.params.user_id,
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters.loading > 0
    },
  },
  beforeCreate() {
    this.$store.commit('clearError')
  },
  methods: {
    async submit(data) {
      if (data) {
        try {
          await this.$store.dispatch('user/addGroup', data)
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
}
</script>

<style></style>
