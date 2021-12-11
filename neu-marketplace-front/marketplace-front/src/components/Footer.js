import React from 'react';

export default function Footer() {
    return (
            <div class="footer">
                <div class="footer-content">
                    <div class="footer-section about">

                        <h1 class="logo-text"><span>Boston Student </span>Marketplace</h1>
                        <p>
                            Serving Students Better!
                        </p>
                        <div class="contact">
                            <span><i class="fas fa-phone"></i>&nbsp; 617-373-3499</span>
                            <span><i class="fas fa-envelope"></i>&nbsp; info@bsmarketplace.com</span>
                        </div>
                        <div class="socials">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div class="footer-section contact-form">
                        <h2>Contact Us</h2>
                        <br />
                        <form action="index.html" method="post">
                            <input type="email" name="email" class="text-input contact-input" placeholder="Your Email Address..." />
                            <input style ={{marginLeft:"5%"}}name="message" class="text-input contact-input" placeholder="Your Message.." />
                            <br />
                        <button type="submit" class="btn btn-big"><span></span>Send</button>
                        </form>
                </div>
            </div>
            <div class="footer-bottom">
                &copy;bostonstudentmarketplace.com | Designed by the Boston Student Marketplace Team
  </div>
</div >
    );
}
