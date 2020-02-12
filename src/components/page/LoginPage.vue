<template lang="html">
  <v-app style="background-color:#EEEEEE">
  <div class="bg">
    <!-- <my-nav/> -->
    <v-container fill-height class="widthfull">
      <v-layout align-center row wrap>
        <v-flex xs12 sm6 md4 offset-sm1 offset-md1>
          <!-- <v-card class="elevation-12"> -->
          <div class="display-2 text-lg-center">
            INTERNET BYOD
          </div>
          <div class="display-1 text-lg-center mt-4">
            ระบบลงทะเบียนอุปกรณ์
          </div>

        </v-flex>
        <v-flex xs12 sm4 md4 offset-sm1 offset-md1>
          <div><login-form/></div>
        </v-flex>
        <!-- <v-flex  xs12 sm4 md4 offset-sm1 pt-0 offset-md3>
         <v-textarea
           outline
           name=""
           label="หมายเหตุ"
           value="หมายเหตุ 1 2 3 4 5 6"
         ></v-textarea>
       </v-flex> -->
      </v-layout>
    </v-container>
    <!-- <my-footer/> -->
</div>
  </v-app>
</template>

<script>
import Login from '@/components/authen/Login'
// import Footer from '@/components/index/Footer'
// import Navbar from '@/components/index/Navbar'
export default {
  components: {
    'login-form': Login,
    // 'my-footer': Footer,
    // 'my-nav': Navbar
  },

}
</script>

<style lang="css" scoped>
.op{
  opacity: 0.7;
}
.bg {
  background-image: url('../../assets/computer.jpg');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
