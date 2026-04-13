import { motion } from "framer-motion";
import { useInView } from "../hooks/useScrollSpy";
import { skills } from "../data/portfolio";

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
  color: string;
}

function SkillBar({ name, level, index, color }: SkillBarProps) {
  const [ref, inView] = useInView(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {name}
        </span>
        <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
          {level}%
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </motion.div>
  );
}

const skillColors = {
  frontend: "bg-gradient-to-r from-cyan-500 to-blue-500",
  backend: "bg-gradient-to-r from-emerald-500 to-teal-500",
  tools: "bg-gradient-to-r from-amber-500 to-orange-500",
};

const skillIcons = {
  frontend: "🎨",
  backend: "⚙️",
  tools: "🛠️",
};

export default function Skills() {
  const [ref, inView] = useInView(0.1);

  const categories = Object.entries(skills) as [
    keyof typeof skills,
    { name: string; level: number }[]
  ][];

  return (
    <section
      id="skills"
      className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 relative"
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
            Навыки
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Мой стек технологий
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Постоянно изучаю новые технологии и совершенствую свои навыки для
            создания лучших продуктов
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {categories.map(([category, skillList], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-cyan-500/5 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{skillIcons[category]}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                  {category === "frontend"
                    ? "Frontend"
                    : category === "backend"
                    ? "Backend"
                    : "Инструменты"}
                </h3>
              </div>

              <div className="space-y-5">
                {skillList.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={i}
                    color={skillColors[category]}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
