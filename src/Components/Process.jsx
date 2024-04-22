import Img1 from "../assets/1.png";
import Img2 from "../assets/bert1.png";
import Img3 from "../assets/resnet.png";
import Img4 from "../assets/4.png";
import { FaArrowRight } from "react-icons/fa";
function Process() {
  const process = [
    {
      img: Img1,
      title: "Unveiling Video Content: Parsing and Dissecting",
      content:
        "Our first step involves the ingestion of video content, where we meticulously parse and dissect the incoming footage into its audio and visual components. By breaking down the video into these fundamental elements, we lay the groundwork for comprehensive analysis, enabling us to delve deeper into the content and uncover any potential instances of cyberbullying.",
      link: "https://www.researchgate.net/publication/5567358_Extraction_of_high-resolution_frames_from_video_sequences",
      css: "",
      bg: "bg-white",
    },
    {
      img: Img2,
      title: "Decoding Verbal Context: Text Analysis with BERT Model",
      content:
        "In this phase, we harness the power of state-of-the-art Natural Language Processing (NLP) technology, employing the BERT model to scrutinize the textual content extracted from the video. With BERT's advanced understanding of context and semantics, we meticulously assess the text for any subtle nuances or linguistic patterns indicative of cyberbullying behavior, ensuring a thorough",
      link: "https://en.wikipedia.org/wiki/BERT_(language_model)#:~:text=BERT%20is%20an%20%22encoder%2Donly,a%20stack%20of%20encoders.",
      css: "lg:flex-row-reverse",
      bg: "bg-purple-50",
    },
    {
      img: Img3,
      title: "Visual Inspection: Image Analysis with Advanced Algorithms",
      content:
        "Here, we employ cutting-edge image processing techniques utilizing D-Hash and ResNet 50 models to scrutinize the visual content extracted from the video. Through D-Hash, we meticulously sift through the image data to eliminate redundant visuals, streamlining the analysis process. Meanwhile, ResNet 50 aids in detecting potential instances of cyberbullying within the remaining images, ensuring comprehensive coverage of the video's visual components.",
      link: "https://www.mathworks.com/help/deeplearning/ref/resnet50.html",
      css: "",
      bg: "bg-white",
    },
    {
      img: Img4,
      title: "Synthesizing Insights: Combining Text and Image Analyses",
      content:
        "In this pivotal stage, we synergize the insights gleaned from both text and image analyses to derive a holistic assessment of the video’s content. By harmonizing the findings obtained through BERT’s textual analysis and ResNet 50’s visual scrutiny, we achieve a comprehensive understanding of the video’s narrative. This collaborative approach enables us to confidently ascertain the presence or absence of cyberbullying, empowering us to take decisive action as needed.",
      link: "https://ieeexplore.ieee.org/document/9155700",
      css: "lg:flex-row-reverse",
      bg: "bg-purple-50",
    },
  ];
  return (
    <div id="process">
      {process.map((item, index) => (
        <section key={index} className={`py-14 ${item.bg}`}>
          <div className="max-w-screen-xl mx-auto md:px-8">
            <div className={`items-center gap-x-12 sm:px-4 md:px-0 lg:flex ${item.css}`}>
              <div className="flex-1 sm:hidden lg:block px-4">
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
                  href={item.link} target="_blank"
                  className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
                >
                  Learn more<FaArrowRight className="mt-1 relative"/>
                 
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
