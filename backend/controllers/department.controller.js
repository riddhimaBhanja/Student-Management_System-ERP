const Department = require('../models/department.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllDepartments = catchAsync(async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

exports.getDepartmentById = catchAsync(async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }
  res.json(department);
});

exports.createDepartment = catchAsync(async (req, res) => {
  const department = new Department(req.body);
  const newDepartment = await department.save();
  res.status(201).json(newDepartment);
});

exports.updateDepartment = catchAsync(async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }

  Object.assign(department, req.body);
  const updatedDepartment = await department.save();
  res.json(updatedDepartment);
});

exports.deleteDepartment = catchAsync(async (req, res) => {
  const department = await Department.findByIdAndDelete(req.params.id);
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }
  res.json({ message: 'Department deleted successfully' });
});