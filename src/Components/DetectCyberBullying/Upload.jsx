import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaCheck, FaCloudUploadAlt, FaUpload } from "react-icons/fa";
import Img from "../../assets/videoUpload.jpg";
import Img1 from "../../assets/videoUpload1.jpg";
import ResultSection from "./Result";

function Upload() {
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textAnalysisResult, setTextAnalysisResult] = useState("");
  const [visualAnalysisResult, setVisualAnalysisResult] = useState("");


  // Function to simulate video upload and update progress
  const simulateUpload = () => {
    // Reset progress
    setUploadProgress(0);
    // Simulate upload progress with intervals
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploadProgress(100);
        }
        return newProgress;
      });
    }, 500);
  };

  // Handle video file selection and upload simulation
  const handleVideoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      // Create a URL for the video file
      const url = URL.createObjectURL(file);
      setVideoURL(url);
      setUploadCompleted(false);
      setIsProcessing(true);
      simulateUpload(file);

      try {
        const formData = new FormData();
        formData.append("video", file);

        const response = await fetch("http://localhost:5002/transcribe_video", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transcription");
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching transcription:", error);
      }

      setTimeout(() => {
        // Dummy prediction data
        setTextAnalysisResult("Medium level of cyberbullying content");
        setVisualAnalysisResult("Low level of cyberbullying behavior");
        setIsProcessing(false);  // process set to false  to display result
        setUploadCompleted(true);
      }, 3000);
    }
  };

  return (
    <section className="min-h-screen p-6">
      {/* Header with close button */}
      <div className="text-center mb-8 bg-gray-800 flex justify-between items-center">
        <p className="text-xl md:text-4xl font-bold text-white flex-grow text-center">
          Detect Cyber Bullying
        </p>
        <Link
          to="/"
          className="bg-red-500 w-24 h-8 flex items-center justify-center rounded-full text-white hover:bg-red-600 transition duration-200"
        >
          <FaTimes size={16} className="mr-2" />
          Close
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-xl lg:m-20 lg:pl-10">
        {/* Left side section */}
        <div className="flex flex-col items-center justify-center px-7 my-5">
          <h3 className="text-2xl font-bold mb-3">Upload Video</h3>
          <p className="text-gray-600 mb-4">
            Your video will undergo analysis using our advanced model to detect
            any signs of cyberbullying. We prioritize your privacy and ensure
            that your data is handled securely and responsibly.
          </p>

          {/*  image for mobile view */}
          <div className="md:hidden flex items-center justify-center">
            <img
              src={Img1}
              alt="Vector graphic"
              className="w-fit object-cover pb-2 rounded-xl"
            />
          </div>

          {/* Video upload box */}
          <div className="w-full h-64 border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center mb-4">
            {videoURL ? (
              <video
                src={videoURL}
                controls={false}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <label
                htmlFor="video-upload"
                className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
              >
                <FaCloudUploadAlt size={40} className="text-gray-600" />
              </label>
            )}
            <input
              type="file"
              accept="video/*"
              id="video-upload"
              onChange={handleVideoChange}
              className="hidden"
            />
          </div>

          {/* Upload button */}
          <div className="w-full flex justify-center mb-4">
            <label htmlFor="video-upload" className="w-full">
              <button
                type="button"
                className="bg-blue-500 text-white w-full py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
                onClick={() => document.getElementById("video-upload").click()}
              >
                <FaUpload size={20} className="mr-2" />
                Upload Video
              </button>
            </label>
          </div>

          {/* Progress bar and percentage display */}
          {videoFile && uploadProgress < 100 && (
            <div className="w-full">
              <div className="w-full h-4 bg-gray-300 rounded-lg">
                <div
                  className="h-full bg-blue-500 rounded-lg transition-width duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-center mt-2">{uploadProgress}%</p>
            </div>
          )}

          {uploadCompleted && (
            <div className="mt-4 text-center flex">
              <FaCheck size={20} className="text-green-500" />
              &nbsp; Video Successfully Uploaded
            </div>
          )}
        </div>

        {/* Right side section */}
        <div className="flex items-center justify-center hidden lg:block">
          <img
            src={Img}
            alt="Vector graphic"
            className="w-full h-full rounded-lg object-cover p-10"
          />
        </div>
      </div>

      {/* Analysis Results */}
      {uploadCompleted && (
        <ResultSection
          isProcessing={isProcessing}
          textAnalysisResult={textAnalysisResult}
          visualAnalysisResult={visualAnalysisResult}
          calculatePercentageText={calculatePercentageText}
          calculatePercentageVisual={calculatePercentageVisual}
          calculateCombinedPercentage={calculateCombinedPercentage}
        />
      )}
    </section>
  );
}

// Calculate the percentage of cyberbullying content for the text model
function calculatePercentageText() {
  const percentage = 45;
  return percentage;
}

// Calculate the percentage of cyberbullying content for the visual model
function calculatePercentageVisual() {
  const percentage = 30;
  return percentage;
}

// function to  calculate the combined result
function calculateCombinedPercentage() {
  const combinedPercentage =
    (calculatePercentageText() + calculatePercentageVisual()) / 2;
  return combinedPercentage;
}

export default Upload;
