<template>
  <div>
  <v-card>
    <v-card-title>
      <v-icon large class="mt-3 mr-3 ml-5">list</v-icon><v-toolbar-title class="mt-3 ml-0">LOG</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" icon flat class="mt-4 mr-3" size="40" @click="OpenDownload()" :disabled="updateLoading"><v-icon>archive</v-icon></v-btn>
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
        <!-- <td class="text-xs-center"><v-chip small :class="PlatformText(props.item.platform)" :color="PlatformColor(props.item.platform)" disabled>{{ props.item.platform }}</v-chip></td> -->
        <td class="text-xs-center">{{ props.item.fullname }}</td>
        <td class="text-xs-center">{{ props.item.mac_address }}</td>
        <td class="text-xs-center">{{ FormatDate(props.item.start_date) }}</td>
        <td class="text-xs-center">{{ FormatDate(props.item.end_date) }}</td>
        <td class="text-xs-center">
          <v-icon v-if="props.item.valid === 1" color="success">check_circle</v-icon>
          <v-icon v-else color="error">remove_circle</v-icon>
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            medium
            class="mr-2"
            @click="ViewDevice(props.item)"
          >
            visibility
          </v-icon>
          <v-icon v-if="props.item.valid === 1"
            medium
            color="error"
            @click="TerminateDevice(props.item)" :disabled="updateLoading"
          >
            delete
          </v-icon>
          <v-icon medium v-else>
            delete
          </v-icon>
        </td>
        <!-- <td class="text-xs-right">{{ props.item.Mac_Address }}</td> -->
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
      <template v-slot:footer>
        <td :colspan="headers.length" class="grey--text caption">
          <span class="mr-2">* Status: </span>
          <v-icon color="success lighten-1" small>check_circle</v-icon><span class="mr-1 ml-1">Active</span>
          <v-icon color="error lighten-2" small>remove_circle</v-icon><span class="mr-1 ml-1">Terminated</span>
        </td>
      </template>
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
            <span class="ml-2" style="color:black;">Device</span>
            <v-btn color="green" flat outline icon v-if="deviceInfo.platform === 'Mobile'">
            <v-icon>phone_iphone</v-icon>
            </v-btn>
            <v-btn color="orange" flat outline icon v-else-if="deviceInfo.platform === 'Tablet'">
            <v-icon>tablet</v-icon>
            </v-btn>
            <v-btn color="red" flat outline icon v-else>
            <v-icon>laptop_mac</v-icon>
            </v-btn>
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
      <v-btn class="mb-2" color="error lighten-1" small @click="deviceInfoDialog = false">CLOSE</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
  </v-dialog>
  <v-dialog
    v-model="downloadDialog"
    scrollable
    persistent :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-form ref="downloadForm">
    <v-card>
      <v-card-title primary-title>
        <v-layout row wrap justify-center>
          <span class="headline">DOWNLOAD REPORT</span>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-xl>
          <v-layout row wrap justify-space-between>
            <v-flex xs12>
              <v-select
                :items="timeItems"
                v-model="time"
                label="Select Time" :rules="downloadRules.require"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm5>
              <v-select
                :items="statusItems"
                v-model="status"
                label="Select Status" :rules="downloadRules.require"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm7>
              <v-select
                :items="platformItems"
                v-model="platform"
                label="Select Platform" multiple :rules="downloadRules.length"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-fade-transition>
                <v-select
                  :items="topicItems"
                  v-model="topic"
                  label="Select Time Type" v-if="showTime" :rules="downloadRules.require"
                ></v-select>
              </v-fade-transition>
            </v-flex>
            <v-flex xs12 sm6>
              <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-fade-transition>
                    <v-text-field  v-if="showTime" :rules="downloadRules.require"
                    v-model="startDate"
                    label="Start date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    ></v-text-field>
                  </v-fade-transition>
                </template>
                <v-date-picker v-model="startDate" @input="menu1 = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6>
              <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-fade-transition>
                    <v-text-field  v-if="showTime" :rules="downloadRules.require"
                    v-model="endDate"
                    label="End date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    >
                    <v-tooltip slot="append-outer" bottom>
                      <v-icon slot="activator" @click="endDate = startDate">file_copy</v-icon>
                      <span>Same as start date</span>
                    </v-tooltip>
                  </v-text-field>
                  </v-fade-transition>
                </template>
                <v-date-picker v-model="endDate" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-container>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="DownloadReport()">Confirm</v-btn>
        <v-btn color="grey" dark @click="downloadDialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    </v-form>
  </v-dialog>
</div>
</template>

