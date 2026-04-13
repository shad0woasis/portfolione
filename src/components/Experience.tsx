import { motion } from "framer-motion";
import { useInView } from "../hooks/useScrollSpy";
import { experience, education } from "../data/portfolio";
import { useState } from "react";

type TabType = "experience" | "education";

export default function Experience() {
  const [activeTab, setActiveTab] = useState<TabType>("experience");
  const [ref, inView] = useInView(0.1);

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: "experience", label: "Опыт работы", icon: "💼" },
    { key: "education", label: "Образование", icon: "🎓" },
  ];

  const data = activeTab === "experience" ? experience : education;

  return (
    <section
      id="experience"
      className="py-20 lg:py-32 bg-white dark:bg-gray-900 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-semibold mb-4">
            Путь
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Опыт и образование
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-white dark:bg-gray-700 text-cyan-600 dark:text-cyan-400 shadow-md"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-teal-500 to-blue-500 opacity-20" />

          <div className="space-y-8">
            {data.map((item, i) => {
              const period = item.period;
              const description = item.description;
              const title = "title" in item ? item.title : item.degree;
              const subtitle = "company" in item ? item.company : item.institution;
              const technologies = "technologies" in item ? item.technologies : undefined;

              return (
                <motion.div
                  key={`${activeTab}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative pl-12 sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 sm:left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-white dark:border-gray-900 shadow-md z-10" />

                  <div className="group p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 hover:border-cyan-200 dark:hover:border-cyan-700/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
                        {period}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-semibold mt-1">
                      {subtitle}
                    </p>
                    <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {description}
                    </p>

                    {/* Technologies */}
                    {technologies && technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
