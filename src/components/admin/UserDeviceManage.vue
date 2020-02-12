<template lang="html">
  <div>
    <v-container>
        <v-layout row wrap>
          <v-flex xs7 md7>
            <v-subheader class="title font-weight-light">ชื่อ USER :
            <v-text-area></v-text-area>
            </v-subheader>
          </v-flex>
          <v-flex xs5 md5>
            <v-subheader class="title font-weight-light">รหัส :
            <v-text-area></v-text-area>
            </v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-subheader class="title font-weight-light">แผนก :
            <v-text-area></v-text-area>
            </v-subheader>
          </v-flex>
          <v-flex xs5>
            <v-subheader class="title font-weight-light">สังกัด :
            <v-text-area></v-text-area>
            </v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-subheader class="title font-weight-light">อื่นๆ :
            <v-text-area></v-text-area>
            </v-subheader>
          </v-flex>

          <!-- <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary lighten-2" dark v-on="on">
                    NEW DEVICE
                  </v-btn>
                </template>

                <v-card class="set_card">
                  <v-card-title
                    class="primary lighten-2"
                    primary-title
                  >
                    NEW DEVICE
                  </v-card-title>

                  <v-card-text>
                    TEST
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      flat
                      @click="dialog = false"
                    >
                      save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
        </v-layout>
      <!-- </v-card> -->
    </v-container>

    <v-spacer></v-spacer>
    <v-flex xs12>

<!-- style="border-radius: 0.9em" -->

<v-card>
  <v-layout row wrap>
    <v-flex d-flex xs3>
      <v-card color="pink lighten-3 set_card">
        <v-form>
          <v-card-title primary-title class="headline dark--text">
            <v-layout row justify-center class="mt-4 pt-4 pl-0">
              <v-icon dark size="80px">laptop_mac</v-icon>
            </v-layout>
          </v-card-title>
        </v-form>
      </v-card>
    </v-flex>
   <v-flex xs8>
     <v-card class="white-08opa set_card elevation-0">
       <v-form>
         <v-layout row>
           <v-flex xs12 md4 class="mt-3 ml-5">
             <v-subheader>NAME :</v-subheader>
           </v-flex>
           <v-flex xs12 md8 class="mr-5">
             <v-text-field
             ></v-text-field>
           </v-flex>
         </v-layout>
         <v-layout row>
           <v-flex xs12 md4 class="mt-3 ml-5">
             <v-subheader>MAC Address :</v-subheader>
           </v-flex>
           <v-flex xs12 md8 class="mr-5">
             <v-text-field
             ></v-text-field>
           </v-flex>
         </v-layout>
         <v-layout row>
           <v-flex xs12 md2 class="mt-3 ml-5 mb-4">
             <v-subheader>รุ่น :</v-subheader>
           </v-flex>
           <v-flex xs12 md3 class="mr-1">
             <v-text-field
             ></v-text-field>
           </v-flex>
           <v-flex xs12 md3 class="mt-3 ml-1">
             <v-subheader>วันที่ลงทะเบียน :</v-subheader>
           </v-flex>
           <v-flex xs12 md3 class="mr-5">
             <v-text-field
             ></v-text-field>
           </v-flex>
         </v-layout>
       </v-form>
     </v-card>
   </v-flex>
   <v-flex xs1 class="mt-5 pt-4 pr-4">
     <v-layout row justify-center >
       <!-- <v-btn> -->
         <v-icon size="50px" color="red" @click="deleteItem(props.item)" >delete_forever</v-icon>
       <!-- </v-btn> -->
     </v-layout>
   </v-flex>
 </v-layout>
</v-card>


<v-card class="mt-5 set_card">
  <v-layout row wrap>
    <v-flex d-flex xs3 >
      <v-card  color="teal lighten-3 set_card">
        <v-form>
          <v-card-title primary-title class="headline dark--text">
            <v-layout row justify-center class="mt-4 pl-0 pt-4">
              <v-icon dark size="80px">phone_iphone</v-icon>
            </v-layout>
          </v-card-title>
        </v-form>
      </v-card>
    </v-flex>
   <v-flex xs8>
     <v-card class="white-08opa set_card elevation-0">
       <v-form>
         <v-layout row>
           <v-flex xs4 class="mt-3 ml-5">
             <v-subheader>NAME :</v-subheader>
           </v-flex>
           <v-flex xs8 class="mr-5">
             <v-text-field
             ></v-text-field>
           </v-flex>
         </v-layout>
         <v-layout row>
           <v-flex xs4 class="mt-3 ml-5">
             <v-subheader>MAC Address :</v-subheader>
           </v-flex>
           <v-flex xs8 class="mr-5">
             <v-text-field
             ></v-text-field>
           </v-flex>
         </v-layout>
         <v-layout row>
           <v-flex xs2 class="mt-3 ml-5 mb-4">
             <v-subheader>รุ่น :</v-subheader>
           </v-flex>
           <v-flex xs3 class="mr-1">
             <v-text-field
             ></v-text-field>
           </v-flex>
           <v-flex xs3 class="mt-3 ml-1">
             <v-subheader>วันที่ลงทะเบียน :</v-subheader>
           </v-flex>
           <v-flex xs3 class="mr-5">
             <v-text-field
             ></v-text-field>
           </v-flex>
         </v-layout>
       </v-form>
     </v-card>
   </v-flex>
   <v-flex xs1 class="mt-5 pt-4 pr-4">
     <v-layout row justify-center >
       <!-- <v-btn icon size="50px"> -->
         <v-icon size="50px" @click="deleteItem(props.item)" color="red">delete_forever</v-icon>
       <!-- </v-btn> -->
     </v-layout>
   </v-flex>
 </v-layout>
</v-card>
  </v-flex>

</div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
      // loading: false,
      // loginAlertMsg: 'Invalid username and password!',
      // loginAlert: false,
      // isLogin: false,
      // userName: '',
      // password: ''
    }
  },
  methods: {

  },
  computed: {

  },
  watch: {

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
.white-08opa {
  background-color: rgba(255,255,255,0.8) !important;
}
.pic {


}
.set_card {
  border-radius: 0.5em;
}
</style>
