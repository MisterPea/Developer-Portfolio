const easing = [.14, .66, .48, 1];

export const galleryVariant = {
  galleryStart: {
    y: 10,
    opacity: 0,
    transition: {
      ease: easing,
      duration: 0.4,
    }
  },
  galleryEnter: {
    y: 0,
    opacity: 1,
    transition: {
      ease: easing,
      duration: 0.4,
    }
  },
  galleryExit: {
    y: -10,
    opacity: 0,
    transition: {
      ease: easing,
      duration: 0.5
    }
  }
};