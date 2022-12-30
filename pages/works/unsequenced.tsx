import { HiLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import { RobotoSerif, roboto } from '../../helpers/fonts';


export default function Unsequenced() {
  return (
    <div className="project--container">
      <div className='project--title-container'>
        <h1 className={`project--title ${RobotoSerif.className}`}>Unsequenced</h1>
        <h2 className={`project--subtitle ${roboto.className}`}>A Pomodoro Technique-inspired task/timer app for iOS devices.</h2>
      </div>
      <div className='project--dotted_line' />
      <nav className="project--links">
        <ul className={`project--links-list ${roboto.className}`}>
          <li className='project--links-item'>
            <HiLink size={20} />
            <a target='_blank' rel="noreferrer" href="#">
              Beta testing - Click to Request a Link.
            </a>
          </li>
          <li className='project--links-item'>
            <FaGithub size={20} />
            <a target='_blank' rel="noreferrer" href="https://github.com/MisterPea/Unsequenced">https://github.com/MisterPea/Unsequenced</a>
          </li>
        </ul>
      </nav>
      <div className='project--dotted_line' />
      <div className="project--tools">
        <h3 className={`project--tools-title ${RobotoSerif.className}`}>Tools</h3>
        <p className={`project--tools-body ${roboto.className}`}>Adobe XD, Adobe Illustrator, React, React-Native, Expo, Redux/Toolkit, TypeScript, Jest</p>
      </div>
      <div className='project--dotted_line' />
      <div className="project--features">
        <h3 className={`project--features-title ${RobotoSerif.className}`}>The idea/features</h3>
        <p className={`project--features-description ${roboto.className}`}>A time/task management app inspired by the Pomodoro Technique. In the fight for our attention and productivity, the Pomodoro Technique is often prescribed as a way to reclaim time and regain focus. This app allows you to take the Pomodoro concept and enumerate it.</p>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${RobotoSerif.className}`}>Features include:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Notifications when a Task has completed; when the app is in foreground or background.</li>
            <li>All user info and progress is held locally, on the user&apos;s device.</li>
            <li>Ability to automatically add breaks between tasks, as well as reorder and modify tasks after they&apos;re added.</li>
          </ul>
        </section>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${RobotoSerif.className}`}>Challenges:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Handling notifications and task activities when the app goes to, or returns from the background.</li>
            <li>Triggering notifications at the appropriate times. For example: when the task has expired, but not when you mark it complete or when it is restarted from zero.</li>
            <li>Deciding on the most appropriate method to interact with and play tasks.</li>
            <li>Nesting swipe-ability within a drag and drop context.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};