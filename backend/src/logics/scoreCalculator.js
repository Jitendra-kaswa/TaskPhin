
class ScoreCalculator {
    static calculateNodeScore(experienceYears) {
      if (experienceYears < 1) {
        return 1;
      } else if (experienceYears >= 1 && experienceYears <= 2) {
        return 2;
      } else {
        return 3;
      }
    }

    static calculateReactScore(experienceYears) {
      if (experienceYears < 1) {
        return 1;
      } else if (experienceYears >= 1 && experienceYears <= 2) {
        return 2;
      } else {
        return 3;
      }
    }

    static calculateTotalScore(nodeScore, reactScore) {
      return nodeScore + reactScore;
    }
  }

  module.exports = ScoreCalculator;
