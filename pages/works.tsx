import ProjectCard from '../components/ProjectCard';
import { roboto, RobotoSerif } from '../helpers/fonts';
import { motion } from 'framer-motion';
import { galleryVariant } from '../helpers/galleryVariants';
import ProjectData from '../public/workPagesContent.json';
import Head from 'next/head';

const container = {
  hidden: {
    y: 100,
    opacity: 0

  },
  show: {
    y: 0,
    ease: [.14, .66, .48, .98],
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.225,
    },
  }
};

const item = {
  hidden: {
    y: 100,
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: [.08, .6, .25, .98]

    },
    opacity: 0,
  },
  show: {
    y: 0,
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: [.08, .6, .25, .98]
    },
    opacity: 1,
  },
};

export default function Works() {

  return (
    <>
      <Head>
        <title>Perry&apos;s Portfolio</title>
        <meta name="description" content="Perry's Portfolio - Front-End Developer / Design Technologist / Jack of many trades: creator of user interfaces, experiences, and web applications." key="description" />
        <meta name="keywords" content="Front-End Development, React.js, Redux, TypeScript, Javascript (es6-es12), CSS, SCSS, HTML, UI Architecture, Test-Driven Development, React-Native, Node.js, Express.js, GIT, Adobe XD, Adobe Illustrator, Figma, Photoshop, JAMStack, AWS, GCP, Docker, Nginx, NoSQL, MySQL, MongoDB, Firebase, Firestore, Twilio Sendgrid, Next.js, Material-UI, Framer-Motion" key="keywords" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0 viewport-fit=cover" />
        <meta name="theme-color" content="#303030" />
        <meta name="google-site-verification" content="verification_token" />
        <meta name="robots" content="max-snippet:-1" key="bot-one" />
        <meta name="robots" content="noimageindex" key="bot-two" />
        <meta name="robots" content="nositelinkssearchbox" key="bot-three" />
        <meta property="og:title" content="Perry&apos;s Portfolio" key="og-title" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://misterpea.me" key="og-url" />
        <meta property="og:description" content="Perry's Portfolio - Front-End Developer / Design Technologist / Jack of many trades: creator of user interfaces, experiences, and web applications." key="og-description" />
        <meta property="og:image" content="/images/misterpea.me-og-image.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#303030" />
      </Head>
      <motion.div
        initial={galleryVariant.galleryStart}
        animate={galleryVariant.galleryEnter}
        exit={galleryVariant.galleryExit}
        variants={galleryVariant}
        className="works--container"
      >
        <div className={`header--title large ${RobotoSerif.className}` }>
          <h1 className='header--title-name' >Hi, I&apos;m Perry.</h1>
          <h1 className='header--title-sub_title'>Developer/Jack of Many Trades...</h1>
        </div>
        <p className={`works--header ${roboto.className}`}>Here&apos;s a selection of some recent projects.</p>
        <div className="works--dotted_line" />
        <div className='works--cards-container'>
          <motion.ul
            variants={container}
            initial='hidden'
            animate='show'
            className="works--cards-list">
            {ProjectData.map(({
              mainImages,
              title,
              mainPageDescription,
              projectSlug }, index) => (
              <motion.li
                variants={item}
                className="works--card-item"
                key={`project-${index}`}
              >
                <ProjectCard
                  title={title}
                  topDesc={mainPageDescription}
                  projectSlug={projectSlug}
                  mainImages={mainImages}
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </>
  );
}