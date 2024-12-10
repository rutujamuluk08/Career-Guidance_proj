const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Cloud function to check eligibility based on CGPA
exports.checkEligibility = functions.https.onCall((data, context) => {
  const cgpa = data.cgpa;
  if (cgpa >= 7.0) {
    return { eligible: true };
  } else {
    return { eligible: false };
  }
});

// Cloud function to calculate aptitude test score
exports.calculateTestScore = functions.https.onCall((data, context) => {
  const answers = data.answers; // Array of student's answers
  let score = 0;
  
  // Assuming each correct answer adds 1 point
  answers.forEach(answer => {
    if (answer.correct) score += 1;
  });

  return { score: score };
});
