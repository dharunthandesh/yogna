import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-red-line" />

      <div className="footer-inner">
        <div className="footer-top" style={{ paddingTop: '80px' }}>
          {/* Brand */}
          <div>
            <div className="footer-brand">YOG<span>NA</span></div>
            <p style={{
              marginTop: '24px',
              fontSize: '13px',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '280px'
            }}>
              India&apos;s premier corporate hygiene solutions provider. Comprehensive, eco-friendly hygiene and sanitization systems for commercial, industrial, and institutional spaces.
            </p>
          </div>

          {/* Products */}
          <div className="footer-col">
            <p className="footer-col-title">Products</p>
            <ul>
              <li><Link href="/products?category=washroom-hygiene">Washroom Hygiene Solutions</Link></li>
              <li><Link href="/products?category=floor-cleaning-machines">Floor Cleaning Machines</Link></li>
              <li><Link href="/products?category=vacuum-cleaners">Vacuum Cleaners</Link></li>
              <li><Link href="/products?category=high-pressure-steam">High-Pressure &amp; Steam Cleaning</Link></li>
              <li><Link href="/products?category=janitorial-tools-consumables">Janitorial Tools &amp; Consumables</Link></li>
              <li><Link href="/products?category=pest-insect-control">Pest &amp; Insect Control</Link></li>
              <li><Link href="/products?category=sprayers-fogging">Sprayers &amp; Fogging Equipment</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <p className="footer-col-title">Contact</p>
            <ul>
              <li><a href="mailto:yogna09@gmail.com">yogna09@gmail.com</a></li>
              <li><a href="tel:+919176088989">+91 91760 88989</a></li>
              <li><a href="https://wa.me/919176088989" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <p className="footer-col-title">Info</p>
            <ul>
              <li><a href="#">About YOGNA</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 YOGNA Corporate Hygiene Solutions. All rights reserved.</p>
          <p className="footer-copy" style={{ opacity: 0.2 }}>Designed by TRIYO</p>
        </div>
      </div>
    </footer>
  );
}
