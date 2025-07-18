import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingTelegramButton = () => {
  return (
    <motion.div
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        asChild
        size="lg"
        className="rounded-full shadow-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold p-4 h-auto"
      >
        <a
          href="https://t.me/+KvgUaGSI4Ww2ZmJk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Send className="w-5 h-5" />
          <span>Rejoindre le Canal</span>
        </a>
      </Button>
    </motion.div>
  );
};

export default FloatingTelegramButton;