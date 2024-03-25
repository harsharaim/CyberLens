import Pavan from "../assets/pavan.jpg";
import Harsha from "../assets/harsha.jpg";
import Jaideep from "../assets/jaideep.jpg";
import Praneeth from "../assets/praneeth.jpg";

function Team() {
  const team = [
    {
      avatar: Harsha,
      name: "Harsha Kumar Rai M",
      title: "Team Member",
    },
    {
      avatar: Jaideep,
      name: "Jaideep D Naik",
      title: "Team Member",
    },
    {
      avatar: Pavan,
      name: "Pavan G Naik",
      title: "Team Member",
    },
    {
      avatar: Praneeth,
      name: " Praneeth P",
      title: "Team Member",
    },
  ];

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl mx-auto sm:text-center">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Our team
          </h3>
          <p className="text-gray-600 mt-3">
            Meet the talented individuals behind CyberLens, dedicated to
            creating a safer online environment through innovative cyberbullying
            detection methods.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {team.map((item, idx) => (
              <li key={idx}>
                <div className="w-full h-60 sm:h-52 md:h-80">
                  <img
                    src={item.avatar}
                    className="w-full h-full object-cover object-top shadow-md rounded-xl"
                    alt=""
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-lg text-gray-700 font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-indigo-600">{item.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Team;
