import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, Chart as ChartJS } from "chart.js";
import "./loader.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function predictResultLevel(combinedPercentage) {
  if (combinedPercentage <= 33) {
    return "Low level of cyberbullying";
  } else if (combinedPercentage <= 66) {
    return "Medium level of cyberbullying";
  } else {
    return "High level of cyberbullying";
  }
}

function ResultSection({
  textAnalysisResult,
  visualAnalysisResult,
  bertArrayResult,
  calculatePercentageVisual,
  calculateCombinedPercentage,
}) {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  const numLabels = bertArrayResult.length;
  const percentagePerLabel = 100 / numLabels;
  // text data
  const textData = {
    labels:bertArrayResult,
    datasets: [
      {
        data:Array(numLabels).fill(percentagePerLabel),
        backgroundColor: [
          "#FF6384", // Red for "Toxic"
          "#FF9F40", // Orange for "Severe toxic"
          "#FFCD56", // Yellow for "Obscene"
          "#4BC0C0", // Teal for "Threat"
          "#36A2EB", // Blue for "Insult"
          "#9966FF", // Purple for "Identity_hate"
          "#4CAF50", // Green for "Non-Cyberbullying Content"
        ],
      },
    ],
  };
  


  // // Pie chart data
  // const textData = {
  //   labels: ["Cyberbullying Content", "Non-Cyberbullying Content"],
  //   datasets: [
  //     {
  //       data: [calculatePercentageText(), 100 - calculatePercentageText()],
  //       backgroundColor: ["#FF6384", "#36A2EB"],
  //     },
  //   ],
  // };

  const visualData = {
    labels: ["Cyberbullying Behavior", "Non-Cyberbullying Behavior"],
    datasets: [
      {
        data: [calculatePercentageVisual(), 100 - calculatePercentageVisual()],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const finalData = {
    labels: ["Cyberbullying Content", "Non-Cyberbullying Content"],
    datasets: [
      {
        data: [
          calculateCombinedPercentage(),
          100 - calculateCombinedPercentage(),
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="result-section p-4 bg-gray-100 rounded-lg md:m-20 lg:py-10 mt-10">
      <h3 className="text-2xl font-bold mb-4 text-center">Analysis Results</h3>
      <div className="bg-white p-4 rounded-lg shadow">
        {isProcessing ? (
          // Loading result section
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="loader w-[10vw]" />
            <p className="text-gray-700 text-lg">
              The video is being processed by our ML model. Please wait...
            </p>
          </div>
        ) : (
          // Result section
          <div className="flex flex-col gap-10">
            {/* Text analysis result */}
            <div className="flex flex-col md:flex-row justify-between md:px-36">
              <div>
                <p className="mb-2 text-lg font-semibold">Text Analysis:</p>
                <p className="text-gray-800">
                  {bertArrayResult} cyberbullying content
                </p>
                <p className="text-gray-800">{textAnalysisResult}</p>
              </div>
              <div className="size-48 mt-10 md:mt-0">
                <Pie data={textData} />
              </div>
            </div>

            {/* Visual analysis result */}
            <div className="flex flex-col md:flex-row justify-between md:px-36">
              <div>
                <p className="mb-2 text-lg font-semibold">Visual Analysis:</p>
                <p className="text-gray-800">
                  {calculatePercentageVisual()}% cyberbullying content
                </p>
                <p className="text-gray-800">{visualAnalysisResult}</p>
              </div>
              <div className="size-48 mt-10 md:mt-0">
                <Pie data={visualData} />
              </div>
            </div>

            {/* Final result */}
            <div className="flex flex-col md:flex-row justify-between md:px-36">
              <div>
                <p className="mb-2 text-lg font-semibold">Combined Result:</p>
                <p className="text-gray-800 mb-2">
                  Combined Cyberbullying Percentage:{" "}
                  {calculateCombinedPercentage()}%
                </p>
                <p className="text-gray-800">
                  Prediction:{" "}
                  {predictResultLevel(calculateCombinedPercentage)}
                </p>
              </div>
              <div className="size-48 mt-10 md:mt-0">
                <Pie data={finalData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultSection;
