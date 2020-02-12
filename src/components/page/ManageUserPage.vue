<template lang="html">
  <v-app style="background-color:#EEEEEE">
  <div class="bg">
    <my-nav/>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <div><manage-form/></div>
        </v-flex>
      </v-layout>
    </v-container>
</div>
  </v-app>
</template>

<script>
import ManageUser from '@/components/admin/ManageUser'
// import Footer from '@/components/index/Footer'
import Navbar from '@/components/index/Navbar'
export default {
  components: {
    'manage-form': ManageUser,
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
