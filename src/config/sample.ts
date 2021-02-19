export const vehicleTracker = {
  name: 'VEHICLE',
  version: 'v1.01',
};

export const baseImageUrl = 'http://localhost:3000/public/uploads/vehicles';

export const settings = {
  vehicle: {
    colors: [
      'N/A',
      'Black',
      'Blue',
      'Brown',
      'Burgundy',
      'Cream',
      'Green',
      'Grey',
      'Orange',
      'Pink',
      'Purple',
      'Red',
      'Silver',
      'White',
      'Yellow',
    ],
    types: ['Car', 'Motorcycle', 'Recreational', 'Trailer', 'Truck', 'Van'],
    statuses: [{ text: 'Active' }, { text: 'Out Of Service' }],
    attributes: {
      owner: 'Owner',
      name: 'Vehicle Name',
      plates: 'License Plate',
      vin: 'VIN',
      make: 'Vehicle Make',
      model: 'Vehicle Model',
      color: 'Color',
      email: 'E-mail Address',
      note: 'Notes',
    },
    uses: [{ text: 'Service' }, { text: 'Retail' }, { text: 'Commercial' }, { text: 'Pleasure' }],
    addresses: ['123 Fake St'],
  },
};
