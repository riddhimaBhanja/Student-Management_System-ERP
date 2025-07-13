import React, { useState } from 'react';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    program: '',
    department: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianEmail: '',
    previousInstitution: '',
    previousQualification: '',
    previousPercentage: '',
    documents: {
      photo: null,
      idProof: null,
      previousMarksheet: null,
      domicileCertificate: null,
      characterCertificate: null
    }
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDocumentChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [name]: files[0]
      }
    });
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
    } else if (stepNumber === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    } else if (stepNumber === 3) {
      if (!formData.program.trim()) newErrors.program = 'Program is required';
      if (!formData.department.trim()) newErrors.department = 'Department is required';
    } else if (stepNumber === 4) {
      if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
      if (!formData.guardianRelation.trim()) newErrors.guardianRelation = 'Guardian relation is required';
      if (!formData.guardianPhone.trim()) newErrors.guardianPhone = 'Guardian phone is required';
      else if (!/^\d{10}$/.test(formData.guardianPhone)) newErrors.guardianPhone = 'Phone number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      // Here you would typically send the data to your backend API
      console.log('Form submitted:', formData);
      alert('Registration submitted successfully!');
      // Reset form or redirect
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Student Registration & Admission</h1>
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex mb-2">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div key={stepNumber} className="flex-1 text-center">
              <div 
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
              >
                {stepNumber}
              </div>
              <div className={`text-xs mt-1 ${step >= stepNumber ? 'text-blue-600' : 'text-gray-500'}`}>
                {stepNumber === 1 && 'Personal'}
                {stepNumber === 2 && 'Address'}
                {stepNumber === 3 && 'Academic'}
                {stepNumber === 4 && 'Guardian'}
                {stepNumber === 5 && 'Documents'}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address Information */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Address Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Address Line *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Academic Information */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Program *</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.program ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Program</option>
                  <option value="btech">B.Tech</option>
                  <option value="mtech">M.Tech</option>
                  <option value="bca">BCA</option>
                  <option value="mca">MCA</option>
                  <option value="bba">BBA</option>
                  <option value="mba">MBA</option>
                </select>
                {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Department</option>
                  <option value="cse">Computer Science & Engineering</option>
                  <option value="ece">Electronics & Communication Engineering</option>
                  <option value="ee">Electrical Engineering</option>
                  <option value="me">Mechanical Engineering</option>
                  <option value="ce">Civil Engineering</option>
                  <option value="business">Business Administration</option>
                </select>
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Previous Institution</label>
                <input
                  type="text"
                  name="previousInstitution"
                  value={formData.previousInstitution}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Previous Qualification</label>
                <input
                  type="text"
                  name="previousQualification"
                  value={formData.previousQualification}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Previous Percentage/CGPA</label>
                <input
                  type="text"
                  name="previousPercentage"
                  value={formData.previousPercentage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Guardian Information */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Guardian Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Guardian Name *</label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.guardianName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Relation *</label>
                <input
                  type="text"
                  name="guardianRelation"
                  value={formData.guardianRelation}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.guardianRelation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.guardianRelation && <p className="text-red-500 text-xs mt-1">{errors.guardianRelation}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="text"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.guardianPhone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.guardianPhone && <p className="text-red-500 text-xs mt-1">{errors.guardianPhone}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="guardianEmail"
                  value={formData.guardianEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Document Upload */}
        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Document Upload</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Passport Size Photo</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleDocumentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">ID Proof (Aadhar/PAN/Passport)</label>
                <input
                  type="file"
                  name="idProof"
                  onChange={handleDocumentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  accept="image/*, application/pdf"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Previous Marksheet</label>
                <input
                  type="file"
                  name="previousMarksheet"
                  onChange={handleDocumentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  accept="image/*, application/pdf"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Domicile Certificate</label>
                <input
                  type="file"
                  name="domicileCertificate"
                  onChange={handleDocumentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  accept="image/*, application/pdf"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Character Certificate</label>
                <input
                  type="file"
                  name="characterCertificate"
                  onChange={handleDocumentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  accept="image/*, application/pdf"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentRegistration;