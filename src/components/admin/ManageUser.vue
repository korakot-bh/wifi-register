<template lang="html">
  <div>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <v-icon large class="mt-3 mr-5 ml-1">supervisor_account</v-icon><v-toolbar-title class="mt-3 ml-0">Manage Users</v-toolbar-title>
              <div class="mt-3 ml-2">
                <v-chip small @click="setRoleColor('user')" :color="roleColor.user.color" :class="roleColor.user.font">USER</v-chip>
                <v-chip small @click="setRoleColor('admin')" :color="roleColor.admin.color" :class="roleColor.admin.font">ADMIN</v-chip>
                <v-chip small @click="setRoleColor('superAdmin')" :color="roleColor.superAdmin.color" :class="roleColor.superAdmin.font">SUPER ADMIN</v-chip>
              </div>
              <v-spacer></v-spacer>
              <v-progress-circular indeterminate size="25" class="mr-3 mt-4" color="primary" v-if="loading"></v-progress-circular>
              <v-flex xs3>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-flex>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="filteredUsers"
              :rows-per-page-items="[10,50,100,{'text':'$vuetify.dataIterator.rowsPerPageAll','value':-1}]"
              :search="search"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{props.item.no}}</td>
                <td class="text-xs-center">{{props.item.emp_code}}</td>
                <td class="text-xs-center">{{props.item.fullname}}</td>
                <td class="text-xs-center">{{props.item.email}}</td>
                <!-- <td class="text-xs-center">{{props.item.role}}</td> -->
                <td class="text-xs-center">
                  <v-chip v-if="props.item.role_id === 1" color="blue-grey" disabled class="white--text" small>USER</v-chip>
                  <v-chip v-else-if="props.item.role_id === 2"color="success" disabled class="white--text" small>ADMIN</v-chip>
                  <v-chip v-else color="amber accent-4" disabled class="white--text" small>SUPER ADMIN</v-chip>
                </td>
                <td class="text-xs-center">{{FormatDate(props.item.create_date)}}</td>
                <td class="text-xs-center"><v-btn color="primary" icon small flat v-if="!props.item.self" @click="editRole(props.item)"><v-icon small>edit</v-icon></v-btn></td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
        <v-dialog
          v-model="editRoleDialog"
          max-width="300px"
          transition="dialog-transition"
        >
          <v-card>
            <v-card-title primary-title class="subheading">
              EDIT USER ROLE
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs4 text-xs-center>
                  <span>{{selectCode}}</span>
                </v-flex>
                <v-flex xs8 text-xs-center>
                  <span>{{selectName}}</span>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs5 text-xs-center>
                  <span>Current role:</span>
                  <div class="">
                    <v-chip v-if="selectID === 1" color="blue-grey" disabled class="white--text" small>USER</v-chip>
                    <v-chip v-else-if="selectID === 2"color="success" disabled class="white--text" small>ADMIN</v-chip>
                    <v-chip v-else color="amber accent-4" disabled class="white--text" small>SUPER ADMIN</v-chip>
                  </div>
                </v-flex>
                <v-flex xs2 text-xs-center>
                  <span>></span>
                </v-flex>
                <v-flex xs5 text-xs-center>
                  <span>New role:</span>
                  <div class="">
                    <v-chip v-if="selectID === 1" color="blue-grey" disabled class="white--text" small>USER</v-chip>
                    <v-chip v-else-if="selectID === 2"color="success" disabled class="white--text" small>ADMIN</v-chip>
                    <v-chip v-else color="amber accent-4" disabled class="white--text" small>SUPER ADMIN</v-chip>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-text>
              <v-select
                :items="roles"
                v-model="selectRole"
                item-text="role_name"
                item-value="id"
                label="Select Role"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" flat @click="editRoleDialog = false">CANCEL</v-btn>
              <v-btn color="primary" flat>SAVE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {Decode} from '@/service'
