import React from 'react';
import '../../assets/css/main.css';
import img1 from '../../images/pic01.jpg';
import img2 from '../../images/pic02.jpg';
import img3 from '../../images/pic03.jpg';
import img4 from '../../images/pic04.jpg';
import img5 from '../../images/pic05.jpg';
import img6 from '../../images/pic06.jpg';
import img7 from '../../images/pic07.jpg';

const Landing = props => (
  <div>
    <div id="header">
      <span className="logo icon fa-paper-plane-o" />
      <h1>This is Fledge</h1>
      <p>
        A job application tracker for the fledgling professional
        <br />
      </p>
    </div>

    <div id="main">
      <header className="major container 75%">
        <h2>Because finding a job is hard enough.</h2>
      </header>

      <div className="box alt container">
        <section className="feature left">
          <img className="image icon gif" src="https://media.giphy.com/media/3ohjULQC6JaWjQRroc/giphy.gif"></img>

          <div className="content">
            <h3>Interactive Kanban</h3>
            <p>
              Our kanban design helps you organize your applications in a visual
              and intuitive way,
              <br />
              allowing you to keep track at a glance.
            </p>
          </div>
        </section>
        <section className="feature right">
          <a className="image icon fa-code">
            <img src={img2} alt="" />
          </a>
          <div className="content">
            <h3>Seamless Integration</h3>
            <p>
              The application process doesn't end once the application is
              submitted. Fledge integrates with your Google Calendar and Google
              Drive
              <br />
              to keep you up-to-date.
            </p>
          </div>
        </section>
        <section className="feature left">
          <a className="image icon fa-mobile">
            <img src={img3} alt="" />
          </a>
          <div className="content">
            <h3>Organized Contacts</h3>
            <p>
              We'll keep your contacts in one place.
              <br />
              This is networking made easier.
            </p>
          </div>
        </section>
      </div>
    </div>
    <div id="footer">
      <div className="container 75%" style={{ width: '100%' }}>
        <ul className="icons">
          <li>
            <a
              href="http://www.linkedin.com/in/arthurlee44"
              className="icon arthur"
            >
              <span className="label" />
            </a>
            <br /> Arthur Lee{' '}
          </li>
          <li>
            <a
              href="http://www.github.com/b-j-p"
              className="icon ben"
            >
              <span className="label" />
            </a>
            <br /> Benjamin Polansky{' '}
          </li>
          <li>
            <a
              href="http://www.linkedin.com/in/kristaabraham"
              className="icon krista"
            >
              <span className="label" />
            </a>
            <br /> Krista Abraham{' '}
          </li>
          <li>
            <a
              href="http://www.linkedin.com/in/iamgraceko"
              className="icon grace"
            >
              <span className="label" />
            </a>
            <br /> Grace Ko{' '}
          </li>
        </ul>
        <ul className="copyright">
          <li>&copy; Fledge. All rights reserved.</li>
          <li>
            <a
              href="https://sites.google.com/view/fledge-privacy"
              target="_blank"
            >
            Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Landing;
