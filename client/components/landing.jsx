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
        <span className="logo icon fa-paper-plane-o"></span>
        <h1>This is Fledge</h1>
        <p>An intuitive job application tracker for the fledgling professional
        <br />
        </p>
      </div>

      <div id="main">

        <header className="major container 75%">
          <h2>Finding a job is hard enough.
          <br />
          Fledge does the legwork for you
          <br />
          so you can focus on landing your dream job. </h2>

          <p>We should totally add something awesome<br />
            here in this little blurb.</p>

        </header>

        <div className="box alt container">
          <section className="feature left">
            <a href="#" className="image icon fa-signal"><img src={img1} alt="" /></a>
            <div className="content">
              <h3>Interactive Kanban</h3>
              <p>Our kanban design helps you organize your applications in a visual and intuitive away, allowing you to keep track at a glance.</p>
            </div>
          </section>
          <section className="feature right">
            <a href="#" className="image icon fa-code"><img src={img2} alt="" /></a>
            <div className="content">
              <h3>Proactive Reminders</h3>
              <p>The application process doesn't end once the application is submitted. Fledge seamelessly integrates with your Google calendar to help you stay on top of all your applications.</p>
            </div>
          </section>
          <section className="feature left">
            <a href="#" className="image icon fa-mobile"><img src={img3} alt="" /></a>
            <div className="content">
              <h3>Insightful Metrics</h3>
              <p>We gather information from your applications to provide charts to help you understand various data points, including total application counts and status conversion rates.</p>
            </div>
          </section>
        </div>

        <footer className="major container 75%">
          <h3>Get shady with science</h3>
          <p>Vitae natoque dictum etiam semper magnis enim feugiat amet curabitur tempor orci penatibus. Tellus erat mauris ipsum fermentum etiam vivamus.</p>
          <ul className="actions">
            <li><a href="#" className="button">Join our crew</a></li>
          </ul>
        </footer>

      </div>
      <div id="footer">
        <div className="container 75%">

          <header className="major last">
            <h2>Questions or comments?</h2>
          </header>

          <p>Vitae natoque dictum etiam semper magnis enim feugiat amet curabitur tempor
          orci penatibus. Tellus erat mauris ipsum fermentum etiam vivamus.</p>

          <form method="post" action="#">
            <div className="row">
              <div className="6u 12u(mobilep)">
                <input type="text" name="name" placeholder="Name" />
              </div>
              <div className="6u 12u(mobilep)">
                <input type="email" name="email" placeholder="Email" />
              </div>
            </div>
            <div className="row">
              <div className="12u">
                <textarea name="message" placeholder="Message" rows="6"></textarea>
              </div>
            </div>
            <div className="row">
              <div className="12u">
                <ul className="actions">
                  <li><input type="submit" value="Send Message" /></li>
                </ul>
              </div>
            </div>
          </form>

          <ul className="icons">
            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
          </ul>

          <ul className="copyright">
            <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>

        </div>
      </div>
    </div>
);
export default Landing;
