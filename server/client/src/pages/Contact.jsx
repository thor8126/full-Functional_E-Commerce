import React from "react";
import Layout from "../components/layout/Layout";
import { BiSupport, BiMailSend, BiPhoneCall } from "react-icons/bi";
import "./Pages_Css/Contact.css";

function Contact() {
  return (
    <Layout title={"Contact us"}>
      <div className="container mx-auto py-8">
        <div className="lg:flex">
          <div className="lg:w-6/12">
            <img
              src="./images/contactus.jpg"
              alt="ContactUs"
              className="w-full"
            />
          </div>
          <div className="lg:w-6/12 contact-card bg-dark text-white p-4">
            <h1 className="text-2xl text-center">CONTACT US</h1>
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
      </div>
    </Layout>
  );
}

export default Contact;
