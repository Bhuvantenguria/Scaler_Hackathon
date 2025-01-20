import React from 'react'
import Layout from '../componenets/layout/Layout'

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h3>Privacy Policy</h3>
          <p>This website is committed to protecting your privacy. We will only use...</p>
          <p>...information that we collect about you lawfully (in accordance with the Data Protection Act...</p>
          <p>We may collect information about you for 2 reasons: firstly, to process your order...</p>

        </div>
      </div>
    </Layout>
  );
};

export default Policy