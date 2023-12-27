import React from "react";

const Contact = () => {
  return (
    <>
      <div class="container py-3 contact">
        <div class="container-contact row justify-content-center gap-md-5">
          <div class="col-md-5 info-contact d-flex flex-column align-items-center justify-content-center">
            <div class="logo-contact w-50">
              <img src="logo/logo.svg" alt="" />
            </div>
            {/* <!-- <iframe
      width="100%"
      height="200"
      frameborder="0"
      style="border: 0"
      src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBxF39HLSMI2Rf8yLe_r2fPL-oMickNQKs&center=10.0158,105.4534&zoom=15"
      allowfullscreen
    ></iframe> --> */}

            <div class="title-contact">
              <p>Liên Hệ Chúng Tôi</p>
            </div>
            <div class="content-contact">
              <p>
                Khám phá thế giới sách tại trang web của chúng tôi! Đặt mua
                online dễ dàng và nhận sách tận nhà, đảm bảo chất lượng. Đọc,
                khám phá, và trải nghiệm với hàng nghìn tựa sách đa dạng.
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8482674281972!2d105.76639009118595!3d10.029377190383249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1700232712429!5m2!1svi!2s"
              width="100%"
              height="100%"
              //   style="border:0; border-radius: 10px;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div class="form-contact col-md-5 d-flex flex-column justify-content-center pt-md-5 pt-1">
            <h2>Contact Form</h2>
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="input-name-contact form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="input-email-contact form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">
                  Message
                </label>
                <textarea
                  class="input-message-contact form-control"
                  id="message"
                  rows="3"
                  placeholder="Type your message"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
