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
          <li class="is-active">
            <a href="#" aria-current="page">Group List</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="column card">
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
          <b-table-column field="id" label="ID" width="90" sortable>
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.id"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">{{ props.row.id }}</div>
          </b-table-column>

          <b-table-column field="name" label="Name" sortable>
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.name"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.name }}
            </div>
          </b-table-column>

          <b-table-column field="code" label="Code" sortable>
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.code"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.code }}
            </div>
          </b-table-column>

          <b-table-column
            field="tree_unit_id"
            label="Tree Unit"
            width="100"
            sortable
          >
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.tree_unit_id"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.tree_unit_id }}
            </div>
          </b-table-column>

          <b-table-column
            field="tree_unit_permission_scope"
            label="Tree Unit Permission Scope"
            width="230"
            sortable
          >
            <vm-popover
              ref="popover"
              trigger="hover"
              placement="top"
              :content="props.row.tree_unit_permission_scope"
            >
            </vm-popover>
            <div v-popover:popover v-line-clamp:20="1">
              {{ props.row.tree_unit_permission_scope }}
            </div>
          </b-table-column>

          <b-table-column label="Active" width="100" sortable centered>
            <b-icon pack="fas" :icon="props.row.active ? 'check' : ''" />
          </b-table-column>

          <b-table-column field="actions" label="Actions" width="90" centered>
            <div class="buttons">
              <router-link
                class="button is-small"
                :to="`/admin/groups/${props.row.id}`"
              >
                <b-icon pack="fas" icon="pencil-alt" />
              </router-link>
              <b-button
                type="is-danger"
                size="is-small"
                @click.prevent="openModalDelete(props.row.id)"
              >
                <b-icon pack="fas" icon="trash-alt" />
              </b-button>
            </div>
          </b-table-column>
        </template>
      </b-table>
      <router-link class="button is-success" to="/admin/groups/create">
        New Group
      </router-link>
      <b-modal :active.sync="isModalDelete" has-modal-card>
        <modal-yes-no
          :message="'Are you sure you want to delete this record?'"
          :data="{ id: id }"
          :method="deleteGroup"
        ></modal-yes-no>
      </b-modal>
      <b-loading
        :is-full-page="true"
        :active.sync="loading"
        :can-cancel="false"
      />
    </div>
  </section>
</template>

<script>
import ModalYesNo from '@/components/modal/YesNo.vue'

export default {
  name: 'GroupList',
  components: {
    ModalYesNo,
  },
  data() {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      isModalDelete: false,
      id: null,
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
      return this.$store.getters['group/groups']
    },
  },
  watch: {
    dataStore() {
      this.data = this.$store.getters['group/groups']
    },
  },
  mounted() {
    this.getGroups()
  },
  methods: {
    async getGroups() {
      try {
        await this.$store.dispatch('group/getGroups')
      } catch (err) {
        console.log(err)
      }
    },
    async deleteGroup(payload) {
      this.isModalDelete = true
      if (payload) {
        try {
          await this.$store.dispatch('group/deleteGroup', payload.id)
          this.getGroups()
        } catch (err) {
          console.log(err)
        }
      }
    },
    openModalDelete(id) {
      this.id = id
      this.isModalDelete = true
    },
  },
}
</script>

<style scoped></style>
