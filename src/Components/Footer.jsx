import Logo from "../assets/logo.png";
import { FaGithub } from "react-icons/fa6";
import AnchorLink from "react-anchor-link-smooth-scroll";

function Footer() {
  const footerNavs = [
    {
      id: 2,
      href: "#process",
      name: "Process",
    },
    {
      id: 3,
      href: "#team",
      name: "Team",
    },
  ];

  return (
    <footer className="text-gray-400 bg-[#111827] px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <a href="/">
          <img src={Logo} width={100} height={50} className="sm:mx-auto" />
        </a>

        <p className="leading-relaxed mt-2 text-[15px]">
          Join our mission to combat cyberbullying and stay updated with the
          latest advancements in online safety by connecting with our dedicated
          team and community.
        </p>
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        {footerNavs.map((item, idx) => (
          <li key={idx} className=" hover:text-gray-200">
            <AnchorLink href={item.href} className="block">
              {item.name}
            </AnchorLink>
          </li>
        ))}
        <li className=" hover:text-gray-200">
          <a href="/upload" className="block">
            Detect-CyberBullying
          </a>
        </li>
      </ul>
      <div className="mt-8 items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; 2024 Team CyberLens All rights reserved.
        </div>
        <div className="mt-6 sm:mt-0">
          <a href="https://github.com/harsharaim/CyberLens" target="_blank">
            <FaGithub className="size-8" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
