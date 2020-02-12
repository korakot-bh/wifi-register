<template lang="html">
  <div>
    <v-container>
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
          <v-flex xs12 md7>
            <v-subheader class="title font-weight-light">แผนก : {{user.department}}
            <!-- <v-text-area></v-text-area> -->
            </v-subheader>
          </v-flex>
          <!-- <v-flex xs9 md5>
            <v-subheader class="title font-weight-light">สังกัด :
            <v-text-area></v-text-area>
            </v-subheader>
          </v-flex> -->

          <v-dialog v-model="dialog" width="700" persistent>
                <template v-slot:activator="{ on }">
                  <v-btn @click="AddDeviceModal()" color="blue-grey" dark v-on="on">
                    NEW DEVICE
                  </v-btn>
                </template>
                <v-card class="set_card elevation-0">
                  <v-form ref="form">
                  <v-card-title primary-title>
                    <span class="headline" dark>NEW DEVICE</span>
                  </v-card-title>
                  <v-container grid-list-md>
                  <v-layout wrap>
                  <v-flex xs12 sm4 md3 class="mt-4 ml-3">
                    <v-select
                      :items="devices"
                      v-model="selectDevice"
                      label="Device"
                    ></v-select>
                   <!-- <v-select v-model="device['type']" :items="dropdown_icon" label="Device"></v-select> -->
                  </v-flex>
                  <v-flex xs12 sm4 md3 class="mt-4 ml-3">
                    <v-text-field
                    item-text="brandName"
                    item-value="brandName"
                    v-model="brandName"
                    label="Brand"
                    :rules="rules.brand"
                    ></v-text-field>
                    <!-- <v-select
                      :items="brandName"
                      v-model="selectbrand"
                      label="Brand"
                    ></v-select> -->
                   <!-- <v-text-field v-model="brandName" label="Brand"></v-text-field> -->
                  </v-flex>
                  <v-flex xs12 sm4 md4 class="mt-4 ml-3">
                    <v-text-field
                    item-text="Model"
                    item-value="Model"
                    v-model="Model"
                    label="Model"
                    :rules="rules.model"
                    ></v-text-field>
                   <!-- <v-text-field v-model="Model" label="Model"></v-text-field> -->
                  </v-flex>
                  <v-flex xs12 sm5 md5 class="mt-4 ml-3">
                   <v-text-field
                   v-model="osName"
                   label="OS Name"
                   item-text="osName"
                   item-value="osName"
                   :rules="rules.osName"
                   ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5 md5 class="mt-4 ml-3">
                   <v-text-field
                   v-model="osVersion"
                   label="OS Version"
                   item-text="osVersion"
                   item-value="osVersion"
                   :rules="rules.osVersion"
                   ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5 md5 class="mt-4 ml-3">
                   <v-text-field v-model="SerialNumber" label="Serial Number" :rules="rules.serialNo"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5 md5 class="mt-4 ml-3">
                   <v-text-field v-model="macAddress" label="Mac Address" disabled :loading="macLoading" :rules="rules.mac"></v-text-field>
                  </v-flex>
                  <v-layout row wrap v-if="showImei">
                    <v-flex xs12 sm11 md11 class="mt-4 ml-3">
                      <v-text-field
                      v-model="ImeiNumber"
                      label="Imei Number"
                      v-if="showImei"
                      :rules="rules.imei"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-flex xs12 sm5 md5 class="mt-4 ml-2 mr-5">
                 <v-menu ref="menuRequest" disabled lazy :close-on-content-click="true" v-model="menuRequest"
                 transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px"
                 :return-value.sync="date">
                 <v-text-field slot="activator" label="วันที่ลงทะเบียน" disabled v-model="date"
                 prepend-icon="event" readonly ></v-text-field>
               </v-menu>

                  </v-flex>
                  <!-- <v-flex xs12 sm6 md4>
                   <v-text-field v-model="editedItem.Type" label="Protein (g)"></v-text-field>
                  </v-flex> -->
                  </v-layout>
                  </v-container>
                  <!-- </v-card-text> -->
                  <!-- <v-divider></v-divider> -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error darken-1" flat :disabled="addLoading" @click="dialog = false, ClearAddForm()">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat :disabled="addLoading" :loading="addLoading" @click="SubmitAddDevice()">Save</v-btn>
                  </v-card-actions>
                </v-form>
                </v-card>
              </v-dialog>
        </v-layout>
      <!-- </v-card> -->
    </v-container>
    <v-spacer></v-spacer>

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
                    <!-- <v-flex xs12 md5>
                      <v-subheader>Brand : {{item.brand_name}}</v-subheader>
                    </v-flex>
                    <v-flex xs12 md7>
                      <v-subheader>Model : {{item.model_name}}</v-subheader>
                    </v-flex> -->
                    <v-flex md3 xs4 sm2>
                      <v-subheader><h4>Brand :</h4></v-subheader>
                    </v-flex>
                    <v-flex md3 xs8 sm4>
                      <v-subheader>{{item.brand_name}}</v-subheader>
                      <!-- <v-text-field
                      item-text="brandName"
                      item-value="brandName"
                      v-model="item.brand_name"
                      readonly
                      ></v-text-field> -->
                    </v-flex>
                    <v-flex md3 xs4 sm2>
                      <v-subheader><h4>Model :</h4></v-subheader>
                    </v-flex>
                    <v-flex md3 xs8 sm4>
                      <v-subheader>{{item.model_name}}</v-subheader>
                      <!-- <v-text-field
                      item-text="Model"
                      item-value="Model"
                      v-model="item.model_name"
                      readonly
                      ></v-text-field> -->
                    </v-flex>
                    <v-flex md3 xs5 sm3>
                      <v-subheader><h4>OS Name :</h4></v-subheader>
                    </v-flex>
                    <v-flex md3 xs7 sm3>
                      <v-subheader>{{item.os_name}}</v-subheader>
                      <!-- <v-text-field
                      v-model="item.os_name"
                      item-text="osName"
                      item-value="osName"
                      readonly
                      ></v-text-field> -->
                    </v-flex>
                    <v-flex md3 xs6 sm3>
                      <v-subheader><h4>OS Version :</h4></v-subheader>
                    </v-flex>
                    <v-flex md3 xs6 sm3>
                      <v-subheader>{{item.os_version}}</v-subheader>
                      <!-- <v-text-field
                      v-model="item.os_version"
                      item-text="osVersion"
                      item-value="osVersion"
                      readonly
                      ></v-text-field> -->
                    </v-flex>
                    <v-flex md3 xs7 sm3>
                      <v-subheader><h4>Serial Number :</h4></v-subheader>
                    </v-flex>
                    <v-flex md8 xs5 sm9>
                      <v-subheader>{{item.serial_number}}</v-subheader>
                      <!-- <v-text-field
                      v-model="item.serial_number"
                      ></v-text-field> -->
                    </v-flex>
                    <v-flex md3 xs7 sm3>
                      <v-subheader><h4>MAC Address :</h4></v-subheader>
                    </v-flex>
                    <v-flex md8 xs5 sm9>
                      <!-- <v-text-field
                      v-model="item.mac_address"
                      ></v-text-field> -->
                      <v-subheader>{{item.mac_address}}</v-subheader>
                    </v-flex>
                    <v-flex md3 xs7 sm3>
                      <v-subheader xs4><h4>Register Date :</h4></v-subheader>
                    </v-flex>
                    <v-flex md5 xs5 sm9>
                      <!-- <span>{{FormatDate(item.start_date)}}</span> -->
                      <v-subheader>{{FormatDate(item.start_date)}}</v-subheader>
                      <!-- <v-text-field
                      v-model="item.start_date"
                      item-text="date"
                      item-value="date"
                      readonly
                      ></v-text-field> -->
                    </v-flex>
                    <v-flex md4 sm12 xs12 class="">
                      <v-subheader xs4><h4>Accessible</h4>
                        <v-icon v-if="item.wifi_accessible === 1" class="ml-3" color="success">check_circle</v-icon>
                        <v-icon v-else class="ml-3" color="error">remove_circle</v-icon>
                        <v-spacer></v-spacer>
                        <!-- <v-btn color="red accent-2" dark class="right" icon><v-icon>delete</v-icon></v-btn> -->
                      </v-subheader>
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
      user: null,
      addLoading: false,
      macLoading: false,
      devices: ['Mobile', 'Tablet', 'PC/Laptop'],
      selectDevice: '',
      myDevices: [],
      name: '',
      dialog: false,
      menuRequest: '',
      date: new Date().toISOString().substr(0, 10),
      // requestTest: this.formatDate(new Date()),
      osName: '',
      osVersion: '',
      macAddress: '',
      Model: '',
      SerialNumber: '',
      brandName: '',
      showImei: false,
      device: '',
      ImeiNumber: '',
      // editedItem: {
      //   No: '',
      //   User: '',
      //   Device: '',
      //   version: '',
      //   macAddress: '',
      //   Date: ''
      // },
      dropdown_icon: [
        { text: 'Mobile' , value: 'Mobile' },
        { text: 'Computer', value: 'Computer'},
        { text: 'Tablet', value: 'Tablet'}
        // { text: 'delete', callback: () => console.log('delete') }
      ],
      rules:{
        brand:[
          v => !!v || 'กรุณาระบุยี่ห้อของอุปกรณ์ *(ex. Apple, Samsung, Asus, Dell, ..)'
        ],
        model:[
          v => !!v || 'กรุณาระบุรุ่นของอุปกรณ์ *(ex. Iphone X, Galaxy Note, ZenBook 13, Inspiron 14, ..)'
        ],
        osName:[
          v => !!v || 'กรุณาระบระบบปฏิบัติการของอุปกรณ์ (ex. Windows, Mac, iOS, Android, ..)'
        ],
        osVersion:[
          v => !!v || 'กรุณาระบุเวอร์ชันของระบบปฏิบัติการ'
        ],
        serialNo:[
          v => !!v || 'กรุณาระบุ Serial Number ของอุปกรณ์ของคุณ'
        ],
        imei:[
          v => !!v || 'กรุณาระบุหมายเลข IMEI ของอุปกรณ์'
        ],
        mac:[
          v => !!v || 'ไม่สามารถรับ MAC Address ได้กรุณาลองใหม่'
        ]
      }
    }
  },
  created() {
    this.GetmyDevices()
    this.GetUser()
  },
  methods: {
    GetUser() {
      this.user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
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
    AddDeviceModal() {
      this.date = new Date().toISOString().substr(0, 10)
      var cli = new ClientJS()
      this.osName = cli.getOS().name
      this.osVersion = cli.getOS().version
      this.brandName = cli.getDevice().vendor
      this.Model = cli.getDevice().model
      var device = cli.getDevice().type
      if (device === 'mobile') {
        this.selectDevice = 'Mobile'
      } else if (device === 'tablet') {
        this.selectDevice = 'Tablet'
      } else {
        this.selectDevice = 'PC/Laptop'
      }
      this.macLoading = true
      this.axios.get(process.env.VUE_APP_API + '/getmac').then((response) => {
        this.macLoading = false
        this.macAddress = response.data.mac_address
        }
      ).catch(err => {
        console.log('Error', err.response)
        this.macLoading = false
        this.$swal({
          type: 'error',
          title: "CAN'T GET MAC ADDRESS",
          text: 'TRY AGAIN.' + '(' + err + ')'
        })
      })
    },
    SubmitAddDevice() {
      if (this.$refs.form.validate()) {
        this.addLoading = true
        var imei = this.ImeiNumber
        if (this.ImeiNumber === '' || this.ImeiNumber === null){
          imei = null
        }
        var user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
        var device = {
          user_id: user.id,
          os_name: this.osName,
          os_version: this.osVersion,
          mac_address: this.macAddress,
          platform: this.selectDevice,
          serial_number: this.SerialNumber,
          brand_name: this.brandName,
          model_name: this.Model,
          imei_number: imei
        }
        this.axios.post(process.env.VUE_APP_API + '/add_device', {device}).then(response => {
          this.addLoading = false
          this.dialog = false
          this.ClearAddForm()
          if (response.status === 204){
            this.$swal({
              position: 'top-end',
              type: 'success',
              title: 'ADD DEVICE SUCCESS',
              showConfirmButton: false,
              timer: 2000
            }).then(
              this.GetmyDevices()
            )
          }
        }).catch(err => {
          this.addLoading = false
          this.$swal({
            type: 'error',
            title: "CAN'T ADD DEVICE",
            text: 'TRY AGAIN.' + '(' + err + ')'
          })
        })
      }
    },
    ClearAddForm() {
      this.$refs.form.reset()
    },
    FormatDate(inDate) {
      // alert(inDate)
      // alert(moment(inDate).format('YYYY-MM-DD'))
      return moment(inDate).format('YYYY-MM-DD')
    }
  },
  computed: {

  },
  watch: {
    selectDevice () {
      if (this.selectDevice === 'Mobile' || this.selectDevice === 'Tablet') {
        this.showImei = true
      } else {
        this.showImei = false
      }
    }
  },
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
