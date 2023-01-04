import { HiLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { RobotoSerif, roboto } from '../../helpers/fonts';


export default function Unsequenced() {
  return (
    <div className="project--container">
      <div className='project--title-container'>
        <h1 className={`project--title ${RobotoSerif.className}`}>Fine Art Portfolio with CMS</h1>
        <h2 className={`project--subtitle ${roboto.className}`}>Image portfolio and a CMS that allows the user to upload an image and crop it for a thumbnail, as well as add a title and specs.</h2>
      </div>
      <div className='project--dotted_line' />
      <nav className="project--links">
        <ul className={`project--links-list ${roboto.className}`}>
          <li className='project--links-item'>
            <HiLink size={20} />
            <a target='_blank' rel="noreferrer" href="https://perryangelora.com">https://perryangelora.com</a>
          </li>
          <li className='project--links-item'>
            <HiLink size={20} />
            <a target='_blank' rel="noreferrer" href="https://cms.perryangelora.com">https://cms.perryangelora.com</a>
          </li>
          <li className='project--links-item'>
            <FaGithub size={20} />
            <a target='_blank' rel="noreferrer" href="https://github.com/MisterPea/Art-Portfolio">https://github.com/MisterPea/Art-Portfolio</a>
          </li>
        </ul>
      </nav>
      <div className='project--dotted_line' />
      <div className="project--tools">
        <h3 className={`project--tools-title ${RobotoSerif.className}`}>Tools</h3>
        <p className={`project--tools-body ${roboto.className}`}>Next.js/React.js, SCSS, Framer-Motion, Github-Auth, AWS S3 Client v3</p>
      </div>
      <div className='project--dotted_line' />
      <div className="project--features">
        <h3 className={`project--features-title ${RobotoSerif.className}`}>The idea/features</h3>
        <p className={`project--features-description ${roboto.className}`}>Create an uncomplicated viewer for fine-art images. Additionally, have a frictionless way to add/update/remove images via a CMS.</p>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${roboto.className}`}>Features include:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Image upload and cropping with the ability to add a title and specifications (such as medium and  dimensions).</li>
            <li>Drag-and-drop reordering of images.</li>
            <li>Responsive design that automatically loads appropriate image sizes for different screen sizes.</li>
            <li>Dynamic storage of image data using JSON.</li>
            <li>CMS functionality for easy management of portfolio content.</li>
          </ul>
        </section>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${roboto.className}`}>Challenges:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            <li>Implementing a system for incrementally saving the reordered images without requiring the user to press a save button.</li>
            <li>Updating the images during the build process to enable the use of blurHash.</li>
            <li>Debugging compilation errors related to SWC.</li>
            <li>Integrating the CMS functionality to allow for easy management of portfolio content.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};