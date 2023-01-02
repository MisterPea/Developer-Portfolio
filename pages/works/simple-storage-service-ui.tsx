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
        <p className={`project--features-description ${roboto.className}`}>Accessing S3 instances can be a time consuming process. This implementation looks to streamline the process of uploading and accessing your files.</p>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${RobotoSerif.className}`}>Features include:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Creation/deletion of buckets and folders.</li>
            <li>Upload/download/delete files through a dialog or drag and drop.</li>
            <li>Automatic renaming on files with the same name.</li>
            <li>Breadcrumb folder navigation</li>
            <li>Bucket and folder navigation is done via query string; allowing bookmarking and sharing.</li>
            <li>Usage across all screen sizes</li>
          </ul>
        </section>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${RobotoSerif.className}`}>Challenges:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Have localStack (a Docker-based system) properly communicate with my app (a separate, Docker-based application)</li>
            <li>Design a system/schema to take advantage of the object-based nature of S3.</li>
            <li>Handle multiple, simultaneous uploads</li>
            <li>Routing with Nginx</li>
            <li>Dragging/Dropping to subfolder path</li>
          </ul>
        </section>
      </div>
    </div>
  );
};