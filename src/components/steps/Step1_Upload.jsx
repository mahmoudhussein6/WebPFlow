import React from 'react';
import { motion } from 'framer-motion';
import DropZone from '../DropZone';

const Step1_Upload = ({ onFilesAdded }) => {
  return (
    <motion.div 
      key="step1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="h-full min-h-[400px] sm:min-h-[600px]"
    >
      <DropZone onFilesAdded={onFilesAdded} />
    </motion.div>
  );
};

export default Step1_Upload;
