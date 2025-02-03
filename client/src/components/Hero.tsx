import { motion } from "framer-motion";
import { ReactElement } from "react";

export const Hero = (): ReactElement => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]">
        <svg className="absolute inset-0 h-full w-full">
          <pattern
            id="grid-pattern"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path d="M50 0H0V50" className="stroke-gray-800" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Floating Animation */}
      <motion.div
        className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full opacity-20 blur-3xl"
        animate={{
          x: [-100, 100, -100],
          y: [-50, 150, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Hero Content - Wrapped in max-w-6xl */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 sm:py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
            Professional Audio
          </span>
          <br />
          Editing Made Simple
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Transform raw recordings into polished content with intuitive tools and AI-enhanced workflows
        </motion.p>

        {/* Interactive Card */}
        <motion.div
          className="inline-block p-px bg-gradient-to-r from-teal-500 to-emerald-400 rounded-2xl shadow-2xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-gray-900/80 rounded-2xl p-8 space-y-8 backdrop-blur-xl border border-white/5">
            {/* Visualization */}
            <div className="w-84 h-40 flex items-center justify-center">
              <div className="relative w-full h-24">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 w-2 bg-teal-400/30 rounded-t-lg"
                    style={{
                      left: `${i * (100 / 23)}%`,
                      height: `${30 + Math.sin(i) * 20}%`,
                    }}
                    animate={{
                      height: [
                        `${30 + Math.sin(i) * 20}%`,
                        `${50 + Math.sin(i + 0.5) * 30}%`,
                        `${30 + Math.sin(i) * 20}%`,
                      ],
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="space-y-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 w-full bg-gradient-to-r from-teal-500 to-emerald-400 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Start New Project
              </motion.button>

              {/* Supported Formats */}
              <motion.div
                className="flex justify-center gap-4 text-[15px] text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {["MP3", "WAV", "FLAC", "AAC"].map((format) => (
                  <span
                    key={format}
                    className="inline-flex items-center rounded-md bg-transparent px-2 py-1 ring-1 ring-teal-200 ring-inset"
                  >
                    {format}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Steps Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-16 text-left mx-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { title: "Upload", content: "Drag & drop your audio files or import from cloud storage" },
            { title: "Edit", content: "Trim, enhance, and perfect your audio with smart tools" },
            { title: "Export", content: "Save in any format or share directly to platforms" },
          ].map((step, index) => (
            <div key={step.title} className="p-6 bg-gray-800/30 rounded-xl">
              <div className="text-teal-400 text-2xl mb-2">0{index + 1}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.content}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
