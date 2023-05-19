import ProjectData from '../../public/workPagesContent.json';
import { Params, ProjectDataProps } from '../../helpers/types';
import { HiLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { RobotoSerif, roboto } from '../../helpers/fonts';
import { motion } from 'framer-motion';
import LightboxURL from '../../components/Lightbox/LightboxURL';
import Head from 'next/head';

export default function Project({ projectData }: { projectData: ProjectDataProps; }) {
  const { title, tools, subTitle, links, ideaFeatures, featuresInclude, challenges, productImages, projectSlug } = projectData;

  return (
    <>
      <Head>
        <title>{`${title} | Perry's Portfolio`}</title>
        <meta name="description" content={`${title} - ${subTitle}`} key="description" />
        <meta name="keywords" content={`Tools:${tools}`} key="keywords" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0 viewport-fit=cover" />
        <meta name="theme-color" content="#303030" />
        <meta name="google-site-verification" content="verification_token" />
        <meta name="robots" content="max-snippet:-1" key="bot-one" />
        <meta name="robots" content="noimageindex" key="bot-two" />
        <meta name="robots" content="nositelinkssearchbox" key="bot-three" />
        <meta property="og:title" content={`${title} | Perry's Portfolio`} key="og-title" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://misterpea.me/works/${projectSlug}`} key="og-url" />
        <meta property="og:description" content={`${title} - ${subTitle}`} key="og-description" />
        <meta property="og:image" content="/images/misterpea.me-og-image.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#303030" />
      </Head>
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
                {<a href={`${link.url}`} target='_blank' rel="noreferrer">{link.title}</a>}
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
        <div className='project--dotted_line' />
        <section className="project--images-section">
          <h3 className={`project--images-title ${RobotoSerif.className}`}>Project Images:</h3>
          <LightboxURL imageList={productImages} nextFontAccess={roboto.className} />
        </section>
        <div className='project--dotted_line mobile' />
      </motion.div>
    </>
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


