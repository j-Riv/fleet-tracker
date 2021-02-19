<template>
  <v-container id="eventForm">
    <form>
      <p class="text-left">Updating event for {{ vehicle.name }}</p>
      <v-text-field
        v-model="type"
        v-validate="'required|max:50'"
        :counter="50"
        :error-messages="errors.collect('type')"
        label="Type"
        data-vv-name="type"
        required
        readonly
        disabled
      ></v-text-field>

      <v-text-field
        v-model="location"
        v-validate="'required|max:50'"
        :counter="50"
        :error-messages="errors.collect('location')"
        label="Location"
        data-vv-name="location"
        required
      ></v-text-field>

      <v-textarea
        v-model="description"
        v-validate="'required|max:300'"
        :counter="300"
        :error-messages="errors.collect('description')"
        label="Description"
        data-vv-name="description"
        required
      ></v-textarea>

      <!-- date picker -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-dialog ref="dialogSD" v-model="sDateModal" :return-value.sync="sDate" persistent full-width width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="sDate" label="Start Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="sDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="sDateModal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogSD.save(sDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
          <v-dialog ref="dialogST" v-model="sTimeModal" :return-value.sync="sTime" persistent full-width width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="sTime"
                label="Start Time"
                prepend-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="sTimeModal" v-model="sTime" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="sTimeModal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogST.save(sTime)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="4">
          <v-dialog ref="dialogED" v-model="eDateModal" :return-value.sync="eDate" persistent full-width width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="eDate" label="End Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="eDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="eDateModal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogED.save(eDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
          <v-dialog ref="dialogET" v-model="eTimeModal" :return-value.sync="eTime" persistent full-width width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="eTime"
                label="End Time"
                prepend-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="eTimeModal" v-model="eTime" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="eTimeModal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogET.save(eTime)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <!-- /date picker -->
      <v-row>
        <v-col cols="12">
          <v-checkbox
            v-model="archive"
            :error-messages="errors.collect('archive')"
            value="1"
            label="Archive"
            data-vv-name="archive"
            type="checkbox"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-btn class="mr-4" @click="submit">Update</v-btn>
      <v-btn @click="clear">Reset</v-btn>
    </form>
    <a class="event-link" v-if="getEventLink !== null" v-bind:href="getEventLink" target="_blank">
      <i class="mdi mdi-calendar"></i>
      View Event
    </a>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { mapGetters, mapActions } from 'vuex';
import router from '../router';

Vue.use(VeeValidate);

export default Vue.extend({
  name: 'UpdateEventForm',
  $_veeValidate: {
    validator: 'new',
  },
  data: () => ({
    type: '',
    location: '',
    description: '',
    attendees: '',
    sDate: new Date().toISOString().substr(0, 10),
    eDate: new Date().toISOString().substr(0, 10),
    sDateModal: false,
    eDateModal: false,
    sTime: '00:00',
    eTime: '00:00',
    sTimeModal: false,
    eTimeModal: false,
    types: ['Insurance Renewal', 'Maintenance', 'Registration Renewal', 'Repair'],
    archive: null,
    dictionary: {
      attributes: {
        type: 'Event Type',
        // custom attributes
      },
      custom: {
        description: {
          required: () => 'Description can not be empty',
          max: 'The Description field may not be greater than 300 characters',
          // custom messages
        },
        // select: {
        //   required: 'Select field is required',
        // },
      },
    },
  }),
  computed: mapGetters(['getEventLink']),
  props: ['createEvent', 'vehicle', 'record', 'eventType'],
  mounted() {
    this.$validator.localize('en', this.dictionary);
    this.type = this.record.type;
    this.location = this.record.location === null ? 'N/A' : this.record.location;
    this.description = this.record.description;
    const sDate = this.record.start_date.split('T')[0];
    const sTime = this.record.start_date
      .split('T')[1]
      .split('-')[0]
      .substring(0, 5);
    const eDate = this.record.end_date.split('T')[0];
    const eTime = this.record.end_date
      .split('T')[1]
      .split('-')[0]
      .substring(0, 5);
    this.sDate = sDate;
    this.eDate = eDate;
    this.sTime = sTime;
    this.eTime = eTime;
    this.archive = this.vehicle.archive;
  },
  methods: {
    ...mapActions(['updateEvent']),
    submit() {
      this.$validator.validate().then(valid => {
        if (valid) {
          let emails;
          if (emails !== '') {
            emails = this.attendees?.replace(/\s/g, '');
          }
          emails = emails.split(',');
          const att: { email: string }[] = [];
          emails.forEach((email: string) => {
            att.push({ email: email });
          });
          const formData = {
            vehicle: this.vehicle.name,
            type: this.type,
            location: this.location,
            description: this.description,
            start_date: `${this.sDate}T${this.sTime}:00-07:00`,
            end_date: `${this.eDate}T${this.eTime}:00-07:00`,
            archive: this.archive,
            vehicle_id: this.vehicle.id,
          };
          this.$store
            .dispatch('updateEvent', {
              type: this.eventType,
              id: this.record.id,
              formData,
            })
            .then(response => {
              if (response.status === 200) {
                this.clear();
                this.$store.dispatch('getVehicle', this.vehicle.id).then(loaded => {
                  if (loaded) {
                    router.push('/vehicles/' + this.vehicle.id);
                  } else {
                    console.log('Error loading vehicle');
                  }
                });
              }
            });
        }
      });
    },
    clear() {
      this.type = this.record.type;
      this.location = this.record.location === null ? 'N/A' : this.record.location;
      this.description = this.record.description;
      const sDate = this.record.start_date.split('T')[0];
      const sTime = this.record.start_date
        .split('T')[1]
        .split('-')[0]
        .substring(0, 5);
      const eDate = this.record.end_date.split('T')[0];
      const eTime = this.record.end_date
        .split('T')[1]
        .split('-')[0]
        .substring(0, 5);
      this.sDate = sDate;
      this.eDate = eDate;
      this.sTime = sTime;
      this.eTime = eTime;
      this.archive = this.vehicle.archive;
      this.$validator.reset();
    },
  },
});
</script>

<style lang="scss">
#eventForm {
  .event-link {
    margin-top: 5px;
    text-decoration: none;
    text-align: center;
  }
}
</style>
