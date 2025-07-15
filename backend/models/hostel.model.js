const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['Boys', 'Girls'],
    required: true,
  },
  location: {
    building: String,
    campus: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
  },

  // General Amenities
  amenities: [{
    type: String,
  }],

  // Capacity and Rooms
  totalCapacity: {
    type: Number,
    required: true,
  },
  rooms: [{
    roomNumber: {
      type: String,
      required: true,
    },
    floor: Number,
    type: {
      type: String,
      enum: ['Single', 'Double', 'Triple'],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    currentOccupancy: {
      type: Number,
      default: 0,
    },
    occupants: [{
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
      fromDate: Date,
      toDate: Date,
      status: {
        type: String,
        enum: ['Active', 'Past', 'Reserved'],
        default: 'Active',
      },
    }],
    facilities: [{
      type: String,
      enum: ['AC', 'Fan', 'Attached Bathroom', 'Balcony', 'WiFi'],
    }],
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'Under Maintenance', 'Reserved'],
      default: 'Available',
    },
    maintenanceHistory: [{
      issue: String,
      reportedDate: Date,
      resolvedDate: Date,
      cost: Number,
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending',
      },
    }],
  }],

  // Staff
  wardens: [{
    name: String,
    contactNumber: String,
    email: String,
    shift: {
      type: String,
      enum: ['Morning', 'Evening', 'Night'],
    },
  }],

  // Facilities
  facilities: {
    messHall: {
      capacity: Number,
      timings: [{
        meal: String,
        startTime: String,
        endTime: String,
      }],
    },
    commonRoom: {
      available: Boolean,
      facilities: [String],
    },
    laundry: {
      available: Boolean,
      charges: Number,
    },
    security: {
      guards: Number,
      cctv: Boolean,
      visitorLog: Boolean,
    },
  },

  // Mess Management
  mess: {
    contractor: {
      name: String,
      contactNumber: String,
      email: String,
      contractStartDate: Date,
      contractEndDate: Date,
    },
    menu: [{
      day: String,
      meals: [{
        type: {
          type: String,
          enum: ['Breakfast', 'Lunch', 'Dinner'],
        },
        items: [String],
      }],
    }],
    fees: {
      monthly: Number,
      daily: Number,
    },
  },

  // Financial
  fees: {
    roomRent: {
      amount: Number,
      frequency: {
        type: String,
        enum: ['Monthly', 'Semester', 'Yearly'],
      },
    },
    securityDeposit: Number,
    otherCharges: [{
      name: String,
      amount: Number,
      frequency: String,
    }],
  },

  // Rules and Regulations
  rules: [{
    title: String,
    description: String,
    penalty: String,
  }],

  // System Fields
  status: {
    type: String,
    enum: ['Operational', 'Under Maintenance', 'Closed'],
    default: 'Operational',
  },
}, {
  timestamps: true,
});

// Methods
hostelSchema.methods.checkAvailability = function() {
  const totalOccupied = this.rooms.reduce((sum, room) => sum + room.currentOccupancy, 0);
  return {
    totalCapacity: this.totalCapacity,
    currentOccupancy: totalOccupied,
    availableSpace: this.totalCapacity - totalOccupied,
  };
};

hostelSchema.methods.findAvailableRoom = function(type) {
  return this.rooms.find(room => 
    room.type === type && 
    room.status === 'Available' &&
    room.currentOccupancy < room.capacity
  );
};

hostelSchema.methods.allocateRoom = async function(studentId, roomNumber, fromDate, toDate) {
  const room = this.rooms.find(r => r.roomNumber === roomNumber);
  if (!room) throw new Error('Room not found');
  if (room.currentOccupancy >= room.capacity) throw new Error('Room is full');

  room.occupants.push({
    student: studentId,
    fromDate,
    toDate,
    status: 'Active'
  });
  room.currentOccupancy += 1;

  if (room.currentOccupancy === room.capacity) {
    room.status = 'Occupied';
  }

  await this.save();
  return room;
};

const Hostel = mongoose.model('Hostel', hostelSchema);
module.exports = Hostel;
