<template lang="html">
  <v-app style="background-color:#EEEEEE">
  <div class="bg">
    <my-nav/>
    <v-container grid-list-xs fluid>
      <v-layout row>
        <v-flex xs12 md10 offset-md1>
          <div><manage-form/></div>
        </v-flex>
      </v-layout>
    </v-container>
</div>
  </v-app>
</template>

<script>
import ManageDevice from '@/components/admin/ManageDevice'
// import Footer from '@/components/index/Footer'
import Navbar from '@/components/index/Navbar'
export default {
  components: {
    'manage-form': ManageDevice,
    // 'my-footer': Footer,
    'my-nav': Navbar
  },
}
</script>

<style lang="css" scoped>
.op{
  opacity: 0;
}
.bg {
  background-image: url('../../assets/computer1.jpg');
  /* opacity: 0.5; */
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
