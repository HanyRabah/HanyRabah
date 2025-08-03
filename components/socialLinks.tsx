import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="hidden md:block w-[22px] fixed bottom-0 left-[40px] z-50 text-gray">
      <ul className="flex flex-col gap-10 align-center list-none after:content-[''] after:block after:bg-gray-600 after:w-[1px] after:h-[90px] after:m-auto after:mt-[0px]">
        <li>
          <a
            href="https://github.com/HanyRabah"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            className="relative inline-block text-gray-600 transition-all duration-200 hover:text-theme-primary hover:translate-y-[-3px]"
          >
            <Github />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/hany.rabah/"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
            className="relative inline-block text-gray-600 transition-all duration-200 hover:text-theme-primary hover:translate-y-[-3px]"
          >
            <Instagram />
          </a>
        </li>
        {/* <li>
          <a
            href="https://twitter.com/bchiang7"
            aria-label="Twitter"
            target="_blank"
            rel="noreferrer"
            className="relative inline-block text-gray-600 transition-all duration-200 hover:text-theme-primary hover:translate-y-[-3px]"
          >
            <Twitter />
          </a>
        </li> */}
        <li>
          <a
            href="https://www.linkedin.com/in/hanyrabah/"
            aria-label="Linkedin"
            target="_blank"
            rel="noreferrer"
            className="relative inline-block text-gray-600 transition-all duration-200 hover:text-theme-primary hover:translate-y-[-3px]"
          >
            <Linkedin />
          </a>
        </li>
        <li>
          <a
            href="mailto:hany@hanyrabah.com"
            aria-label="Codepen"
            target="_blank"
            rel="noreferrer"
            className="relative inline-block text-gray-600 transition-all duration-200 hover:text-theme-primary hover:translate-y-[-3px]"
          > 
            <Mail />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SocialLinks;