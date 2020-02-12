<template lang="html">
  <v-app style="background-color:#EEEEEE">
  <div class="bg">
    <my-nav/>
    <v-container>
      <!-- <v-container fill-height class="widthfull"> -->

      <v-layout>

        <v-flex xs10 sm10 md9 offset-sm1 offset-xs1 offset-md1>
          <!-- <div><user-manage-form/></div> -->
          <div><device/></div>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <my-footer/> -->
</div>
  </v-app>
</template>

<script>
import Device from '@/components/user/Device'
// import UserDeviceManage from '@/components/admin/UserDeviceManage'
// import Footer from '@/components/index/Footer'
import Navbar from '@/components/index/Navbar'
export default {
  components: {
    // 'user-manage-form': UserDeviceManage,
    'device': Device,
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
