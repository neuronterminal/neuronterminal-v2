import { Variants } from 'framer-motion';
import { springs, easings } from './spring';

export const fadeIn: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings.smooth
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.smoothOut
    }
  }
};

export const slideUp: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.gentle
  },
  exit: { 
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: springs.snappy
  }
};

export const slideIn: Variants = {
  initial: { 
    opacity: 0,
    x: -20,
    scale: 0.98
  },
  animate: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: springs.gentle
  },
  exit: { 
    opacity: 0,
    x: -20,
    scale: 0.98,
    transition: springs.snappy
  }
};

export const scale: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.95
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: springs.bouncy
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: springs.snappy
  }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const listItem: Variants = {
  initial: { 
    opacity: 0,
    y: 10,
    scale: 0.98
  },
  animate: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.smooth
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: easings.smoothOut
    }
  }
};