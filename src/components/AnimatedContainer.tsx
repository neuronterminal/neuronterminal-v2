import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scale } from '../utils/animations/variants';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  variants?: typeof scale;
}

export function AnimatedContainer({ 
  children, 
  className = '',
  variants = scale
}: AnimatedContainerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}