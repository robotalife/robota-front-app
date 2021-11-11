<script>
import Header from './components/Header.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import SwitchRadioGroup from '@/components/switch/SwitchRadioGroup.vue';
import BaseButton from '@/components/button/BaseButton.vue';
export default {
  name: 'Users',
  components: {
    Header,
    BaseInput,
    SwitchRadioGroup,
    BaseButton,
  },
  data() {
    return {
      snackbar: false,
      errorMessage: '',
      snackbarColor: 'pink',
      fetchedData: false,
      isLoading: true,
      editUserDialog: false,
      removeUserDialog: false,
      userDetails: {
        id: null,
        modelTitle: '',
        name: '',
        family: '',
        email: '',
        password: '',
        description: '',
        active: '',
        admin: null,
      },
      userStatus: [
        { title: 'Active', value: 'true' },
        { title: 'Deactive', value: 'false' },
      ],
      headers: [
        {
          text: 'USERNAME',
          align: 'start',
          sortable: true,
          value: 'email',
        },
        { text: 'NAME', value: 'firstName' },
        { text: 'FAMILY', value: 'lastName' },
        { text: 'DESCRIPTION', value: 'description' },
        { text: 'STATE', value: 'active' },
        { text: '', value: 'action' },
      ],
      desserts: null,
      queuelist: null,
    };
  },
  computed: {
    // projectConfig() {
    //   return this.$store.state?.config;
    // },
  },
  created() {
    this.queueList();
  },
  methods: {
    queueList() {
      this.$api.admin.fetchUsersList().then((result) => {
        this.desserts = result;
        this.queuelist = result;
        this.fetchedData = true;
        this.isLoading = false;
      });
    },
    edituser(details) {
      console.log(details, 'deeee');
      this.userDetails.modelTitle = 'Edit User';
      this.userDetails.id = details.id;
      this.userDetails.name = details.firstName;
      this.userDetails.family = details.lastName;
      this.userDetails.email = details.email;
      this.userDetails.description = details.description;
      this.userDetails.active = details.active;
      this.userDetails.admin = details.admin;
      this.editUserDialog = true;
    },
    addUser() {
      this.userDetails.modelTitle = 'New User';
      this.userDetails.id = 0;
      this.userDetails.name = '';
      this.userDetails.family = '';
      this.userDetails.email = '';
      this.userDetails.active = true;
      this.userDetails.password = '';
      this.userDetails.description = '';
      this.userDetails.admin = true;
      this.editUserDialog = true;
    },
    removeUserModal(details) {
      this.userDetails.id = details.id;
      this.removeUserDialog = true;
    },
    changeUserStatus(value) {
      this.userDetails.active = value === 0 ? true : false;
    },
    changeAdminStatus(value) {
      this.userDetails.admin = value === 0 ? true : false;
    },
    changeUserInfo(e) {
      e.preventDefault();
      this.userDetails[e.target.name] = e.target.value;
    },
    submitEditUser() {
      if (this.userDetails.modelTitle === 'New User') {
        this.$api.admin
          .createUsers({
            firstName: this.userDetails.name,
            lastName: this.userDetails.family,
            email: this.userDetails.email,
            description: this.userDetails.description,
            active: this.userDetails.active,
            password: this.userDetails.password,
            admin: this.userDetails.admin,
          })
          .then(() => {
            this.editUserDialog = false;
            this.errorMessage = `${this.userDetails.name} ${this.userDetails.family} created successfully`;
            this.snackbarColor = 'green';
            this.snackbar = true;
            this.isLoading = true;
            this.queueList();
          });
      } else {
        this.$api.admin
          .updateUser(this.userDetails.id, {
            id: this.userDetails.id,
            firstName: this.userDetails.name,
            lastName: this.userDetails.family,
            email: this.userDetails.email,
            description: this.userDetails.description,
            active: this.userDetails.active,
            admin: this.userDetails.admin,
          })
          .then(() => {
            this.editUserDialog = false;
            this.errorMessage = `${this.userDetails.name} ${this.userDetails.family} info update successfully`;
            this.snackbarColor = 'green';
            this.snackbar = true;
            this.isLoading = true;
            this.queueList();
          });
      }
    },
    removeUser() {
      console.log('click');
      this.$api.admin.deleteUser(this.userDetails.id).then(() => {
        this.removeUserDialog = false;
        this.errorMessage = `${this.userDetails.name} ${this.userDetails.family} removed successfully`;
        this.snackbarColor = 'green';
        this.snackbar = true;
        this.isLoading = true;
        this.queueList();
      });
    },
    search(value) {
      let list = this.desserts;
      const store = this.queuelist;
      if (value) {
        const result = list.filter((user) => {
          return (
            user.email.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            user.lastName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            user.firstName.toLowerCase().indexOf(value.toLowerCase()) !== -1
          );
        });
        this.desserts = result;
      } else {
        this.desserts = store;
      }
    },
  },
};
</script>

