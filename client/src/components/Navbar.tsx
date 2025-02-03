import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Docs', href: '#docs' },
  { name: 'Company', href: '#company' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-transparent absolute top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent"
            >
              SoundBite
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-300 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="relative">
                    {item.name}
                    <motion.span
                      className="absolute left-0 bottom-0 h-px w-full bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-400 text-gray-900 font-medium rounded-lg hover:shadow-lg transition-shadow"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-lg pt-16"
        >
          <div className="px-4 pt-2 pb-3 space-y-4">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-2xl text-gray-300 hover:text-white"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-400 text-gray-900 font-medium rounded-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
