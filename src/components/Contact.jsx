import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faComment } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields before submitting.");
      return;
    }
    setLoading(true);
    console.log(form.name,"fff")

    emailjs
      .send(
        'service_9bwrt6a',
        'template_e6wntff',
        {
          from_name: form.name,
          to_name: "Pramod Morthala",
          from_email: form.email,
          to_email: "pramod.morthala@gmail.com",
          message: form.message,
        },
        "R4unlK7pgJjG6kV-e"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

 const openLinkedInProfile = () => {
    window.open("https://www.linkedin.com/in/pramodmorthala/", "_blank");
  };
  const d = new Date();
  let year = d.getFullYear();

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden no-select`}>
      <motion.div variants={slideIn("left", "tween", 0.2, 1)} className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>
              <FontAwesomeIcon icon={faUser} color="#915EFF"/> Name
            </span>
            <input
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>
              <FontAwesomeIcon icon={faEnvelope} color="#915EFF"/> Email
            </span>
            <input
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>
              <FontAwesomeIcon icon={faComment} color="#915EFF"/> Message
            </span>
            <textarea
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="Hey Pramod, love the website! I'd like to chat about some opportunities you might like! 🎉"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <button
            type='submit'
            className='bg-purple-600 text-white py-4 px-6 rounded-lg font-medium'
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          <label className="flex flex-col">
            <p className="text-center" style={{ color: "#7C7E80" }}>
              Copyright &copy; {year}  Pramod Morthala's Portfolio <br />
              Designed and Developed by
              <a href="https://www.linkedin.com/in/pramodmorthala/">
                <strong> Pramod Morthala.</strong>
              </a>
            </p>
          </label>
        </form>
      </motion.div>

      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
        <EarthCanvas />
      </motion.div>
    </div>
  ); 
};

export default SectionWrapper(Contact, "contact");
