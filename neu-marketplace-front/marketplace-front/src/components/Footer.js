import React from 'react';

export default function Footer() {
    return (
            <div class="footer">
                <div class="footer-content">
                    <div class="footer-section about">

                        <h1 class="logo-text"><span>NEU</span>Marketplace</h1>
                        <p>
                            Serving Huskies Better With Their Daily Needs!
                        </p>
                        <div class="contact">
                            <span><i class="fas fa-phone"></i>&nbsp; 123-456-7890</span>
                            <span><i class="fas fa-envelope"></i>&nbsp; info@neumarketplace.com</span>
                        </div>
                        <div class="socials">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div class="footer-section links">
                        <h2>Quick Links</h2>
                        <br />
                        <ul>
                            <a href="#">
                                <li>Events</li>
                            </a>
                            <a href="#">
                                <li>Our Team</li>
                            </a>
                            <a href="#">
                                <li>Blogs</li>
                            </a>
                        </ul>
                    </div>
                    <div class="footer-section contact-form">
                        <h2>Contact Us</h2>
                        <br />
                        <form action="index.html" method="post">
                            <input type="email" name="email" class="text-input contact-input" placeholder="Your Email Address..." />
                            <input name="message" class="text-input contact-input" placeholder="Your Message.." />
                            <br />
                        <button type="submit" class="btn btn-big"><span></span>Send</button>
                        </form>
                </div>
            </div>
            <div class="footer-bottom">
                &copy;neumarketplace.com | Designed by NEU Marketplace Team
  </div>
</div >
    );
}
