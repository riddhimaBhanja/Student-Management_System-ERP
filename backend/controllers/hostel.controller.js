const Hostel = require('../models/hostel.model');
const catchAsync = require('../utils/catchAsync');

// Get all hostels
exports.getAllHostels = catchAsync(async (req, res) => {
    const hostels = await Hostel.find();
    res.json(hostels);
});

// Get hostel by ID
exports.getHostelById = catchAsync(async (req, res) => {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
    }
    res.json(hostel);
});

// Create new hostel
exports.createHostel = catchAsync(async (req, res) => {
    const hostel = new Hostel(req.body);
    const savedHostel = await hostel.save();
    res.status(201).json(savedHostel);
});

// Update hostel
exports.updateHostel = catchAsync(async (req, res) => {
    const hostel = await Hostel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
    }
    res.json(hostel);
});

// Delete hostel
exports.deleteHostel = catchAsync(async (req, res) => {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);
    if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
    }
    res.json({ message: 'Hostel deleted successfully' });
});

// Get all rooms
exports.getAllRooms = catchAsync(async (req, res) => {
    const hostelId = req.query.hostelId;
    let rooms = [];
    
    if (hostelId) {
        const hostel = await Hostel.findById(hostelId);
        if (!hostel) {
            return res.status(404).json({ message: 'Hostel not found' });
        }
        rooms = hostel.rooms;
    } else {
        const hostels = await Hostel.find();
        hostels.forEach(hostel => {
            rooms = [...rooms, ...hostel.rooms.map(room => ({
                ...room.toObject(),
                hostelId: hostel._id,
                hostelName: hostel.name
            }))];
        });
    }
    
    res.json(rooms);
});

// Get room by number
exports.getRoomByNumber = catchAsync(async (req, res) => {
    const { hostelId, roomNumber } = req.params;
    
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
    }
    
    const room = hostel.rooms.find(r => r.roomNumber === roomNumber);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }
    
    res.json(room);
});

// Add room to hostel
exports.addRoom = catchAsync(async (req, res) => {
    const { hostelId } = req.params;
    
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
    }
    
    // Check if room number already exists
    const roomExists = hostel.rooms.some(r => r.roomNumber === req.body.roomNumber);
    if (roomExists) {
        return res.status(400).json({ message: 'Room number already exists' });
    }
    
    hostel.rooms.push(req.body);
    await hostel.save();
    
    res.status(201).json(hostel.rooms[hostel.rooms.length - 1]);
});

// Update room
exports.updateRoom = catchAsync(async (req, res) => {
    const { hostelId, roomNumber } = req.params;
    
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
    }
    
    const roomIndex = hostel.rooms.findIndex(r => r.roomNumber === roomNumber);
    if (roomIndex === -1) {
        return res.status(404).json({ message: 'Room not found' });
    }
    
    // Update room fields
    Object.keys(req.body).forEach(key => {
        hostel.rooms[roomIndex][key] = req.body[key];
    });
    
    await hostel.save();
    res.json(hostel.rooms[roomIndex]);
});

// Delete room
exports.deleteRoom = catchAsync(async (req, res) => {
    const { hostelId, roomNumber } = req.params;
    
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
    }
    
    const roomIndex = hostel.rooms.findIndex(r => r.roomNumber === roomNumber);
    if (roomIndex === -1) {
        return res.status(404).json({ message: 'Room not found' });
    }
    
    // Check if room has occupants
    if (hostel.rooms[roomIndex].currentOccupancy > 0) {
        return res.status(400).json({ message: 'Cannot delete room with occupants' });
    }
    
    hostel.rooms.splice(roomIndex, 1);
    await hostel.save();
    
    res.json({ message: 'Room deleted successfully' });
});

// Allocate room to student
exports.allocateRoom = catchAsync(async (req, res) => {
    const { hostelId, roomNumber } = req.params;
    const { studentId, fromDate, toDate } = req.body;
    
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
    }
    
    try {
        const room = await hostel.allocateRoom(studentId, roomNumber, fromDate, toDate);
        res.json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get room allocations
exports.getRoomAllocations = catchAsync(async (req, res) => {
    const hostels = await Hostel.find().populate('rooms.occupants.student');
    
    const allocations = [];
    hostels.forEach(hostel => {
        hostel.rooms.forEach(room => {
            room.occupants.forEach(occupant => {
                if (occupant.status === 'Active') {
                    allocations.push({
                        hostelId: hostel._id,
                        hostelName: hostel.name,
                        roomNumber: room.roomNumber,
                        roomType: room.type,
                        student: occupant.student,
                        fromDate: occupant.fromDate,
                        toDate: occupant.toDate
                    });
                }
            });
        });
    });
    
    res.json(allocations);
});