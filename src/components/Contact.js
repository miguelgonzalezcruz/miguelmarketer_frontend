import React, { useState, useRef, useEffect } from "react";

import lottie from "lottie-web";

import animationData from "../utils/118202-success-icon.json";

const Contact = () => {
  // const baseURL =
  //   process.env.NODE_ENV === "production"
  //     ? "https://api.miguelmarketer.com"
  //     : "http://localhost:3001";

  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    message: "",
    website: "",
  });

  const [responseStatus, setResponseStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const animationContainer = useRef(null);

  const { email, firstname, lastname, message } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch("/api/create-contact", requestOptions);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Server response was not ok.");
      }

      setResponseStatus(response.status);
      setFormData({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        website: "",
      });
    } catch (error) {
      console.error(error);
      setSubmitError(
        "No se pudo enviar el mensaje. Escríbeme por LinkedIn o inténtalo de nuevo en unos minutos."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = email && firstname && lastname && message.length >= 1;

  useEffect(() => {
    let animation;
    if (responseStatus === 201) {
      animation = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false, // Ensure the animation doesn’t loop
        autoplay: true,
        animationData: animationData,
      });

      animation.addEventListener("complete", () => {
        setResponseStatus(null); // Reset status to hide animation
      });

      return () => {
        if (animation) {
          animation.destroy();
        }
      };
    }
  }, [responseStatus]);

  return (
    <div className="contact-container" id="contact">
      <h2 className="contact-title">Contacto</h2>
      <p className="contact-subtitle">
        Si buscas liderazgo de marketing con impacto real en negocio, cuenta tu
        contexto y te respondo personalmente.
      </p>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="contact-card">
              <div className="card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    className="contact-honeypot"
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={(e) => handleChange(e)}
                    autoComplete="off"
                    tabIndex="-1"
                    aria-hidden="true"
                  />
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
                      placeholder="¿En qué puedo ayudarte?"
                      maxLength="500"
                    ></textarea>
                  </div>
                  <div className="form-group btn-block">
                    <button
                      type="submit"
                      className="btn btn-primary "
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Solicitar conversación"}
                    </button>
                  </div>
                  {submitError && (
                    <p className="contact-error-message" aria-live="polite">
                      {submitError}
                    </p>
                  )}
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
