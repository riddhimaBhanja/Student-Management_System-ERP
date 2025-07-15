const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');
const hostelController = require('../controllers/hostel.controller');

// Hostel routes
router.get('/', authorizeRole(['admin', 'staff']), hostelController.getAllHostels);
router.get('/:id', authorizeRole(['admin', 'staff']), hostelController.getHostelById);
router.post('/', authorizeRole(['admin']), hostelController.createHostel);
router.put('/:id', authorizeRole(['admin']), hostelController.updateHostel);
router.delete('/:id', authorizeRole(['admin']), hostelController.deleteHostel);

// Room routes
router.get('/rooms', authorizeRole(['admin', 'staff']), hostelController.getAllRooms);
router.get('/:hostelId/rooms/:roomNumber', authorizeRole(['admin', 'staff']), hostelController.getRoomByNumber);
router.post('/:hostelId/rooms', authorizeRole(['admin']), hostelController.addRoom);
router.put('/:hostelId/rooms/:roomNumber', authorizeRole(['admin']), hostelController.updateRoom);
router.delete('/:hostelId/rooms/:roomNumber', authorizeRole(['admin']), hostelController.deleteRoom);

// Allocation routes
router.get('/allocations', authorizeRole(['admin', 'staff']), hostelController.getRoomAllocations);
router.post('/:hostelId/rooms/:roomNumber/allocate', authorizeRole(['admin']), hostelController.allocateRoom);

module.exports = router;
