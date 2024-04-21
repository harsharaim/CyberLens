import Img1 from "../assets/1.png";
import Img2 from "../assets/bert1.png";
import Img3 from "../assets/resnet.png";
import Img4 from "../assets/4.png";
function Process() {
  const process = [
    {
      img: Img1,
      title: "Unveiling Video Content: Parsing and Dissecting",
      content:
        "Our first step involves the ingestion of video content, where we meticulously parse and dissect the incoming footage into its audio and visual components. By breaking down the video into these fundamental elements, we lay the groundwork for comprehensive analysis, enabling us to delve deeper into the content and uncover any potential instances of cyberbullying.",
      link: "",
      css: "",
      bg: "bg-white",
    },
    {
      img: Img2,
      title: "Decoding Verbal Context: Text Analysis with BERT Model",
      content:
        "In this phase, we harness the power of state-of-the-art Natural Language Processing (NLP) technology, employing the BERT model to scrutinize the textual content extracted from the video. With BERT's advanced understanding of context and semantics, we meticulously assess the text for any subtle nuances or linguistic patterns indicative of cyberbullying behavior, ensuring a thorough",
      link: "",
      css: "lg:flex-row-reverse",
      bg: "bg-[rgb(245,246,247)]",
    },
    {
      img: Img3,
      title: "Visual Inspection: Image Analysis with Advanced Algorithms",
      content:
        "Here, we employ cutting-edge image processing techniques utilizing D-Hash and ResNet 50 models to scrutinize the visual content extracted from the video. Through D-Hash, we meticulously sift through the image data to eliminate redundant visuals, streamlining the analysis process. Meanwhile, ResNet 50 aids in detecting potential instances of cyberbullying within the remaining images, ensuring comprehensive coverage of the video's visual components.",
      link: "",
      css: "",
      bg: "",
    },
    {
      img: Img4,
      title: "Synthesizing Insights: Combining Text and Image Analyses",
      content:
        "In this pivotal stage, we synergize the insights gleaned from both text and image analyses to derive a holistic assessment of the video’s content. By harmonizing the findings obtained through BERT’s textual analysis and ResNet 50’s visual scrutiny, we achieve a comprehensive understanding of the video’s narrative. This collaborative approach enables us to confidently ascertain the presence or absence of cyberbullying, empowering us to take decisive action as needed.",
      link: "",
      css: "lg:flex-row-reverse",
      bg: "bg-[rgb(245,246,247)]",
    },
  ];
  return (
    <div id="process">
      {process.map((item, index) => (
        <section key={index} className={`py-14 ${item.bg}`}>
          <div className="max-w-screen-xl mx-auto md:px-8">
            <div className={`items-center gap-x-12 sm:px-4 md:px-0 lg:flex ${item.css}`}>
              <div className="flex-1 sm:hidden lg:block">
                <img
                  src={item.img}
                  className="md:max-w-lg sm:rounded-lg"
                  alt=""
                />
              </div>
              <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                  {item.title}
                </p>
                <p className="mt-3 text-gray-600">{item.content}</p>
                <a
                  href="javascript:void(0)"
                  className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default Process;
