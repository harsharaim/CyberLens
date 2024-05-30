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


  const [percentageBullying, setPercentageBullying] = useState(0);
  const [bertResult, setBertResult] = useState([]);
  

  // Function to simulate video upload and update progress
// Function to simulate video upload and update progress
const simulateUpload = async (file) => {
  // Reset progress
  setUploadProgress(0);

  // Calculate the chunk size based on the file size
  const chunkSize = Math.ceil(file.size / 10);
  let uploadedBytes = 0;

  // Simulate upload progress with intervals
  const interval = setInterval(() => {
    uploadedBytes += chunkSize;
    const newProgress = Math.min(Math.ceil((uploadedBytes / file.size) * 100), 100);
    setUploadProgress(newProgress);
    if (newProgress >= 100) {
      clearInterval(interval);
      setUploadProgress(100);
    }
  }, 500);
  setUploadCompleted(true);
};


  // Handle video file selection and upload simulation
  const handleVideoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        setIsProcessing(true);
        await simulateUpload(file);
        setVideoFile(file);
        const url = URL.createObjectURL(file);
        setVideoURL(url);

        let bertCompleted = false;
        let mediapipeCompleted = false;
        const checkProcessCompletion = () => {
          if (bertCompleted && mediapipeCompleted) {
              setIsProcessing(false);
            
          }
        };
        try {
            // Fetch data from the first server (Bert)
            const formData = new FormData();
            formData.append("video", file);
            const BertResponse = await fetch("http://localhost:5002/process_text_from_video", {
                method: "POST",
                body: formData,
            });

            if (!BertResponse.ok) {
                throw new Error("Failed to fetch transcription from Bert server");
            }

            BertResponse.json()
                .then((data) => {
                    setBertResult(data.predicted_labels);
                    console.log("Bert", data);
                    bertCompleted = true;
                    checkProcessCompletion();
                })
                .catch((error) => {
                    console.error("Error parsing JSON:", error);
                });
        } catch (error) {
            console.error("Error fetching data from Bert server:", error);
        }

        try {
            // Fetch data from the second server (Mediapipe)
            const formData = new FormData();
            formData.append("video", file);
            const MediapipeResponse = await fetch("http://localhost:5000/process_video", {
                method: "POST",
                body: formData,
            });

            if (!MediapipeResponse.ok) {
                throw new Error("Failed to process video using Mediapipe");
            }

            MediapipeResponse.json()
                .then((data) => {
                    setPercentageBullying(data.percentage_bullying);
                    console.log("mediapipe", data);
                    mediapipeCompleted = true;
                    checkProcessCompletion();
                })
                .catch((error) => {
                    console.error("Error parsing JSON:", error);
                });
        } catch (error) {
            console.error("Error processing video using Mediapipe:", error);
        }

        

        setTextAnalysisResult("Medium level of cyberbullying content");
        setVisualAnalysisResult("Low level of cyberbullying behavior");
    }
};


  
  
  //process strings
//   function processStrings(inputStrings) {
//     // Predefined list of strings
//     const targetStrings = [
//         "Toxic",
//         "Severe toxic",
//         "Obscene",
//         "Threat",
//         "Insult",
//         "Identity_hate",
//         "Non-Cyberbullying Content"
//     ];
    
//     // Calculate the length of the input array
//     const length = inputStrings.length;
    
//     // Calculate the percentage
//     const percentage = length > 0 ? 100 / length : 0;
    
//     // Create an array of size 7 with 0 assigned
//     const results = Array(7).fill(0);
    
//     // If the input array length is zero, set non-cyberbullying to 100%
//     if (length === 0) {
//         results[6] = 100;  // Set 100% for "Non-Cyberbullying Content" category
//         return results;
//     }
    
//     // Check for strings in the input array and assign percentage
//     inputStrings.forEach((string) => {
//         // Find the index of the string in the targetStrings list
//         const index = targetStrings.indexOf(string);
//         if (index !== -1) {
//             // Assign the calculated percentage to the corresponding position in the results array
//             results[index] += percentage;
//         }
//     });
    
//     return results;
// }
  // Calculate the percentage of cyberbullying content for the text model
  // function bertArrayResult() {
  //   return processStrings(bertResult);

  // }

  // Calculate the percentage of cyberbullying content for the visual model
  function calculatePercentageVisual() {
    return percentageBullying;
  }
  //combined percentage
  function calculateCombinedPercentage(bertResult, percentageBullying) {
    // const combinedPercentage =
    //   (calculatePercentageText() + calculatePercentageVisual()) / 2;
    // return combinedPercentage;
  
    // Define weights for bert categories with high priority
    const bertWeights = {
      toxic: 0.5,  // Weight for "toxic"
      severeToxic: 0.9,  // Highest weight for "severe toxic"
      obscene: 0.5,  // Weight for "obscene"
      threat: 0.7,  // Weight for "threat"
      insult: 0.6,  // Weight for "insult"
      identityHate: 0.9,  // Highest weight for "identity hate"
    };
  
    // Define weights for visual categories
    let visualWeight;
    if (percentageBullying > 50) {
      visualWeight = 0.6;  // Higher weight for visual if above 50% bullying detected
    } else {
      visualWeight = 0.3;  // Lower weight for visual if 50% or below bullying detected
    }
  
    // Calculate the total score for bert data
    let bertScore = 0;
    let categoriesDetected = 0;
    const bertKeys = Object.keys(bertWeights);
    
    for (let i = 0; i < bertResult.length; i++) {
      if (bertResult[i]) {
        bertScore += bertWeights[bertKeys[i]];
        categoriesDetected++;
      }
    }
  
    // Calculate visual score based on visualPercentage and visual weight
    const visualScore = percentageBullying / 100 * visualWeight;
  
    // Combine the scores with higher priority given to bertScore
    const totalScore = bertScore + visualScore;
  
    // Determine the cyberbullying percentage
    let cyberbullyingPercentage;
    if (categoriesDetected >= 3) {
      cyberbullyingPercentage = 100;
    } else if (categoriesDetected >= 2) {
      cyberbullyingPercentage = Math.max(80, totalScore * 100);
    } else if (categoriesDetected === 1) {
      cyberbullyingPercentage = Math.max(40, totalScore * 100);
    } else {
      // If no bert categories are detected, calculate percentage using total score
      const totalWeight = Object.values(bertWeights).reduce((a, b) => a + b) + visualWeight;
      cyberbullyingPercentage = (totalScore / totalWeight) * 100;
    }
  
    // Ensure the cyberbullying percentage is within 0% to 100%
    cyberbullyingPercentage = Math.max(0, Math.min(cyberbullyingPercentage, 100));
  
    return cyberbullyingPercentage;
  }



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
          bertArrayResult={bertResult}
          calculatePercentageVisual={calculatePercentageVisual}
          calculateCombinedPercentage={()=>calculateCombinedPercentage(bertResult,percentageBullying)}
        />
      )}
    </section>
  );
}



export default Upload;
