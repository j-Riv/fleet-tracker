<template>
  <form enctype="multipart/form-data">
    <v-container>
      <v-row>
        <v-col col="12">
          Fill out the form below to add a vehicle to the database. Once the vehicle is saved you will be able to update
          the vehicle with extra images maintenance records, and a pink slip.
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" lg="6" md="6">
          <v-text-field
            v-model="owner"
            v-validate="'required|max:30'"
            :counter="30"
            :error-messages="errors.collect('vehicle_owner')"
            label="Owner"
            data-vv-name="vehicle_owner"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" lg="6" md="6">
          <v-text-field
            v-model="name"
            v-validate="'required|max:50'"
            :counter="50"
            :error-messages="errors.collect('vehicle_name')"
            label="Name"
            data-vv-name="vehicle_name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" lg="1" md="1">
          <v-select
            v-model="status"
            v-validate="'required'"
            :items="statuses"
            item-text="text"
            item-value="value"
            :error-messages="errors.collect('status')"
            label="Status"
            data-vv-name="status"
            required
          ></v-select>
        </v-col>
        <v-col cols="3" lg="1" md="1">
          <v-select
            v-model="use"
            v-validate="'required'"
            :items="uses"
            item-text="text"
            item-value="value"
            :error-messages="errors.collect('use')"
            label="Use"
            data-vv-name="use"
            required
          ></v-select>
        </v-col>
        <v-col cols="3" lg="1" md="1">
          <v-select
            v-model="type"
            v-validate="'required'"
            :items="types"
            :error-messages="errors.collect('types')"
            label="Type"
            data-vv-name="types"
            required
          ></v-select>
        </v-col>
        <v-col cols="3" lg="1" md="1">
          <v-select
            v-model="color"
            v-validate="'required'"
            :items="colors"
            :error-messages="errors.collect('colors')"
            label="Color"
            data-vv-name="colors"
            required
          ></v-select>
        </v-col>
        <v-col cols="3" lg="1" md="1">
          <v-text-field
            v-model="year"
            v-validate="'required|max:4'"
            :counter="4"
            :error-messages="errors.collect('vehicle_year')"
            label="Year"
            data-vv-name="vehicle_year"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="9" lg="3" md="3">
          <v-text-field
            v-model="make"
            v-validate="'required|max:30'"
            :counter="30"
            :error-messages="errors.collect('vehicle_make')"
            label="Make"
            data-vv-name="vehicle_make"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4" md="4">
          <v-text-field
            v-model="model"
            v-validate="'required|max:30'"
            :counter="30"
            :error-messages="errors.collect('vehicle_model')"
            label="Model"
            data-vv-name="vehicle_model"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" lg="2" md="2">
          <v-text-field
            v-model="plates"
            v-validate="'required|max:7'"
            :counter="7"
            :error-messages="errors.collect('vehicle_plates')"
            label="License Plate"
            data-vv-name="vehicle_plates"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="7" lg="4" md="4">
          <v-text-field
            v-model="vin"
            v-validate="'required|max:20'"
            :counter="20"
            :error-messages="errors.collect('vehicle_vin')"
            label="VIN"
            data-vv-name="vehicle_vin"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="3" md="3">
          <v-dialog
            ref="dialogRegistration"
            v-model="regExpModal"
            :return-value.sync="registration"
            persistent
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="registration"
                label="Registration Expiration"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="registration" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="regExpModal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogRegistration.save(registration)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="6" sm="3" md="3">
          <v-dialog
            ref="dialogInsurance"
            v-model="insExpModal"
            :return-value.sync="insurance"
            persistent
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="insurance"
                label="Insurance Expiration"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="insurance" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="insExpModal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogInsurance.save(insurance)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" lg="2" md="2">
          <v-text-field
            v-model="key_number"
            v-validate="'max:8'"
            :counter="8"
            :error-messages="errors.collect('key_number')"
            label="Key #"
            data-vv-name="key_number"
          ></v-text-field>
        </v-col>
        <v-col cols="6" lg="2" md="2">
          <v-text-field
            v-model="cost_new"
            v-validate="'max:8'"
            :counter="8"
            :error-messages="errors.collect('cost_new')"
            label="Cost"
            data-vv-name="cost_new"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4" md="4">
          <v-select
            v-model="location"
            v-validate="'required'"
            :items="addresses"
            item-text="text"
            item-value="value"
            :error-messages="errors.collect('location')"
            label="Location"
            data-vv-name="location"
            required
          ></v-select>
        </v-col>
        <v-col cols="2" lg="1" md="1">
          <v-select
            v-model="non_op"
            :items="boolean_types"
            :error-messages="errors.collect('non_op')"
            label="Non Op"
            data-vv-name="non_op"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" md="6" sm="12">
          <v-file-input
            label="Add Default Photo"
            accept="image/*"
            ref="file"
            @change="onFileChange"
            v-validate="'image'"
            data-vv-as="image"
            data-vv-name="image"
            required
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="note"
            v-validate="'required|max:300'"
            :counter="300"
            :error-messages="errors.collect('note')"
            label="Note"
            data-vv-name="note"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <v-btn class="mr-4" @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-col>
      </v-row>
      <p class="text-center">{{ getAddVehicleMsg }}</p>
    </v-container>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { mapGetters, mapActions } from 'vuex';
