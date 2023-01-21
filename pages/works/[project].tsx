import ProjectData from '../../public/workPagesContent.json';
import { Params, ProjectDataProps } from '../../helpers/types';
import { HiLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { RobotoSerif, roboto } from '../../helpers/fonts';
import { motion } from 'framer-motion';


export default function Project({ projectData }: { projectData: ProjectDataProps; }) {
  const { title, tools, subTitle, links, ideaFeatures, featuresInclude, challenges } = projectData;
  return (
    <motion.div className='project--container'>
      <div className='project--title-container'>
        <h1 className={`project--title ${RobotoSerif.className}`}>{title}</h1>
        <h2 className={`project--subtitle ${roboto.className}`}>{subTitle}</h2>
      </div>
      <div className='project--dotted_line' />
      <nav className="project--links">
        <ul className={`project--links-list ${roboto.className}`}>
          {links.map((link, index) => (
            <li key={`${link.url}${index}`} className='project--links-item'>
              {link.icon === 'link' ? <HiLink size={20} /> : <FaGithub size={20} />}
              <a target='_blank' rel="noreferrer" href={`${link.url}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className='project--dotted_line' />
      <div className="project--tools">
        <h3 className={`project--tools-title ${RobotoSerif.className}`}>Tools:</h3>
        <p className={`project--tools-body ${roboto.className}`}>{tools}</p>
      </div>
      <div className='project--dotted_line' />
      <div className="project--features">
        <h3 className={`project--features-title ${RobotoSerif.className}`}>The idea/features:</h3>
        <p className={`project--features-description ${roboto.className}`}>{ideaFeatures}</p>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${roboto.className}`}>Features include:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            {featuresInclude.map((feature, index) => (
              <li key={`feature-${index}`}>{feature}</li>
            ))}
          </ul>
        </section>
        <section className="project--features-section">
          <h4 className={`project--features-title_two ${roboto.className}`}>Challenges:</h4>
          <ul className={`project--features-list ${roboto.className}`}>
            {challenges.map((challenge, index) => (
              <li key={`challenge-${index}`}>{challenge}</li>
            ))}
          </ul>
        </section>
      </div>
    </motion.div>
  );
}


export async function getStaticProps({ params }: Params) {
  const projectData = ProjectData.find(({ projectSlug }) => projectSlug === params.project);
  return {
    props: {
      projectData
    }
  };
}

export async function getStaticPaths() {
  const paths = ProjectData.map(({ projectSlug }) => (
    {
      params: {
        project: projectSlug
      }
    }
  ));

  return {
    paths,
    fallback: false
  };
}


