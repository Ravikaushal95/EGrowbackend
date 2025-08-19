import React from "react";
const ContactUs = () => {
  return (
    <div className="contact-wrapper py-5 px-3">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Get In Touch</h2>
        <p className="text-muted">
          We'll create high-quality linkable content and build at least 40 high-authority links to each asset,
          paving the way for you to grow your rankings, improve brand.
        </p>
      </div>

      <div className="container shadow-lg rounded-4 p-4 bg-white contact-box mb-5">
        <div className="row g-4">
          {/* Left Side - Contact Info */}
          <div className="col-lg-4 bg-info text-white rounded-4 p-4 contact-info">
            <h5 className="fw-bold mb-3">Contact Information</h5>
            <p>We’ll create high-quality linkable content and build at least 40 high-authority.</p>
            <p className="mb-1"><strong>📞</strong> 9580106102</p>
            <p className="mb-1"><strong>📞</strong> 8756117218</p>
            <p className="mb-1"><strong>✉️</strong> ravikaushal1109@gmailcom</p>
            <p><strong>📍</strong> Uttar Pradesh, India</p>
          </div>

          {/* Right Side - Form */}
          <div className="col-lg-8">
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Your Name</label>
                  <input type="text" className="form-control border-bottom" placeholder="John Trangely" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Your Email</label>
                  <input type="email" className="form-control border-bottom" placeholder="hello@nurency.com" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Your Subject</label>
                <input type="text" className="form-control border-bottom" placeholder="I want to hire you quickly" />
              </div>

              <div className="mb-4">
                <label className="form-label">Message</label>
                <textarea className="form-control border-bottom" rows="3" placeholder="Write here your message"></textarea>
              </div>

              <button type="submit" className="btn btn-info text-white px-4">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="container mb-5">
        <h5 className="text-center mb-3">Our Location - Piedocx Technology Pvt Ltd</h5>
        <div className="ratio ratio-16x9 rounded-4 shadow-sm overflow-hidden">
          <iframe
            title="Piedocx Technology Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4470999270657!2d80.94605797468293!3d26.889302176661186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999575c2996f68b%3A0xb2d359cc67ce5fe5!2sPiedocx%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1753613111335!5m2!1sen!2sin"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-center mt-4">
        <small className="d-block">Terms | Privacy | Cookies</small>
        <div className="social-icons mt-2">
          <i className="bi bi-linkedin mx-2"></i>
          <i className="bi bi-facebook mx-2"></i>
          <i className="bi bi-twitter mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
