const easing = [.14, .66, .48, 1];

export const galleryVariant = {
  galleryStart: {
    y: 100,
    opacity: 0,
    // transition: {
    //   ease: "",
    //   duration: 0.3,
    // }
  },
  galleryEnter: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.2,
    }
  },
  galleryExit: {
    x: -500,
    opacity: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.2
    }
  }
};

export const aboutVariant = {
  aboutStart: {
    y: 50,
    opacity: 0,
    // transition: {
    // ease: easing,
    // duration: 0.4,
    // }
  },
  aboutEnter: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [.06, .57, .1, .98],
      duration: 0.6,
    }
  },
  aboutExit: {
    y: 160,
    opacity: 0,
    transition: {
      ease: [.78, .02, .85, .77],
      duration: 0.1
    }
  }
};