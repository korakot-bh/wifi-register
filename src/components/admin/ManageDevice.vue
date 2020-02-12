<template>
  <div>
  <v-card>
    <v-card-title>
      <v-icon large class="mt-3 mr-5 ml-1">laptop_mac</v-icon><v-toolbar-title class="mt-3 ml-0">Device</v-toolbar-title>
      <div class="ml-4">
        <v-chip :color="platformColor.color.pc" @click="PlatformFilter('PC/Laptop')" :class="platformColor.font.pc" small>
          PC/Laptop
        </v-chip>
        <v-chip :color="platformColor.color.mobile" @click="PlatformFilter('Mobile')" :class="platformColor.font.mobile" small>
          Mobile
        </v-chip>
        <v-chip :color="platformColor.color.tablet" @click="PlatformFilter('Tablet')" :class="platformColor.font.tablet" small>
          Tablet
        </v-chip>
        <v-chip :color="accessibleColor.color.accessible" @click="AccesibleFilter(true)" small :class="accessibleColor.font.accessible">
          <v-icon>check_circle</v-icon>
        </v-chip>
        <v-chip :color="accessibleColor.color.nonAccessible" @click="AccesibleFilter(false)" small :class="accessibleColor.font.nonAccessible">
          <v-icon>remove_circle</v-icon>
        </v-chip>
      </div>
      <v-spacer></v-spacer>
      <v-progress-circular indeterminate size="25" class="mr-3 mt-4" color="primary" v-if="updateLoading"></v-progress-circular>
      <v-flex xs3>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>

    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="filteredDevices"
      :search="search"
      :rows-per-page-items="[10,50,100,{'text':'$vuetify.dataIterator.rowsPerPageAll','value':-1}]"
    >
      <template v-slot:items="props">
        <!-- <td class="text-xs-center">{{ props.istem.Type }}</td> -->
        <td class="text-xs-center">{{ props.item.no }}</td>
        <td class="text-xs-center">{{ props.item.emp_code }}</td>
        <td class="text-xs-center"><v-chip small :class="PlatformText(props.item.platform)" :color="PlatformColor(props.item.platform)" disabled>{{ props.item.platform }}</v-chip></td>
        <td class="text-xs-center">{{ props.item.mac_address }}</td>
        <td class="text-xs-center">{{ FormatDate(props.item.start_date) }}</td>
        <td class="text-xs-center">
          <v-btn icon small color="success" :disabled="updateLoading" flat v-if="props.item.wifi_accessible === 1" @click="UpdateStatus(props.item, false)">
            <v-icon >check_circle</v-icon>
            <!-- {{props.item.loading}} -->
          </v-btn>
          <v-btn icon small color="grey" :disabled="updateLoading" flat v-else @click="UpdateStatus(props.item, true)">
            <v-icon >remove_circle</v-icon>
            <!-- {{props.item.loading}} -->
          </v-btn>
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            medium
            class="mr-2"
            @click="ViewDevice(props.item)"
          >
            visibility
          </v-icon>
          <v-icon
            medium
            color="error"
            @click="TerminateDevice(props.item)" :disabled="updateLoading"
          >
            delete
          </v-icon>
        </td>
        <!-- <td class="text-xs-right">{{ props.item.Mac_Address }}</td> -->
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
  <v-dialog
    v-model="deviceInfoDialog"
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
  <v-card>
    <v-card-title primary-title>
      <v-layout row wrap justify-center>
        <span class="headline">DEVICE INSPECTION</span>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 sm12>
          <v-subheader>
            <v-icon v-if="deviceInfo.platform === 'Mobile'">phone_iphone</v-icon>
            <v-icon v-else-if="deviceInfo.platform === 'Tablet'">tablet</v-icon>
            <v-icon v-else>laptop_mac</v-icon>
            <span class="ml-2" style="color:black;">Device</span>
          </v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-subheader>Brand : {{deviceInfo.brand_name}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-subheader>Model : {{deviceInfo.model_name}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-subheader>OS : {{deviceInfo.os_name}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-subheader>Version : {{deviceInfo.os_version}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm12>
          <v-subheader>MAC Address : {{deviceInfo.mac_address}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm12>
          <v-subheader>Serial Number : {{deviceInfo.serial_number}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm12 v-if="deviceInfo.imei_number !== null">
          <v-subheader>IMEI Number : {{deviceInfo.imei_number}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-subheader>Register Date : {{FormatDate(deviceInfo.start_date)}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-subheader>Accesible :
            <v-icon v-if="deviceInfo.wifi_accessible === 1" class="ml-2" color="success">check_circle</v-icon>
            <v-icon v-else class="ml-2" color="error lighten-3">remove_circle</v-icon>
          </v-subheader>
        </v-flex>
        <v-flex xs12 sm12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12 sm12>
          <v-subheader><span style="color:black;">Owner</span></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-subheader>Name : {{deviceInfo.name}} {{deviceInfo.lastname}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-subheader>Code : {{deviceInfo.emp_code}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm12>
          <v-subheader>E-mail : {{deviceInfo.email}}</v-subheader>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error lighten-1" small @click="deviceInfoDialog = false" class="mb-2">CLOSE</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
  </v-dialog>
</div>
</template>

<script>
import moment from 'moment'
import {Decode} from '@/service'
export default {
  data () {
    return {
      updateLoading: false,
      user: null,
      filters: {
        platform: [],
        wifi_accessible: []
      },
      accessibleColor: {
        color: {
          accessible: '',
          nonAccessible: ''
        },
        font: {
          accessible: 'black--text',
          nonAccessible: 'black--text'
        }
      },
      platformColor: {
        color: {
          pc: '',
          mobile: '',
          tablet: ''
        },
        font: {
          pc: 'black--text',
          mobile: 'black--text',
          tablet: 'black--text'
        }
      },
      deviceInfoDialog: false,
      deviceInfo: {
        name: '',
        lastname: '',
        email: '',
        emp_code: '',
        brand_name: '',
        model_name: ''
      },
      devices: [],
      search: '',
      headers: [
        // { text: 'Type', align: 'centered', value: 'Type' },
        { text: 'No', align: 'centered', value: 'no' },
        { text: 'User', align: 'centered', value: 'emp_code' },
        { text: 'Platform', align: 'centered', value: 'platforms', sortable: false },
        { text: 'Mac Address', align: 'centered', value: 'mac_address', sortable: false },
        { text: 'วันที่ลงทะเบียน', align: 'centered', value: 'start_date' },
        { text: 'Accessible', align: 'centered', value: 'status', sortable: false },
        { text: 'Action', align: 'centered', value: 'Action', sortable: false }
      ]
    }
  },
  created() {
    this.GetUser()
    this.GetAllDevices()
  },
  computed: {
    filteredDevices() {
      return this.devices.filter(d => {
        return Object.keys(this.filters).every(f => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f])
        })
      })
    }
  },
  methods: {
    AccesibleFilter(access) {
      if (access) {
        if (this.accessibleColor.color.accessible === 'success') {
          this.filters.wifi_accessible.splice(this.filters.wifi_accessible.indexOf(1), 1)
          this.accessibleColor.color.accessible = ''
          this.accessibleColor.font.accessible = 'black--text'
        } else {
          this.filters.wifi_accessible.push(1)
          this.accessibleColor.color.accessible = 'success'
          this.accessibleColor.font.accessible = 'white--text'
        }
      } else {
        if (this.accessibleColor.color.nonAccessible === 'error') {
          this.filters.wifi_accessible.splice(this.filters.wifi_accessible.indexOf(0), 1)
          this.accessibleColor.color.nonAccessible = ''
          this.accessibleColor.font.nonAccessible = 'black--text'
        } else {
          this.filters.wifi_accessible.push(0)
          this.accessibleColor.color.nonAccessible = 'error'
          this.accessibleColor.font.nonAccessible = 'white--text'
        }
      }
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
            this.GetAllDevices()
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
    GetUser() {
      this.user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
    },
    UpdateStatus(item, status) {
      this.$swal({
        title: 'ต้องการเปลี่ยนแปลงสถานะ ?',
        type: 'warning',
        showCancelButton: true
      }).then(response => {
        if (response.value === true) {
          var data = {
            device_id: item.id,
            user_id: this.user.id,
            wifi_accessible: status
          }
          this.updateLoading = true
          this.axios.post(process.env.VUE_APP_API + '/update_status', {data}).then(response => {
            this.updateLoading = false
            this.$swal({
              position: 'top-end',
              type: 'success',
              title: "UPDATE SUCCESS.",
              showConfirmButton: false,
              timer: 3000,
              toast: true
            })
            if (status) {
              item.wifi_accessible = 1
            } else {
              item.wifi_accessible = 0
            }
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
    ViewDevice(item){
      this.deviceInfoDialog = true
      this.deviceInfo = item
    },
    PlatformFilter(platform) {
      if (platform === 'PC/Laptop') {
        if (this.platformColor.color.pc === '#FDB4BF') {
          this.filters.platform.splice(this.filters.platform.indexOf('PC/Laptop'), 1)
          this.platformColor.color.pc = ''
          this.platformColor.font.pc = 'black--text'
        } else {
          this.filters.platform.push('PC/Laptop')
          this.platformColor.color.pc = '#FDB4BF'
          this.platformColor.font.pc = 'white--text'
        }
      } else if (platform === 'Mobile') {
        if (this.platformColor.color.mobile === '#5BC0BE') {
          this.filters.platform.splice(this.filters.platform.indexOf('Mobile'), 1)
          this.platformColor.color.mobile = ''
          this.platformColor.font.mobile = 'black--text'
        } else {
          this.filters.platform.push('Mobile')
          this.platformColor.color.mobile = '#5BC0BE'
          this.platformColor.font.mobile = 'white--text'
        }
      } else {
        if (this.platformColor.color.tablet === '#F2ED8C') {
          this.filters.platform.splice(this.filters.platform.indexOf('Tablet'), 1)
          this.platformColor.color.tablet = ''
          this.platformColor.font.tablet = 'black--text'
        } else {
          this.filters.platform.push('Tablet')
          this.platformColor.color.tablet = '#F2ED8C'
          this.platformColor.font.tablet = 'black--text'
        }
      }
    },
    GetAllDevices(){
      // var user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
      this.updateLoading = true
      this.axios.get(process.env.VUE_APP_API + '/get_devices?valid=true').then((response) => {
        this.updateLoading = false
        this.devices = response.data
        for (var i = 0; i < this.devices.length; i++) {
          this.devices[i]['no'] = i + 1
        }
      }
    ).catch(err => {
      this.updateLoading = false
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
  FormatDate(inDate) {
    return moment(inDate).format('DD-MM-YYYY')
  },
  PlatformColor(platform) {
    if(platform === 'PC/Laptop') {
      return '#FDB4BF'
    } else if (platform === 'Mobile') {
      return '#5BC0BE'
    } else {
      return '#F2ED8C'
    }
  },
  PlatformText(platform){
    if(platform === 'PC/Laptop') {
      return 'white--text'
    } else if (platform === 'Mobile') {
      return 'white--text'
    } else {
      return 'black--text'
    }
  },
  PlatformSearch(items, search, filter){
    search = search.toString().toLowerCase()
    return items.filter(row => filter(row['platform'], search))
  }
}
}
</script>
