import React, { useState } from "react";
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

const EnqueryForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    message: "",
    check: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      tempErrors.email = "Invalid email format.";
    if (!formData.phone) tempErrors.phone = "Phone Number is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      tempErrors.phone = "Phone Number must be 10 digits.";
    if (!formData.course) tempErrors.course = "Please select a course.";
    if (!formData.message) tempErrors.message = "Message/Remarks are required.";
    if (!formData.check) tempErrors.check = "You must agree to the terms.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const docRef = await addDoc(collection(db, "enquiries"), formData);
        console.log("Document written with ID: ", docRef.id);

        alert("Form submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          course: "",
          message: "",
          check: false,
        });
        setErrors({});
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to submit the form. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
        <h2 style={{textAlign:"center",marginTop:"1em", marginBottom:"1em"}}>ADMISSION ENQUIRY PAGE</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-3" style={{marginTop:"2em"}}>
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Course Interested In
          </label>
          <select
            className="form-control"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Select a course</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
          {errors.course && <div className="text-danger">{errors.course}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message/Remarks
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <div className="text-danger">{errors.message}</div>}
        </div>


        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            name="check"
            checked={formData.check}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
          {errors.check && <div className="text-danger">{errors.check}</div>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EnqueryForm;
