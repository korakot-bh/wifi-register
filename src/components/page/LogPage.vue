<template lang="html">
  <v-app style="background-color:#EEEEEE">
  <div class="bg">
    <my-nav/>
    <v-container>
      <!-- <v-container fill-height class="widthfull"> -->

      <v-layout>

        <v-flex>
          <!-- <div><user-manage-form/></div> -->
          <div><Log-form/></div>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <my-footer/> -->
</div>
  </v-app>
</template>

<script>
import Log from '@/components/admin/Log'
// import UserDeviceManage from '@/components/admin/UserDeviceManage'
// import Footer from '@/components/index/Footer'
import Navbar from '@/components/index/Navbar'
export default {
  components: {
    // 'user-manage-form': UserDeviceManage,
    'Log-form': Log,
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
