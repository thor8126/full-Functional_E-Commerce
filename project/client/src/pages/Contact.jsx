import React from "react";
import Layout from "../components/layout/Layout";
import { BiSupport, BiMailSend, BiPhoneCall } from "react-icons/bi";
import "./Pages_Css/Contact.css";
function Contact() {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="./images/contactus.jpg"
            alt="ContactUs"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 contact-card">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            necessitatibus voluptatibus eum excepturi
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@e-commerce.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 018-236598545
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-6589
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
