<template lang="html">
  <div>
    <div>
      <v-alert
      type="warning"
      :value="loginAlert"
      icon="warning"
      color="red"
      outline
      transition="scale-transition"
      >
      {{loginAlertMsg}}
    </v-alert>
  </div>
  <v-spacer></v-spacer>
  <v-form>
    <v-flex xs12 sm10 md10 class="mt-5">
      <v-text-field
      :disabled="loading"
      name="email"
      label="Email"
      id="email"
      ref="email"
      v-model="email"
      @keyup.enter="checkLogin()"
      required
      >
    </v-text-field>
    </v-flex>
    <v-flex xs12 sm8 md8>
  <v-text-field
    :disabled="loading"
    type="password"
    name="password"
    label="Password"
    id="password"
    ref="password"
    v-model="password"
    @keyup.enter="checkLogin()"
    required
    >
  </v-text-field>
</v-flex>
<v-spacer></v-spacer>
<v-flex xs12 sm8 md4 offset-md6>
  <v-btn outline  @click="checkLogin()" :disabled="loading">
    <div v-if="!loading">
      Login
    </div>
    <div v-else>
      <v-progress-circular indeterminate color="grey">
      </v-progress-circular>
    </div>
  </v-btn>
</v-flex>
</v-form>

<!-- <v-form>
    <v-layout row wrap>
      <v-flex xs12>
       <v-textarea
         outline
         name="input-7-4"
         label="Outline textarea"
         value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
       ></v-textarea>
     </v-flex>
      </v-layout>
</v-form> -->
</div>
</template>

<script>
import {Encode} from '@/service'
export default {
  data () {
    return {
      loading: false,
      loginAlertMsg: 'Invalid username and password!',
      loginAlert: false,
      isLogin: false,
      email: '',
      password: '',
      name: '',
      lastname: '',
    }
  },
  methods: {
    checkLogin () {
      var emailForm = false
      for (var i = 0; i < this.email.length; i++) {
        if (this.email[i] === '@'){
          emailForm = true
        }
      }
      if (!emailForm) {
        this.email += '@inet.co.th'
      }
      this.loading = true
      this.loginAlert = false
      this.axios.get(process.env.VUE_APP_API + '/login/' + this.email + '/' + this.password).then((response) => {
        var user = response.data
      if (response.status === 200){
        if (response.data['role_id'] === 2) { //admin
          this.axios.get(process.env.VUE_APP_API + '/check_admin_device/' + user.id).then(checkResponse => {
            this.loading = false
            this.$swal({
              position:'top-end',
              type:'success',
              title:'Login success',
              showConfirmButton:false,
              timer:2000,
              toast: true
            })
            if (checkResponse.data === true) {
              user.owner = true
              var emptoken = Encode.encode(user)
              this.$cookies.set('userToken', emptoken, null, '/', process.env.VUE_BASE_URL)
              this.$router.push('/')
            } else {
              user.owner = false
              var emptoken = Encode.encode(user)
              this.$cookies.set('userToken', emptoken, null, '/', process.env.VUE_BASE_URL)
              this.$router.push('/AdminDevice')
            }
          }).catch((err) => {
            this.loginAlert = true
            this.loginAlertMsg = "Can't get user's role information"
            this.loading = false
          })
        } else {
          this.$swal({
            position:'top-end',
            type:'success',
            title:'Login success',
            showConfirmButton:false,
            timer:2000,
            toast: true
          })
          user.owner = false
          var emptoken = Encode.encode(user)
          this.$cookies.set('userToken', emptoken, null, '/', process.env.VUE_BASE_URL)
          this.$router.push('/')
        }
      }
      }).catch((err) => {
        // console.log('Error', err.response)
         if(err.response.status === 400 || err.response.status === 404){
           this.loginAlert = true
           this.loginAlertMsg = 'Require Email/Password'
        } else if(err.response.status === 401){
          this.loginAlert = true
          this.loginAlertMsg = 'Incorrect Email or Password'
        } else {
          this.loginAlert = true
          this.loginAlertMsg = 'Internal Serve Error'
        }
        this.loading = false
      })

    },
  },
  computed: {

  },
  watch: {
    // userName () {
    //   this.loginAlert = false
    // },
    // password () {
    //   this.loginAlert = false
    // }
  }
}
</script>

<style lang="css">
.btn {
  padding-left: 19em
}
.text{
  padding-left: 19em
}
</style>
