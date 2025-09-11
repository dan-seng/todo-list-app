import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaTelegram, FaGlobe, FaEnvelope, FaCode, FaHeart, FaPhone, FaWhatsapp } from 'react-icons/fa';

const About = () => {
  const socialLinks = [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      name: 'Email',
      url: 'mailto:da16gi@gmail.com',
      username: 'da16gi@gmail.com',
      color: 'bg-red-500'
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      name: 'GitHub',
      url: 'https://github.com/dan-seng',
      username: 'dan-seng',
      color: 'bg-gray-800'
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      name: 'LinkedIn',
      url: 'www.linkedin.com/in/daniel-gidey-40497337a',
      username: 'Daniel Gidey',
      color: 'bg-blue-600'
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      name: 'Instagram',
      url: 'https://instagram.com/_dan_el',
      username: '@_dan_el',
      color: 'bg-pink-500'
    },
    {
      icon: <FaTelegram className="w-5 h-5" />,
      name: 'Telegram',
      url: 'https://t.me/living_guy',
      username: '@living_guy',
      color: 'bg-blue-400'
    },
    {
      icon: <FaGlobe className="w-5 h-5" />,
      name: 'Website',
      url: 'https://daniel-gidey.vercel.app',
      username: 'daniel-gidey.vercel.app',
      color: 'bg-green-500'
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      name: 'Mobile',
      url: 'tel:+251945012123',
      username: '+251 94 501 2123',
      color: 'bg-green-600'
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      name: 'WhatsApp',
      url: 'https://wa.me/251945012123',
      username: 'Daniel Gidey',
      color: 'bg-green-500'
    }
  ];

  const technologies = [
    { name: 'React', color: 'bg-blue-100 text-blue-800' },
    { name: 'Tailwind CSS', color: 'bg-teal-100 text-teal-800' },
    { name: 'Vite', color: 'bg-purple-100 text-purple-800' },
    { name: 'React Icons', color: 'bg-pink-100 text-pink-800' },
    { name: 'GSAP', color: 'bg-green-100 text-green-800' },
    { name: 'React Router', color: 'bg-red-100 text-red-800' }
  ];

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            About the Developer
          </h1>
          <p className="text-xl text-gray-00 dark:text-gray-100 max-w-2xl mx-auto">
            Hi there! I'm Daniel, the creator of this Todo App. Passionate about crafting beautiful and functional web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="px-6 py-8">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <img
                      className="h-40 w-40 rounded-full border-4 border-white shadow-lg"
                      src="/dan-softwares.png"
                      alt="Developer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                      <FaCode className="w-5 h-5" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Daniel Gidey</h2>
                  <p className="text-gray-600 mb-4">Full Stack Developer</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaHeart className="text-red-500 mr-1" />
                    <span>Creating awesome apps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Me Card */}
            <div className="dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-5 bg-blue-600 rounded mr-2"></span>
                About Me
              </h3>
              <p className="text-gray-600 leading-relaxed">
                I'm a passionate full-stack developer with a love for creating beautiful and functional web applications. 
                With expertise in modern JavaScript frameworks and a keen eye for design, I strive to build applications 
                that not only work flawlessly but also provide an exceptional user experience.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
                or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Technologies Card */}
            <div className="dark:border-gray-700 rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-5 bg-green-600 rounded mr-2"></span>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links Card */}
            <div className="dark:border-gray-700 rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-5 bg-purple-600 rounded mr-2"></span>
                Connect With Me
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className={`flex-shrink-0 ${social.color} text-white p-3 rounded-lg`}>
                      {social.icon}
                    </div>
                    <div className="ml-4 overflow-hidden">
                      <p className="text-sm font-medium text-gray-500 truncate">{social.name}</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{social.username}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-gray-500">
          <p>Made with <span className="text-red-500">❤️</span> using React and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default About;