import moment from 'moment'
export default {
  data () {
    return {
      editRoleDialog: false,
      filters: {
        role_id: []
      },
      loading: false,
      search: '',
      users: [],
      selectCode: '',
      selectName: '',
      selectID: '',
      selectRole: '',
      roles: [],
      headers: [
        {
          text: 'No',
          align: 'center',
          value: 'no'
        },
        {
          text: 'รหัสพนักงาน',
          align: 'center',
          value: 'emp_code'
        },
        {
          text: 'ชื่อ - นามสกุล',
          align: 'center',
          value: 'fullname'
        },
        {
          text: 'E-mail',
          align: 'center',
          value: 'email'
        },
        {
          text: 'ตำแหน่ง',
          align: 'center',
          value: 'role',
          sortable: false
        },
        {
          text: 'วันที่เข้าใช้ระบบ',
          align: 'center',
          value: 'create_date'
        },
        {
          text: 'Action',
          align: 'center',
          value: 'action',
          sortable: false
        }
      ],
      roleColor: {
        user: {
          color: '',
          font: ''
        },
        admin: {
          color: '',
          font: ''
        },
        superAdmin: {
          color: '',
          font: ''
        }
      }
    }
  },
  created() {
    this.GetAllUsers()
    this.GetUsersRole()
  },
  computed: {
    filteredUsers() {
      return this.users.filter(d => {
        return Object.keys(this.filters).every(f => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f])
        })
      })
    }
  },
  methods: {
    editRole(item){
      this.editRoleDialog = true
      this.selectRole = item.role_id
      this.selectName = item.fullname
      this.selectCode = item.emp_code
      this.selectID = item.role_id
    },
    GetUsersRole() {
        this.axios.get(process.env.VUE_APP_API + '/get_user_role').then(response => {
          this.roles = response.data
        }).catch(err => {
          this.loading = false
          console.log('Error', err.response)
          this.$swal({
            position: 'bottom-end',
            type: 'error',
            title: "CAN'T LOAD USER's ROLE.",
            text: 'TRY AGAIN.' + '(' + err + ')',
            showConfirmButton: false,
            timer: 3500,
            toast: true
          })
        })
    },
    GetAllUsers(){
      var user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
      this.loading = true
      this.axios.get(process.env.VUE_APP_API + '/get_all_users').then((response) => {
        this.loading = false
        this.users = response.data
        for (var i = 0; i < this.users.length; i++) {
          this.users[i]['no'] = i + 1
          this.users[i]['fullname'] = this.users[i]['name'] + ' ' + this.users[i]['lastname']
          if (this.users[i]['role_id'] === 1) {
            this.users[i]['role'] = 'User'
          } else if (this.users[i]['role_id'] === 2) {
            this.users[i]['role'] = 'Admin'
          } else {
            this.users[i]['role'] = 'Super Admin'
          }
          if (user.id === this.users[i]['id']) {
            this.users[i]['self'] = true
          } else {
            this.users[i]['self'] = false
          }
        }
      }
    ).catch(err => {
      this.loading = false
      console.log('Error', err.response)
      this.$swal({
        position: 'bottom-end',
        type: 'error',
        title: "CAN'T LOAD DEVICE FROM SERVER.",
        text: 'TRY AGAIN.' + '(' + err + ')',
        showConfirmButton: false,
        timer: 3500,
        toast: true
      })
    })
  },
  FormatDate(inDate) {
    return moment(inDate).format('DD-MM-YYYY')
  },
  setRoleColor(role) {
    if (role === 'user') {
      if (this.roleColor.user.color === '') {
        this.roleColor.user.color = 'blue-grey'
        this.roleColor.user.font = 'white--text'
        this.filters.role_id.push(1)
      } else {
        this.roleColor.user.color = ''
        this.roleColor.user.font = ''
        this.filters.role_id.splice(this.filters.role_id.indexOf(1), 1)
      }
    } else if (role === 'admin') {
      if (this.roleColor.admin.color === '') {
        this.roleColor.admin.color = 'success'
        this.roleColor.admin.font = 'white--text'
        this.filters.role_id.push(2)
      } else {
        this.roleColor.admin.color = ''
        this.roleColor.admin.font = ''
        this.filters.role_id.splice(this.filters.role_id.indexOf(2), 1)
      }
    } else {
      if (this.roleColor.superAdmin.color === '') {
        this.roleColor.superAdmin.color = 'amber accent-4'
        this.roleColor.superAdmin.font = 'white--text'
        this.filters.role_id.push(3)
      } else {
        this.roleColor.superAdmin.color = ''
        this.roleColor.superAdmin.font = ''
        this.filters.role_id.splice(this.filters.role_id.indexOf(3), 1)
      }
    }
  }
}
}
</script>

<style lang="css">
</style>
