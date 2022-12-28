import { HiLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import NytIcon from '../../components/Icons/NytIcon';



export default function TopStories() {
  return (
    <div className="project--container">
      <div className='project--title-container'>
        <div className='project--title-inner_wrapper'>
          <div className='project--title_icon'>
            <NytIcon />
          </div>
          <h1 className="project--title">NY Times Aggregator</h1>
        </div>
      </div>
      <h2 className="project--subtitle">NY Times Top Stories combined with a daily email of user-selected top stories</h2>
      <nav className="project--links">
        <ul className='project--links-list'>
          <li className='project--links-item'>
            <HiLink size={20} />
            <a target='_blank' rel="noreferrer" href="https://thetimespage.misterpea.me">https://thetimespage.misterpea.me</a>
          </li>
          <li className='project--links-item'>
            <FaGithub size={20} />
            <a target='_blank' rel="noreferrer" href="https://github.com/MisterPea/NYTimes-Aggregator">https://github.com/MisterPea/NYTimes-Aggregator</a>
          </li>
        </ul>
      </nav>
      <div className="project--tools">
        <h4 className="project--tools-title">Tools<span><FiTool size={12} /></span>:</h4>
        <p className="project--tools-body">React.js, React Router, Material-UI, SCSS, Node/Express.js, Docker, Nginx, Firebase Auth, Firestore NoSQL, GCP Compute Engine, GCP Cloud Functions, GCP  Cloud Scheduler, Twilio Sendgrid
        </p>
      </div>
      <div className="project--features">
        <h3 className="project--features-title">The idea/features</h3>
        <p className="project--features-description">With the volume of news we have access to, it&apos;s easy to miss certain stories or topics. This application provides a way to view synopsis and subscribe to certain topics, which are delivered to your email every morning.</p>
        <section className="project--features-section">
          <h4 className="project--features-title_two">Features include:</h4>
          <ul className="project-features-list">
            <li>Email authentication.</li>
            <li>Browse articles by section.</li>
            <li>Ability to pause subscription.</li>
            <li>View and update subscriptions from one location</li>
          </ul>
        </section>
        <section className="project--features-section">
          <h4 className="project--features-title_two">Challenges:</h4>
          <ul className="project--features-list">
            <li>Not making excessive calls to the NY Times API when there are a large number of subscriptions.</li>
            <li>Flashing of content that isn&apos;t fully loaded - loading text when the images aren&apos;t loaded</li>
            <li>Deciding on the most appropriate method to interact with and play tasks.</li>
            <li>Tracking topics with similar words.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};