<template>
  <div class="h-1-1 Users">
    <Header />
    <!-- <form class="CreateProject__body h-1-1" @change="changeValues">
      <SideBar />
      <v-main class="CreateProject__simulator">
        <Simulator />
      </v-main>
    </form> -->
    <v-card :loading="isLoading" elevation="0" class="p-x-5 Users__header">
      <div class="d-flex jc-between">
        <div class="d-flex">
          <RouterLink
            to="/admin/queue"
            class="d-flex ai-start p-y-3 Users__header-item"
          >
            <VIcon class="Users__header-item-icon">$paper</VIcon>
            <span class="font-16-24 g-50 fw-500 Users__header-item-title">
              Rendering Queue
            </span>
          </RouterLink>
          <RouterLink
            to="/admin/users"
            class="d-flex ai-start p-y-3 m-l-3 Users__header-item"
          >
            <VIcon class="Users__header-item-icon">$user</VIcon>
            <span class="font-16-24 g-50 fw-500 Users__header-item-title">
              Users
            </span>
          </RouterLink>
          <RouterLink
            to="/admin/templates"
            class="d-flex ai-start p-y-3 m-l-3 Users__header-item"
          >
            <VIcon class="Users__header-item-icon">$template</VIcon>
            <span class="font-16-24 g-50 fw-500 Users__header-item-title">
              Templates
            </span>
          </RouterLink>
        </div>
        <div class="d-flex ai-center">
          <BaseInput
            placeholder="Search"
            name="search"
            class="d-flex ai-center m-b-1"
            @changed="search"
          />
          <div class="m-l-3" @click="addUser">
            <BaseButton
              class="bg-primary Users__btn--white w-1-1"
              text="+ New User"
              size="small"
            />
          </div>
        </div>
      </div>
    </v-card>
    <v-data-table
      v-if="fetchedData"
      :headers="headers"
      :items="desserts"
      :hide-default-footer="true"
    >
      <template v-slot:item.active="{ item }">
        <v-chip
          :class="[
            `Users__status Users__status--${
              item.active ? 'active' : 'deactive'
            }`,
          ]"
          dark
        >
          {{ item.active ? 'Active' : 'Deactive' }}
        </v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-menu rounded="lg" bottom left>
          <template v-slot:activator="{ attrs, on }">
            <div v-bind="attrs" v-on="on">
              <VIcon color="grey" dark>...</VIcon>
            </div>
          </template>
          <v-list>
            <v-list-item @click="edituser(item)">
              <v-list-item-title>
                <span class="g-65 font-14-24 fw-500">Edite</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="removeUserModal(item)">
              <v-list-item-title>
                <span class="g-65 font-14-24 fw-500">Remove</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <v-dialog v-model="editUserDialog" width="550" height="600">
      <form @change="changeUserInfo">
        <div class="d-flex ai-center jc-between p-y-2 p-x-3 bg-white">
          <p class="font-20-32 g-100 fw-600">{{ userDetails.modelTitle }}</p>
          <div class="pointer" @click="editUserDialog = false">
            <VIcon dark>$cross</VIcon>
          </div>
        </div>
        <hr />
        <div
          v-if="editUserDialog"
          class="d-flex flex-col p-y-3 p-x-4 bg-white w-1-1"
        >
          <BaseInput
            label="Email"
            name="email"
            :default="userDetails.email"
            class="w-1-1"
          />
          <div class="d-flex w-1-1 m-y-3">
            <BaseInput
              label="Name"
              name="name"
              :default="userDetails.name"
              class="w-1-2 m-r-2"
            />
            <BaseInput
              label="Family"
              name="family"
              :default="userDetails.family"
              class="w-1-2"
            />
          </div>
          <div
            v-if="userDetails.modelTitle === 'New User'"
            class="d-flex w-1-1 m-b-3"
          >
            <BaseInput label="Password" name="password" class="w-1-1" />
          </div>
          <p class="font-14-24 g-100 m-b-1">Description</p>
          <v-textarea
            solo
            class="Users__description"
            name="description"
            label="Description"
            :value="userDetails.description"
          ></v-textarea>
          <div class="d-flex jc-between ai-center m-y-3">
            <p class="font-14-24 g-100 m-0">State</p>
            <SwitchRadioGroup
              :selected="userDetails.active ? 0 : 1"
              :items="userStatus"
              @clicked="changeUserStatus"
            />
          </div>
          <div class="d-flex jc-between ai-center m-y-3">
            <p class="font-14-24 g-100 m-0">Admin State</p>
            <SwitchRadioGroup
              :selected="userDetails.admin ? 0 : 1"
              :items="userStatus"
              @clicked="changeAdminStatus"
            />
          </div>
        </div>
        <hr />
        <div class="d-flex jc-between ai-center p-y-1-5 p-x-2 bg-white">
          <div class="w-1-3" @click.prevent="editUserDialog = false">
            <BaseButton
              class="bg-white Users__btn-cancel w-1-1"
              text="Cancel"
              size="small"
            />
          </div>
          <div class="w-1-3" @click.prevent="submitEditUser">
            <BaseButton
              class="bg-primary Users__btn--white w-1-1"
              text="Apply"
              size="small"
            />
          </div>
        </div>
      </form>
    </v-dialog>
    <v-dialog v-model="removeUserDialog" width="550" height="600">
      <div>
        <div class="bg-white d-flex flex-col p-t-3 p-b-4 ai-center">
          <VIcon size="80" dark>$remove</VIcon>
          <p class="m-t-4 font-20-32 g-100 fw-600">Remove User</p>
          <p class="m-t-1 font-14-24 g-100">
            Are you sure about removing this user?
          </p>
          <p class="m-t-1 font-14-24 Users__account">
            {{ userDetails.name }} {{ userDetails.family }}
          </p>
        </div>
        <hr />
        <div class="d-flex jc-between ai-center p-y-1-5 p-x-2 bg-white">
          <div class="w-1-3" @click.prevent="removeUserDialog = false">
            <BaseButton
              class="bg-white Users__btn-cancel w-1-1"
              text="Cancel"
              size="small"
            />
          </div>
          <div class="w-1-3" @click.prevent="removeUser">
            <BaseButton
              class="bg-error Users__btn--white w-1-1"
              text="Remove"
              size="small"
            />
          </div>
        </div>
      </div>
    </v-dialog>
    <v-snackbar v-model="snackbar" right multi-line>
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbarColor"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';
.Users {
  background-color: $background;

  @include e(description) {
    .v-input__slot {
      border-radius: 5px;
      border: solid 1px $dark-blue-20;
    }
  }

  @include e(header) {
    background-color: $background !important;
    border-bottom: 1px solid $dark-blue-10;

    &-item {
      width: fit-content;
    }
  }

  @include e(account) {
    color: $primary-blue-100;
  }

  @include e(btn) {
    &-cancel {
      background-color: $white !important;
      border: 1px solid $dark-blue-20;
      color: $gray-100;
    }

    @include m(white) {
      color: $white;
    }
  }

  @include e(status) {
    max-height: 24px;
    padding: 2px 16px;
    border-radius: 12px;
    color: $white;

    @include m(active) {
      background-color: $success !important;
    }

    @include m(deactive) {
      background-color: $dark-blue-05 !important;
      color: $gray-65 !important;
    }
  }

  .router-link-active {
    border-bottom: 2px solid $primary-blue-100;

    .Users__header-item-title {
      color: $gray-100 !important;
    }

    .Users__header-item-icon {
      > svg > path {
        fill: $gray-100 !important;
      }
    }
  }
}

::v-deep .BaseInput[name='search'] {
  background-color: $white;
  min-width: 300px;
}

::v-deep .v-data-table-header {
  background-color: $background !important;
  th:first-child {
    padding-left: 40px;
  }

  th:last-child {
    padding-right: 40px;
  }

  th > span {
    font-size: 14px;
    line-height: 16px;
    color: $gray-50;
    font-weight: 500;
  }
}

::v-deep .v-data-table__wrapper {
  tbody > tr {
    td:first-child {
      padding-left: 40px;
    }

    td:last-child {
      padding-right: 40px;
    }

    td {
      font-size: 14px;
      line-height: 16px;
      color: $gray-100;
      font-weight: 500;
    }
  }
}
</style>
