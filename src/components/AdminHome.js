import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/adminLogin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "enquiries"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnquiries(data);
        setFilteredEnquiries(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = enquiries.filter(
      (enquiry) =>
        enquiry.fullName?.toLowerCase().includes(value) ||
        enquiry.email?.toLowerCase().includes(value) ||
        enquiry.course?.toLowerCase().includes(value)
    );
    setFilteredEnquiries(filtered);
  };

  if (loading) {
    return <p>Loading enquiries...</p>;
  }

  return (
    <>
      <div className="container mt-4">
        <h2>Admin Dashboard</h2>
        <h4 style={{textAlign:"end"}}>Enquiry Details</h4>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or course"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Course</th>
              <th scope="col">Phone</th>
              <th scope="col">Message</th>
              <th scope="col">Checked</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((enquiry, index) => (
                <tr key={enquiry.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{enquiry.fullName}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.course}</td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.message}</td>
                  <td>{enquiry.check ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminHome;
