import { motion } from "framer-motion";
import { useInView } from "../hooks/useScrollSpy";
import { personalInfo } from "../data/portfolio";

export default function About() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-white dark:bg-gray-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-semibold mb-4">
            Обо мне
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Познакомимся ближе
          </h2>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Avatar / Image area */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                <span className="text-8xl sm:text-9xl font-bold text-white/90">
                  {personalInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">💻</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Full-Stack Developer с страстью к{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                качественному коду
              </span>
            </h3>

            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {personalInfo.bio.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph.trim()}</p>
              ))}
            </div>

            {/* Quick info cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Имя", value: personalInfo.name },
                { label: "Email", value: personalInfo.email },
                { label: "Локация", value: personalInfo.location },
                { label: "Роль", value: personalInfo.title },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50"
                >
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
