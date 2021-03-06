<template>
  <v-container id="eventForm">
    <form>
      <p class="text-left">Creating event for {{ vehicle.name }}</p>
      <v-select
        v-model="type"
        v-validate="'required'"
        :items="types"
        :error-messages="errors.collect('types')"
        label="Type"
        data-vv-name="types"
        required
      ></v-select>

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

      <v-text-field
        v-model="attendees"
        v-validate="'required|max:300'"
        :counter="300"
        :error-messages="errors.collect('attendees')"
        label="Attendees"
        placeholder="comma seperated ex: (example1@email.com, example2@email.com)"
        data-vv-name="attendees"
        required
      ></v-text-field>

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

      <v-btn class="mr-4" @click="submit">Create</v-btn>
      <v-btn class="mr-4" @click="clear">Clear</v-btn>
      <v-btn @click="goBack">Cancel</v-btn>
    </form>
    <p v-if="submitted">{{ !this.isEventError ? 'Success' : 'Failure' }}</p>
    <div class="event-link" v-if="getEventLink !== null">
      <a v-bind:href="getEventLink" target="_blank">
        <i class="mdi mdi-calendar"></i>
        View Event
      </a>
      <br />
      <v-btn class="mt-5" @click="goBack">Back To Vehicle</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { mapGetters, mapActions } from 'vuex';
import router from '../router';

Vue.use(VeeValidate);

export default Vue.extend({
  name: 'EventForm',
  $_veeValidate: {
    validator: 'new',
  },
  data: () => ({
    submitted: false,
    type: null,
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
    dictionary: {
      attributes: {
        type: 'Event Type',
      },
      custom: {
        description: {
          required: () => 'Description can not be empty',
          max: 'The Description field may not be greater than 300 characters',
        },
      },
    },
  }),
  props: ['createEvent', 'vehicle'],
  computed: mapGetters(['getEventLink', 'isEventError']),
  mounted() {
    this.$validator.localize('en', this.dictionary);
  },
  beforeDestroy() {
    this.resetEvent();
  },
  methods: {
    ...mapActions(['setEvent', 'resetEvent', 'setEventLink']),
    submit() {
      // this.$validator.validateAll();
      this.$validator.validate().then(valid => {
        if (valid) {
          this.submitted = true;
          let emails;
          if (this.attendees !== '') {
            emails = this.attendees?.replace(/\s/g, '');
          }
          emails = emails.split(',');
          const att: { email: string }[] = [];
          emails.forEach((email: string) => {
            att.push({ email: email });
          });
          const data = {
            vehicle: this.vehicle.name,
            type: this.type,
            location: this.location,
            description: this.description,
            attendees: att,
            start_date: `${this.sDate}T${this.sTime}:00-07:00`,
            end_date: `${this.eDate}T${this.eTime}:00-07:00`,
            vehicle_id: this.vehicle.id,
          };
          const event = {
            summary: `${data.vehicle} - ${data.type}`,
            location: data.location,
            description: data.description,
            start: {
              dateTime: data.start_date,
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: data.end_date,
              timeZone: 'America/Los_Angeles',
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
            attendees: data.attendees,
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };
          this.createEvent(event, data);
        }
      });
    },
    clear() {
      this.submitted = false;
      this.type = null;
      this.location = '';
      this.description = '';
      (this.attendees = ''), (this.sDate = '');
      this.eDate = '';
      this.sTime = '';
      this.eTime = '';
      this.$validator.reset();
      this.resetEvent();
      setTimeout(() => {
        this.$store.dispatch('setEventLink', null);
      }, 1500);
    },
    goBack() {
      router.push('/vehicles/' + this.vehicle.id);
    },
  },
});
</script>

<style lang="scss">
#eventForm {
  .event-link {
    margin: 25px auto;
    text-align: center;
    a {
      text-align: center;
      font-size: 1.5em;
      text-decoration: none;
      text-align: center;
    }
  }
}
</style>
