<template lang="html">
  <div>
    <v-container>
        <v-layout row wrap>
          <!-- <v-flex xs12 md7>
            <v-subheader class="title font-weight-light">ชื่อ : {{user.name}} {{user.lastname}}
            </v-subheader>
          </v-flex>
          <v-flex xs12 md5>
            <v-subheader class="title font-weight-light">รหัส : {{user.emp_code}}
            </v-subheader>
          </v-flex>
          <v-flex xs12 md7>
            <v-subheader class="title font-weight-light">แผนก : {{user.department}}
            </v-subheader>
          </v-flex> -->
          <!-- <v-flex xs5>
            <v-btn color="primary" @click="mac(), GetMac()">text</v-btn>
          </v-flex> -->
        </v-layout>
    </v-container>
    <v-spacer></v-spacer>
    <!-- {{myDevices}} -->
    <v-flex md12 v-for="item in myDevices" :key="item.id">
      <v-container grid-list-xs,sm,md,lg,xl>
      <v-card :color="item.color" class="elevation-1">
        <v-layout row wrap>
          <v-layout column wrap justify-center>
            <v-flex md3 d-flex>
              <v-card :color="item.color" class="elevation-0">
                <v-card-text>
                  <v-layout row wrap justify-center>
                    <v-icon dark size="80px">{{item.icon}}</v-icon>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-flex md9>
            <v-card class="elevation-0">
              <v-card-text>
                <v-form>
                  <v-layout row wrap>
                    <v-flex xs12 md7>
                      <v-subheader class="title font-weight-light">ชื่อ : {{user.name}} {{user.lastname}}
                      <!-- <v-text-area>{{name}}</v-text-area> -->
                      </v-subheader>
                    </v-flex>
                    <v-flex xs12 md5>
                      <v-subheader class="title font-weight-light">รหัส : {{user.emp_code}}
                      <!-- <v-text-area></v-text-area> -->
                      </v-subheader>
                    </v-flex>
                    <v-flex xs12 md12>

                      <v-subheader class="title font-weight-thin.font-italic">แผนก : {{user.department}}
                      <!-- <v-text-area></v-text-area> -->
                      </v-subheader>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex md3 xs4 sm2>
                      <v-subheader><h4>Brand :</h4></v-subheader>
                    </v-flex>
                    <v-flex md3 xs8 sm4>
                      <v-subheader>{{item.brand_name}}</v-subheader>
                    </v-flex>
                    <v-flex md3 xs4 sm2>
                      <v-subheader><h4>Model :</h4></v-subheader>
                    </v-flex>
                    <v-flex md3 xs8 sm4>
                      <v-subheader>{{item.model_name}}</v-subheader>
                    </v-flex>
                    <v-flex md3 xs5 sm3>
                      <v-subheader><h4>OS Name :</h4></v-subheader>
                    </v-flex>
                    <v-flex md3 xs7 sm3>
                      <v-subheader>{{item.os_name}}</v-subheader>
                    </v-flex>
                    <v-flex md3 xs6 sm3>
                      <v-subheader><h4>OS Version :</h4></v-subheader>
                    </v-flex>
                    <v-flex md3 xs6 sm3>
                      <v-subheader>{{item.os_version}}</v-subheader>
                    </v-flex>
                    <v-flex md3 xs7 sm3>
                      <v-subheader><h4>Serial Number :</h4></v-subheader>
                    </v-flex>
                    <v-flex md8 xs5 sm9>
                      <v-subheader>{{item.serial_number}}</v-subheader>
                    </v-flex>
                    <v-flex md3 xs7 sm3>
                      <v-subheader><h4>MAC Address :</h4></v-subheader>
                    </v-flex>
                    <v-flex md8 xs5 sm9>
                      <v-subheader>{{item.mac_address}}</v-subheader>
                    </v-flex>
                    <v-flex md3 xs7 sm3>
                      <v-subheader xs4><h4>Register Date :</h4></v-subheader>
                    </v-flex>
                    <v-flex md5 xs5 sm9>
                      <v-subheader>{{FormatDate(item.start_date)}}</v-subheader>
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="">
                      <v-subheader xs4><h4>Accessible</h4>
                        <v-icon v-if="item.wifi_accessible === 1" class="ml-3" color="success">check_circle</v-icon>
                        <v-icon v-else class="ml-3" color="black-grey">remove_circle</v-icon>
                        <v-spacer></v-spacer>

                      </v-subheader>
                        <v-btn color="red accent-2" dark class="right" icon @click="TerminateDevice(item) " ><v-icon>delete</v-icon></v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    </v-flex>
</div>
</template>

