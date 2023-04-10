import React, { useState, useRef, useEffect } from "react";

import lottie from "lottie-web";

import animationData from "../utils/118202-success-icon.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "../blocks/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    message: "",
  });

  const [responseStatus, setResponseStatus] = useState(null);
  const animationContainer = useRef(null);

  const { email, firstname, lastname, message } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("http://localhost:3001/api/create-contact", requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          setResponseStatus(response.status);
          return response.json();
        } else {
          throw new Error("Server response was not ok.");
        }
      })
      .then((data) => {
        console.log(data);
        setFormData({
          email: "",
          firstname: "",
          lastname: "",
          message: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const isFormValid = email && firstname && lastname && message.length >= 1;

  useEffect(() => {
    console.log("useEffect called");
    if (responseStatus === 201) {
      const animation = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: animationData,
      });
      console.log("animation object created", animation);
      return () => {
        animation.destroy();
        console.log("animation destroyed");
      };
    }
  }, [responseStatus]);

  useEffect(() => {
    if (responseStatus !== 201) {
      // Reset the form fields if the response status changes
      setFormData({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
      });
    }
  }, [responseStatus]);

  return (
    <div className="contact-container" id="contact">
      <h2 className="contact-title">Contacta</h2>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input type="hidden" name="_csrf" value={formData._csrf} />
                  <div className="form-group contact-field">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                  </div>
                  <div className="form-group contact-field">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group contact-field">
                    <label>Apellidos</label>
                    <input
                      type="text"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group contact-field">
                    <label>Mensaje</label>
                    <textarea
                      name="message"
                      value={message}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      required
                      placeholder="Tienes 140 caracteres para contarme tu idea."
                      maxength="140"
                    ></textarea>
                  </div>
                  <div className="form-group btn-block">
                    <button
                      type="submit"
                      className="btn btn-primary "
                      disabled={!isFormValid}
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
              {responseStatus === 201 && (
                <div className="lottie-overlay">
                  <div
                    className="lottie-container"
                    ref={animationContainer}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