import { settings } from '../config/';

Vue.use(VeeValidate);

export default Vue.extend({
  name: 'VehicleForm',
  $_veeValidate: {
    validator: 'new',
  },
  data: () => ({
    type: '',
    owner: '',
    color: '',
    year: '',
    name: '',
    make: '',
    model: '',
    plates: '',
    vin: '',
    insurance: '',
    registration: '',
    file: '',
    types: settings.vehicle.types,
    colors: settings.vehicle.colors,
    non_op: false,
    boolean_types: [true, false],
    status: 'Active',
    statuses: settings.vehicle.statuses,
    use: '',
    uses: settings.vehicle.uses,
    location: '',
    addresses: settings.vehicle.addresses,
    key_number: '',
    cost_new: '',
    note: '',
    // new
    regExp: new Date().toISOString().substr(0, 10),
    insExp: new Date().toISOString().substr(0, 10),
    regExpModal: false,
    insExpModal: false,
    // new
    dictionary: {
      attributes: {
        owner: 'Owner',
        name: 'Vehicle Name',
        plates: 'License Plate',
        vin: 'VIN',
        make: 'Vehicle Make',
        model: 'Vehicle Model',
        color: 'Color',
        email: 'E-mail Address',
        use: 'Use',
        key_number: 'Key #',
        location: 'Location',
        cost_new: 'Cost New',
        note: 'Notes',
      },
      custom: {
        vehicle_name: {
          required: () => 'Name can not be empty',
          max: 'The name field may not be greater than 10 characters',
        },
      },
    },
  }),
  computed: mapGetters(['getAddVehicleMsg']),
  mounted() {
    this.$validator.localize('en', this.dictionary);
  },

  methods: {
    ...mapActions(['addVehicle', 'getVehicles']),
    async submit() {
      // this.$validator.validateAll();
      this.$validator.validate().then(valid => {
        if (valid) {
          const formData = new FormData();
          if (this.file !== null) formData.append('file', this.file);
          formData.append('type', this.type);
          formData.append('year', this.year);
          formData.append('owner', this.owner);
          formData.append('name', this.name);
          formData.append('make', this.make);
          formData.append('model', this.model);
          formData.append('license_plate', this.plates);
          formData.append('vin', this.vin);
          formData.append('color', this.color);
          formData.append('non_op', this.non_op === true ? '1' : '0');
          formData.append('active', this.status === 'Active' ? '1' : '0');
          formData.append('registration_exp', this.registration !== '' ? this.registration : 'N/A');
          formData.append('insurance_exp', this.insurance !== '' ? this.insurance : 'N/A');
          formData.append('note', this.note);
          // new
          formData.append('use', this.use);
          formData.append('key_number', this.key_number);
          formData.append('cost_new', this.cost_new);
          formData.append('location', this.location);
          this.$store.dispatch('addVehicle', formData).then(response => {
            if (response.status === 201) {
              this.clear();
              this.$store.dispatch('getVehicles');
              this.$emit('added');
            }
          });
        }
      });
    },
    clear() {
      this.type = '';
      this.year = '';
      this.owner = '';
      this.name = '';
      this.make = '';
      this.model = '';
      this.plates = '';
      this.vin = '';
      this.color = '';
      this.status = '';
      this.registration = '';
      this.insurance = '';
      this.note = '';
      this.file = '';
      this.use = '';
      this.key_number = '';
      this.cost_new = '';
      this.location = '';
      this.$validator.reset();
    },
    onFileChange(file) {
      this.file = file;
    },
  },
});
</script>
