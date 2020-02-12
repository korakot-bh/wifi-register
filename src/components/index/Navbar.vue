<template>
  <div

      style="position: relative;"
    >
      <v-toolbar color="#FFFFFF">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="user.role_id !== 1"></v-toolbar-side-icon>
      <img class="logo" style="" src="@/assets/inetlogo.png">
        <!-- <v-toolbar-title color="grey">BYOD</v-toolbar-title> -->
        <v-spacer></v-spacer>
        <!-- <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn> -->
        <div class="body-2">    <!-- display user infomation -->
          <v-menu offset-y>
            <v-btn flat large class="px-2" slot="activator">
              <span>{{user.name}}</span>
              <span class="mr-1 ml-1">{{user.lastname}}</span>
              <v-avatar
              size="20px"
              class=""
              >
              <v-icon slot="activator">more_vert</v-icon>
              </v-avatar>
            </v-btn>
            <v-list class="pa-0">
              <v-list-tile>
                <v-list-tile-title>
                  <v-icon>account_circle</v-icon>
                  <span class="ml-3">
                    {{role}}
                  </span>
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="logout()">
                <v-list-tile-title>
                  <v-icon>lock</v-icon>
                  <span class="ml-3">
                    LOGOUT
                  </span>
                </v-list-tile-title>
              </v-list-tile>

            </v-list>
          </v-menu>
        </div>

      </v-toolbar>
      <v-navigation-drawer v-model="drawer" temporary white app fixed>
        <v-list class="pa-2">
          <v-list-tile avatar>
            <v-list-tile-avatar color="grey lighten-2">
              <!-- <span style="color:black;"></span> -->
              <v-icon color="black">home</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>MENU</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile class="pa-2" v-for="item in items" :key="item.title" @click="gopage(item.link)">
            <v-list-tile-action>
              <v-icon medium>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="font" >
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>
      </div>
    </template>

<script>
import { Decode } from '@/service'
  export default {
    data () {
      return {
        isLogin: false,
        user: null,
        role: '',
        drawer: null,
        items: [
          {title: 'หน้าหลักอุปกรณ์', icon: 'person', link: '/AdminDevice'},
          {title: 'อุปกรณ์ของคุณ', icon: 'person', link: '/'},
          {title: 'จัดการอุปกรณ์', icon: 'desktop_windows', link: '/ManageDevice'},
          {title: 'จัดการผู้ใช้งาน', icon: 'supervisor_account', link: '/manage_user'},
          {title: 'LOG', icon: 'view_list', link: '/Log'},
        ]
      }
    },
    methods: {
      redirectTo (destination) {
        this.$root.redirectTo(destination)
      },
      gopage (link) {
        this.$router.push(link)
      },
      logout () {
        this.$cookies.remove('userToken')
        this.$router.push('/Login')
        this.$swal({
          position:'top-end',
          type:'success',
          title:'Logout success',
          showConfirmButton:false,
          timer:2000,
          toast: true
        })
      },

    },
    created () {
      if (!this.$cookies.isKey('userToken')) {
        this.$router.push('/login')
        this.isLogin = false
      } else {
        this.isLogin = true
        this.user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
        if (this.user.owner === true) {
          this.items.splice(0, 1)
        }
        if (this.user.role_id === 1) {
          this.role = "USER"
        } else if (this.user.role_id === 2) {
          this.role = "ADMIN"
        } else {
          this.role = "SUPER ADMIN"
        }
      }
    },
  }
</script>
<style lang="css">
.logo {
  width: 135px;
  height: 75px;
}
.font {
  font-size: 15px;
}
</style>
