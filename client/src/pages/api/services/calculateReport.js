function calculatePerformanceRating(eslintResults) {
  const severityWeights = {
    1: 1, // Warning
    2: 5, // Error
  };

  let totalPoints = 0;

  eslintResults.forEach((issue) => {
    const weight = severityWeights[issue.severity] || 0;
    totalPoints += weight;
  });

  const maxPoints = 100; // Define the maximum threshold for points
  const performanceRating = Math.max(0, 100 - (totalPoints / maxPoints) * 100);

  return performanceRating.toFixed(2); // Return rating as a percentage with two decimal places
}
export default calculatePerformanceRating;
