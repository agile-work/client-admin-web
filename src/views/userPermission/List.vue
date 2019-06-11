<template>
  <section>
    <div class="column">
      <b-field grouped group-multiline>
        <b-select v-model="perPage">
          <option value="5">
            5 per page
          </option>
          <option value="10">
            10 per page
          </option>
          <option value="15">
            15 per page
          </option>
          <option value="20">
            20 per page
          </option>
        </b-select>
      </b-field>

      <b-table
        :data="data"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :default-sort-direction="defaultSortDirection"
        default-sort="id"
        :hoverable="true"
        :bordered="true"
      >
        <template slot-scope="props">
          <b-table-column
            field="structure_id"
            label="Structure ID"
            width="125"
            sortable
          >
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.structure_id"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.structure_id }}
            </div>
          </b-table-column>

          <b-table-column
            field="structure_type"
            label="Structure Type"
            width="135"
            sortable
          >
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.structure_type"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.structure_type }}
            </div>
          </b-table-column>

          <b-table-column
            field="structure_name"
            label="Structure Name"
            sortable
          >
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.structure_name"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.structure_name }}
            </div>
          </b-table-column>

          <b-table-column field="schema_name" label="Schema" sortable>
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.schema_name"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.schema_name }}
            </div>
          </b-table-column>

          <b-table-column field="permission_type" label="Permission" sortable>
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.permission_type.toString()"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.permission_type.toString() }}
            </div>
          </b-table-column>

          <b-table-column field="scope" label="Scope" sortable>
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.scope"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.scope }}
            </div>
          </b-table-column>
        </template>
      </b-table>
      <b-loading
        :is-full-page="true"
        :active.sync="loading"
        :can-cancel="false"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserPermissionList',
  data() {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
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
    dataStore() {
      return this.$store.getters['user/userPermissions']
    },
  },
  watch: {
    dataStore() {
      this.data = this.$store.getters['user/userPermissions']
    },
  },
  mounted() {
    this.getUserPermissions(this.userID)
  },
  methods: {
    async getUserPermissions(userID) {
      try {
        await this.$store.dispatch('user/getUserPermissions', userID)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped></style>
