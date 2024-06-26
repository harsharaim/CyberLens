import Logo from "../assets/logo.png";
import Cover from "../assets/cover.png";
import AnchorLink from "react-anchor-link-smooth-scroll";

function Hero() {
  const navigation = [
    { title: "Mission", path: "#mission" },
    { title: "Process", path: "#process" },
    { title: "Team", path: "#team" },
  ];

  return (
    <div className="bg-gray-900 md:h-[100vh]">
      <header>
        <nav className=" pt-5 px-0 mx-auto max-w-screen-xl md:px-8 flex justify-between gap-20 ">
          <a href="#">
            <img src={Logo} width={100} height={50} alt="Float UI logo" />
          </a>
          <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
            {navigation.map((item, idx) => (
              <li className="text-gray-200" key={idx}>
                <AnchorLink href={item.path} className="block">
                  {item.title}
                </AnchorLink>
              </li>
            ))}
            <li className="hidden lg:block">
              <a
                href="/upload"
                className="py-3 px-4 text-center text-white bg-[#818cf8] hover:bg-indigo-700 rounded-md shadow block lg:inline"
              >
                Detect CyberBullying
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-4xl xl:text-5xl">
            Shedding Light on
            <span className="text-indigo-400"> Cyber Shadows</span>
          </h1>
          <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            Explore our innovative approach to detecting cyberbullying in videos
            and join us in creating a safer digital environment for all.
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <AnchorLink
              href="#process"
              className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
            >
              Get started
            </AnchorLink>
            <a
              href="/upload"
              className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto"
            >
              Try it out
            </a>
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img src={Cover} className="w-full mx-auto sm:w-10/12  lg:w-full" />
        </div>
      </section>
    </div>
  );
}

export default Hero;