<script>
import moment from 'moment'
import {Decode} from '@/service'
export default {
  data () {
    return {
      showTime: false,
      menu1: false,
      menu2: false,
      status: '',
      platform: [],
      startDate: '',
      endDate: '',
      time: '',
      topic: '',
      timeItems: ['All time', 'Time duration'],
      topicItems: [
        {
          text:'From register date to terminate date',
          disabled: false
        },
        {
          text: 'Register date',
          disabled: false
        },
        {
          text: 'Terminate date',
          disabled: false
        }
      ],
      platformItems: [
        {
          text:'All',
          disabled: false
        },
        {
          text: 'Mobile',
          disabled: false
        },
        {
          text: 'Tablet',
          disabled: false
        },
        {
          text: 'PC/Laptop',
          disabled: false
        }
      ],
      statusItems: [
        {
          text: 'All',
          disabled: false
        },
        {
          text: 'Active',
          disabled: false
        },
        {
          text: 'Terminated',
          disabled: false
        }
      ],
      downloadRules:{
        require: [
          v => !!v || 'กรุณาระบุข้อมูล'
        ],
        length: [
          v => v.length > 0 || 'กรุณาระบุข้อมูล'
        ]
      },
      updateLoading: false,
      user: null,
      filters: [
      ],
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
      downloadDialog: false,
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
        { text: 'รหัสพนักงาน', align: 'centered', value: 'emp_code' },
        { text: 'ชื่อ-นามสกุล', align: 'centered', value: 'fullname' },
        { text: 'Mac Address', align: 'centered', value: 'mac_address' },
        { text: 'วันที่ลงทะเบียน', align: 'centered', value: 'start_date' },
        { text: 'วันที่ถอนจากระบบ', align: 'centered', value: 'end_date' },
        { text: 'Status', align: 'centered', value: 'status' },
        { text: 'Action', align: 'centered', value: 'Action' }
      ]
    }
  },
  created() {
    this.GetUser()
    this.GetAllDevices()
  },
  computed: {
    filteredDevices() {
      return this.devices.filter(item => {
        return this.filters.length < 1 || this.filters.includes(item['platform'])
      })
    }
  },
  methods: {
    DownloadReport() {
      if (this.$refs.downloadForm.validate()){
        //download file
        this.downloadDialog = false
        var data = {
          time: this.time,
          platform: this.platform,
          status: this.status,
          time_type: this.topic,
          start_date: this.startDate,
          end_date: this.endDate
        }
        this.updateLoading = true
        this.axios.post(process.env.VUE_APP_API + '/get_report', {data}, {responseType: 'blob'}).then(response => {
          this.updateLoading = false
          if (response.status === 200) {
            let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'PersonalAssetData.xlsx'
            document.body.appendChild(link)
            link.click()
          } else {
            this.$swal({
              position: 'top-end',
              type: 'info',
              title: "CAN'T DOWNLOAD REPORT.",
              text: 'No data found.',
              showConfirmButton: false,
              timer: 4000,
              toast: true
            })
          }
        }).catch(err => {
          this.updateLoading = false
          console.log('Error', err.response)
          this.$swal({
            position: 'top-end',
            type: 'error',
            title: "CAN'T DOWNLOAD REPORT.",
            text: 'TRY AGAIN.' + '(' + err + ')',
            showConfirmButton: false,
            timer: 3500,
            toast: true
          })
        })
      }
    },
    OpenDownload() {
      this.$refs.downloadForm.reset()
      this.downloadDialog = true
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
          this.filters.splice(this.filters.indexOf('PC/Laptop'), 1)
          this.platformColor.color.pc = ''
          this.platformColor.font.pc = 'black--text'
        } else {
          this.filters.push('PC/Laptop')
          this.platformColor.color.pc = '#FDB4BF'
          this.platformColor.font.pc = 'white--text'
        }
      } else if (platform === 'Mobile') {
        if (this.platformColor.color.mobile === '#5BC0BE') {
          this.filters.splice(this.filters.indexOf('Mobile'), 1)
          this.platformColor.color.mobile = ''
          this.platformColor.font.mobile = 'black--text'
        } else {
          this.filters.push('Mobile')
          this.platformColor.color.mobile = '#5BC0BE'
          this.platformColor.font.mobile = 'white--text'
        }
      } else {
        if (this.platformColor.color.tablet === '#F2ED8C') {
          this.filters.splice(this.filters.indexOf('Tablet'), 1)
          this.platformColor.color.tablet = ''
          this.platformColor.font.tablet = 'black--text'
        } else {
          this.filters.push('Tablet')
          this.platformColor.color.tablet = '#F2ED8C'
          this.platformColor.font.tablet = 'black--text'
        }
      }
    },
    GetAllDevices(){
      // var user = JSON.parse(Decode.decode(this.$cookies.get('userToken')))
      this.updateLoading = true
      this.axios.get(process.env.VUE_APP_API + '/get_devices').then((response) => {
        this.updateLoading = false
        this.devices = response.data
        for (var i = 0; i < this.devices.length; i++) {
          this.devices[i]['no'] = i + 1
          this.devices[i]['fullname'] = this.devices[i]['name'] + ' ' + this.devices[i]['lastname']
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
    if (inDate !== null) {
      return moment(inDate).format('DD-MM-YYYY')
    } else {
      return '-'
    }
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
},
watch: {
  time() {
    if (this.time === 'Time duration') {
      this.showTime = true
    } else {
      this.showTime = false
    }
  },
  status() {
    if (this.status === 'Active') {
      this.topicItems[0].disabled = true
      this.topicItems[1].disabled = false
      this.topicItems[2].disabled = true
    } else {
      this.topicItems[0].disabled = false
      this.topicItems[1].disabled = false
      this.topicItems[2].disabled = false
    }
  },
  platform() {
    if (this.platform.length > 0) {
      var selectAll = false
      for (var platform in this.platform) {
        if (this.platform[platform] === 'All') {
          selectAll = true
        }
      }
      if (selectAll) {
        this.platformItems[0]['disabled'] = false
        this.platformItems[1]['disabled'] = true
        this.platformItems[2]['disabled'] = true
        this.platformItems[3]['disabled'] = true
      } else {
        this.platformItems[0]['disabled'] = true
        this.platformItems[1]['disabled'] = false
        this.platformItems[2]['disabled'] = false
        this.platformItems[3]['disabled'] = false
      }
    } else {
      this.platformItems[0]['disabled'] = false
      this.platformItems[1]['disabled'] = false
      this.platformItems[2]['disabled'] = false
      this.platformItems[3]['disabled'] = false
    }
  }
}
}
</script>
