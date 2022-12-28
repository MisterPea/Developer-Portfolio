import { HiLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import { default as Icon } from '../../components/Icons/Unsequenced';
import ArtIcon from '../../components/Icons/ArtIcon';


export default function FineArtPortfolio() {
  return (
    <div className="project--container">
      <div className='project--title-container'>
        <div className='project--title-inner_wrapper'>
          <div className='project--title_icon'>
            <ArtIcon />
          </div>
          <h1 className="project--title">Fine Art Portfolio with CMS</h1>
        </div>
      </div>
      <h2 className="project--subtitle">Image portfolio and CMS that allows the user to upload and crop images for thumbnails, as well as add naming.</h2>
      <nav className="project--links">
        <ul className='project--links-list'>
          <li className='project--links-item'>
            <HiLink size={20} />
            <a target='_blank' rel="noreferrer" href="https://www.perryangelora.com">https://perryangelora.com</a>
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
      <div className="project--tools">
        <h4 className="project--tools-title">Tools<span><FiTool size={12} /></span>:</h4>
        <p className="project--tools-body">Next.js/React.js, SCSS, Framer-Motion, Github-Auth, AWS S3 Client v3</p>
      </div>
      <div className="project--features">
        <h3 className="project--features-title">The idea/features</h3>
        <p className="project--features-description">Create an uncomplicated viewer for fine-art images. Additionally, have a way to add/update/remove images via a CMS.</p>
        <section className="project--features-section">
          <h4 className="project--features-title_two">Features include:</h4>
          <ul className="project-features-list">
            <li>Ability to upload and crop images, and tag them with a title and specs (medium dimensions).</li>
            <li>Images are able to be ordered via drag-reorder.</li>
            <li>Load appropriate image sizes per screen size.</li>
            <li>Image data is stored via dynamically created JSON file.</li>
          </ul>
        </section>
        <section className="project--features-section">
          <h4 className="project--features-title_two">Challenges:</h4>
          <ul className="project--features-list">
            <li>Incrementally saving reordered images without explicitly pressing a save button</li>
            <li>Updating images on the build to allow the usage of blurHash.</li>
            <li>Compilation errors with SWC - had to downgrade to a previous canary version.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};