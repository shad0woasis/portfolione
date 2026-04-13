import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "../data/portfolio";
import {
  FaGithub,
  FaTelegramPlane,
  FaLinkedin,
  FaVk,
  FaEnvelope,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";

const iconMap: Record<string, React.ElementType> = {
  github: FaGithub,
  telegram: FaTelegramPlane,
  linkedin: FaLinkedin,
  vk: FaVk,
  email: FaEnvelope,
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative">
      {/* Top border gradient */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <span className="text-white font-bold text-xl">
                  {personalInfo.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{personalInfo.name}</h3>
                <p className="text-sm text-gray-400">{personalInfo.title}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Создаю современные веб-приложения с вниманием к деталям и
              пользовательскому опыту.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Навигация
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {["Главная", "Обо мне", "Навыки", "Опыт", "Проекты", "Контакты"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const idMap: Record<string, string> = {
                        "Главная": "hero",
                        "Обо мне": "about",
                        "Навыки": "skills",
                        "Опыт": "experience",
                        "Проекты": "projects",
                        "Контакты": "contact",
                      };
                      document
                        .getElementById(idMap[item])
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-left text-sm text-gray-400 hover:text-cyan-400 transition-colors py-1"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Социальные сети
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-cyan-600 hover:text-white transition-all hover:-translate-y-0.5"
                  >
                    {Icon && <Icon className="text-lg" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} {personalInfo.name}. Сделано с{" "}
            <FaHeart className="text-red-500 text-xs" /> и React
          </p>
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-cyan-600 hover:text-white transition-all"
            aria-label="Наверх"
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
