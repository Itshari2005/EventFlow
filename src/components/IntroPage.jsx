import Img1 from '../assets/home_image_1.png'; // Add your image to assets
import { useNavigate } from 'react-router-dom';

const IntroPage = () => {

  const navigate = useNavigate();

  return (
    <div>
        {/* Header Section */}
        <div className='header-div'>
            <header className='header'>
                <div className='logo'>EventFlow</div>
                <div className='nav-buttons'>
                    <button className='sign-in' onClick={()=> navigate('/login')}>Sign In</button>
                    <button className='join-now' onClick={()=> navigate('/signup')}>Join Now</button>
                </div>
            </header>
       </div>
      {/* Intro Section */}
      <div className="intro-body">
        <div className="intro-text">
          <h1>
            Welcome to <span style={{ color: 'blue' }}>EventFlow</span>
          </h1>
          <p>
            Plan, organize, discover, register and participate in campus events. All in one place, easy to use and
            designed for college communities.
          </p>
        </div>
        <div className="intro-image">
          <img src={Img1} alt="Intro" />
        </div>
      </div>

      {/* Features Section */}
      <div className="intro-body-2">
        <h2>Everything you need</h2>
        <p className="intro-body-2-p">
          Our comprehensive event management system is designed to make campus events simple, organised and accessible
          for everyone.
        </p>
        <div className="intro-body-2-cards">
          <div className="intro-body-2-card">
            <h3>Event Discovery</h3>
            <p>Browse and discover technical, non-technical and other events happening on campus.</p>
          </div>
          <div className="intro-body-2-card">
            <h3>Easy Registration</h3>
            <p>Register for events with a single click and manage all your event participations in one place.</p>
          </div>
          <div className="intro-body-2-card">
            <h3>Role-Based Access</h3>
            <p>Different interfaces for students and teachers with appropriate permissions and features.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="intro-body-3">
        <div className="intro-body-text">
          <h3>Ready to Get Started?</h3>
          <p>Join our platform today and revolutionize how you handle campus events</p>
          <div className="intro-3-buttons">
            <button className="intro-3-sign-up" onClick={()=> navigate('/signup')}>Sign Up Now</button>
            <button className="intro-3-log-in" onClick={()=> navigate('/login')}>Log In</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <h2>EventFlow</h2>
          <p>
            Your gateway to seamless event management.
            <br />
            Plan, organize, and succeed effortlessly.
          </p>
          <p className="copyright">© 2025 EventFlow. All rights reserved.</p>
        </div>

        <div className="footer-right">
          <div className="footer-column">
            <h4>Platform</h4>
            <ul>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Centre</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntroPage;
