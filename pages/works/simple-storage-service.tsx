import { HiLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import S3UI from '../../components/Icons/S3UI';


export default function SimpleStorageService() {
  return (
    <div className="project--container">
      <div className='project--title-container'>
        <div className='project--title-inner_wrapper'>
          <div className='project--title_icon'>
            <S3UI />
          </div>
          <h1 className="project--title">S3-UI</h1>
        </div>
      </div>
      <h2 className="project--subtitle">A full-stack UI for AWS&apos;s Simple Storage Service.</h2>
      <nav className="project--links">
        <ul className='project--links-list'>
          <li className='project--links-item'>
            <HiLink size={20} />
            <a target='_blank' rel="noreferrer" href="https://objectui.misterpea.me">https://objectui.misterpea.me</a>
          </li>
          <li className='project--links-item'>
            <FaGithub size={20} />
            <a target='_blank' rel="noreferrer" href="https://github.com/MisterPea/s3-ui">https://github.com/MisterPea/s3-ui</a>
          </li>
        </ul>
      </nav>
      <div className="project--tools">
        <h4 className="project--tools-title">Tools<span><FiTool size={12} /></span>:</h4>
        <p className="project--tools-body">Adobe XD, Adobe Illustrator, React.js, SCSS, React-Router, Framer-Motion, Redux, Node/Express.js, AWS S3 Client v3, Docker, Nginx, GCP Compute Engine, localStack, Jest/Enzyme, Github Actions</p>
      </div>
      <div className="project--features">
        <h3 className="project--features-title">The idea/features</h3>
        <p className="project--features-description">Accessing S3 instances can be a time consuming process. This implementation looks to streamline the process of uploading and accessing your files.</p>
        <section className="project--features-section">
          <h4 className="project--features-title_two">Features include:</h4>
          <ul className="project-features-list">
            <li>Creation/deletion of buckets and folders.</li>
            <li>Upload/download/delete files through a dialog or drag and drop.</li>
            <li>Automatic renaming on files with the same name.</li>
            <li>Breadcrumb folder navigation.</li>
            <li>Bucket and folder navigation is done via query string; allowing bookmarking and sharing.</li>
            <li>Usage across all screen sizes.</li>

          </ul>
        </section>
        <section className="project--features-section">
          <h4 className="project--features-title_two">Challenges:</h4>
          <ul className="project--features-list">
            <li>Have localStack (a Docker-based system) properly communicate with my app (a separate, Docker-based application).</li>
            <li>Design a system and schema to take advantage of the object-based nature of S3.</li>
            <li>Handle multiple, simultaneous uploads.</li>
            <li>Routing with Nginx.</li>
            <li>Dragging/Dropping to subfolder path.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};