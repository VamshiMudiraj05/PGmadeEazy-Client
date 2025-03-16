import React from 'react';

const Verification = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Verification & Agreement</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-gray-200">Government ID Type</label>
          <select
            name="govtIdType"
            value={formData.govtIdType}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
          >
            <option value="">Select ID Type</option>
            <option value="aadhar">Aadhar Card</option>
            <option value="pan">PAN Card</option>
          </select>
          {errors.govtIdType && <span className="text-red-500 text-sm">{errors.govtIdType}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">ID Number</label>
          <input
            type="text"
            name="govtIdNumber"
            value={formData.govtIdNumber}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
            placeholder="Enter your ID number"
          />
          {errors.govtIdNumber && <span className="text-red-500 text-sm">{errors.govtIdNumber}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
            placeholder="Enter emergency contact name"
          />
          {errors.emergencyContactName && <span className="text-red-500 text-sm">{errors.emergencyContactName}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-gray-200">Emergency Contact Number</label>
          <input
            type="tel"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black/50 border border-gray-700 text-white"
            placeholder="Enter emergency contact number"
          />
          {errors.emergencyContactNumber && <span className="text-red-500 text-sm">{errors.emergencyContactNumber}</span>}
        </div>

        <div className="col-span-2 space-y-1">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={(e) => handleChange({
                target: {
                  name: 'termsAgreed',
                  value: e.target.checked
                }
              })}
              className="mt-1"
            />
            <label className="text-gray-200">
              I agree to the Terms & Conditions and Privacy Policy. I understand that my personal information will be processed as described in the Privacy Policy.
            </label>
          </div>
          {errors.termsAgreed && <span className="text-red-500 text-sm">{errors.termsAgreed}</span>}
        </div>
      </div>
    </div>
  );
};

export default Verification;