<script>
// import macaddress from 'macaddress'
import ClientJS from 'clientjs'
import {Decode} from '@/service'
import moment from 'moment'

export default {
  data () {
    return {
      updateLoading: false,
      user: null,
      addLoading: false,
      macLoading: false,
      devices: ['Mobile', 'Tablet', 'PC/Laptop'],
      selectDevice: '',
      myDevices: [],
      myMac: '',
      name: '',
      dialog: false,
      menuRequest: '',
      date: new Date().toISOString().substr(0, 10),
      // requestTest: this.formatDate(new Date()),
      osName: '',
      osVersion: '',
      macAddress: '',
      myMacadd: '',
      Model: '',
      SerialNumber: '',
      brandName: '',
      showImei: false,
      device: '',
      ImeiNumber: '',
    }
  },
  created() {
    this.mac()
    this.GetUser()
  },
  methods: {
    GetUser() {
      this.user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
    },
    GetMac() {
      // var user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
      this.axios.get(process.env.VUE_APP_API + '/get_device/mac/' + this.myMac).then(response => {
        // var myMac = response.data
          this.myDevices = response.data
          for (var i = 0; i < this.myDevices.length; i++) {
            if (this.myDevices[i]['platform'] === 'Mobile') {
              this.myDevices[i]['icon'] = 'phone_iphone'
              this.myDevices[i]['color'] = '#5BC0BE'
            } else if (this.myDevices[i]['platform'] === 'Tablet') {
              this.myDevices[i]['icon']  = 'tablet'
              this.myDevices[i]['color'] = '#F2ED8C'
            } else {
              this.myDevices[i]['icon']  = 'laptop_mac'
              this.myDevices[i]['color'] = '#FDB4BF'
            }
          }
          console.log(this.myDevices)
        }).catch(err => {
          this.updateLoading = false
          console.log('Error', err.response)
          this.$swal({
            position: 'top-end',
            type: 'error',
            title: "CAN'T GET DEVICE'S INFORMATION.",
            text: 'TRY AGAIN.' + '(' + err + ')',
            showConfirmButton: false,
            timer: 3500,
            toast: true
          })
        })
    },
    mac() {
    this.axios.get(process.env.VUE_APP_API + '/getmac').then((response) => {
      this.myMac = response.data.mac_address
      console.log(this.myMac);
      this.GetMac()
      }
    ).catch(err => {
      console.log('Error', err.response)
    })
    },
    GetmyDevices(){
      var user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
      this.axios.get(process.env.VUE_APP_API + '/get_device/' + user.id).then((response) => {
        this.myDevices = response.data
        for (var i = 0; i < this.myDevices.length; i++) {
          if (this.myDevices[i]['platform'] === 'Mobile') {
            this.myDevices[i]['icon'] = 'phone_iphone'
            this.myDevices[i]['color'] = '#5BC0BE'
          } else if (this.myDevices[i]['platform'] === 'Tablet') {
            this.myDevices[i]['icon']  = 'tablet'
            this.myDevices[i]['color'] = '#F2ED8C'
          } else {
            this.myDevices[i]['icon']  = 'laptop_mac'
            this.myDevices[i]['color'] = '#FDB4BF'
          }
        }
        }
      ).catch(err => {
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
    TerminateDevice(item) {
      var data = {
        device_id: item.id,
        user_id: this.user.id
      }
      this.$swal({
        title: 'ต้องการลบอุปกรณ์ ?',
        type: 'warning',
        showCancelButton: true
      }).then(response => {
        if (response.value === true) {
          this.updateLoading = true
          this.axios.post(process.env.VUE_APP_API + '/terminate_device', {data}).then(response => {
            this.mac()
            this.$swal({
              position: 'top-end',
              type: 'success',
              title: "UPDATE SUCCESS.",
              showConfirmButton: false,
              timer: 3000,
              toast: true
            })
          }).catch(err => {
            this.updateLoading = false
            console.log('Error', err.response)
            this.$swal({
              position: 'top-end',
              type: 'error',
              title: "CAN'T UPDATE DEVICE.",
              text: 'TRY AGAIN.' + '(' + err + ')',
              showConfirmButton: false,
              timer: 3500,
              toast: true
            })
          })
        }
      })
    },
    FormatDate(inDate) {
      return moment(inDate).format('YYYY-MM-DD')
    }
  },
  computed: {
  },
  // watch: {
  //   selectDevice () {
  //     if (this.selectDevice === 'Mobile' || this.selectDevice === 'Tablet') {
  //       this.showImei = true
  //     } else {
  //       this.showImei = false
  //     }
  //   }
  // },
  // created () {
      // this.user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
      // console.log(this.user)
  // },
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
