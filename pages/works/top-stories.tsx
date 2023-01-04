import { HiLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { RobotoSerif, roboto } from '../../helpers/fonts';

export default function TopStories() {
  return (
    <div className="project--container">
      <div className='project--title-container'>
        <h1 className={`project--title ${RobotoSerif.className}`}>NY Times Aggregator & Daily Email Subscription</h1>
        <h2 className={`project--subtitle ${roboto.className}`}>NY Times Top Stories combined with a daily email of user-selected top stories.</h2>
      </div>
      <div className='project--dotted_line' />
      <nav className="project--links">
        <ul className={`project--links-list ${roboto.className}`}>
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
      <div className='project--dotted_line' />
      <div className="project--tools">
        <h3 className={`project--tools-title ${RobotoSerif.className}`}>Tools</h3>
        <p className={`project--tools-body ${roboto.className}`}>React.js, React Router, Material-UI, SCSS, Node/Express.js, Docker, Nginx, Firebase Auth, Firestore NoSQL, GCP Compute Engine, GCP Cloud Functions, GCP  Cloud Scheduler, Twilio Sendgrid</p>
      </div>
      <div className='project--dotted_line' />
      <div className="project--features">
        <h3 className={`project--features-title ${RobotoSerif.className}`}>The idea/features</h3>
        <p className={`project--features-description ${roboto.className}`}>News can be overwhelming and it can be easy to miss certain stories or topics that are important to us. This portal allows you to view synopses of articles and subscribe to topics that matter to you. Each morning, you&apos;ll receive an email with updates on the topics you&apos;ve subscribed to, so you can stay informed on the issues that are important to you.</p>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${roboto.className}`}>Features include:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Email authentication</li>
            <li>Browse articles by section/subsection.</li>
            <li>Ability to pause subscription.</li>
            <li>View and update subscriptions and preferences from a single location.</li>
          </ul>
        </section>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${roboto.className}`}>Challenges:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Ensuring efficient use of the NY Times API, particularly when handling a large number of subscriptions.</li>
            <li>Avoiding the flashing of incomplete content, such as text appearing before images have finished loading.</li>
            <li>Accurately tracking and categorizing articles by topic, particularly when topics have similar or overlapping keywords.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};