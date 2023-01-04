import { HiLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { RobotoSerif, roboto } from '../../helpers/fonts';


export default function SimpleStorageServiceUI() {
  return (
    <div className="project--container">
      <div className='project--title-container'>
        <h1 className={`project--title ${RobotoSerif.className}`}>S3-UI</h1>
        <h2 className={`project--subtitle ${roboto.className}`}>A full-stack UI for AWS’s Simple Storage Service.</h2>
      </div>
      <div className='project--dotted_line' />
      <nav className="project--links">
        <ul className={`project--links-list ${roboto.className}`}>
          <li className='project--links-item'>
            <HiLink size={20} />
            <a target='_blank' rel="noreferrer" href="https://objectui.misterpea.me">
              https://objectui.misterpea.me
            </a>
          </li>
          <li className='project--links-item'>
            <FaGithub size={20} />
            <a target='_blank' rel="noreferrer" href="https://github.com/MisterPea/s3-ui">https://github.com/MisterPea/s3-ui</a>
          </li>
        </ul>
      </nav>
      <div className='project--dotted_line' />
      <div className="project--tools">
        <h3 className={`project--tools-title ${RobotoSerif.className}`}>Tools</h3>
        <p className={`project--tools-body ${roboto.className}`}>Adobe XD, Adobe Illustrator, React.js, React-Router, SCSS, Framer-Motion, Redux, Node/Express.js, AWS S3 Client v3, Docker, Nginx, GCP Compute Engine, localStack, Jest/Enzyme, Github Actions.</p>
      </div>
      <div className='project--dotted_line' />
      <div className="project--features">
        <h3 className={`project--features-title ${RobotoSerif.className}`}>The idea/features</h3>
        <p className={`project--features-description ${roboto.className}`}>Simplify the process of managing buckets, folders and files on an S3 instance. Accomplish this by removing the frictions involved in these transactions and packaging it in a simple, user friendly UI.</p>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${roboto.className}`}>Features include:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Easily create and delete buckets and folders.</li>
            <li>Upload files using a dialog or drag and drop feature.</li>
            <li>Intuitive file download and delete.</li>
            <li>Automatically renaming of uploaded files of the same name.</li>
            <li>Breadcrumb navigation to easily move between folders.</li>
            <li>Bucket and folder navigation is done via query string; allowing bookmarking and sharing.</li>
            <li>Access the app on any device, regardless of screen size.</li>
          </ul>
        </section>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${roboto.className}`}>Challenges:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Establishing proper communication between localStack (a Docker-based system) and the app (a separate, Docker-based application).</li>
            <li>Creating a system and schema that takes advantage of the object-based structure of S3.</li>
            <li>Managing multiple concurrent uploads.</li>
            <li>Routing issues with Nginx <code>(413 - Request Entity Too Large)</code></li>
            <li>Allowing for drag and drop functionality to subfolder paths.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};