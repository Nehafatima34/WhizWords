// Utility functions to help with dyslexia-friendly text rendering and UI

/**
 * Breaks text into smaller chunks that are easier to read for people with dyslexia
 * @param text The text to process
 * @param maxLength Maximum length of each chunk
 * @returns An array of text chunks
 */
export const breakTextIntoChunks = (text: string, maxLength: number = 4): string[] => {
  const words = text.split(' ');
  const result: string[] = [];
  
  for (const word of words) {
    if (word.length <= maxLength) {
      result.push(word);
    } else {
      // Break longer words into smaller chunks
      let remaining = word;
      while (remaining.length > 0) {
        result.push(remaining.slice(0, maxLength));
        remaining = remaining.slice(maxLength);
      }
    }
  }
  
  return result;
};

/**
 * Dyslexia-friendly color themes
 */
export const dyslexiaFriendlyThemes = {
  cream: {
    background: "#FFF2E6",
    text: "#333333",
    accent: "#9D7ABF"
  },
  paleBlue: {
    background: "#E6F2FF",
    text: "#333333",
    accent: "#7A9DBF"
  },
  paleGreen: {
    background: "#E6FFF2",
    text: "#333333",
    accent: "#7ABF9D"
  }
};

/**
 * Calculates optimal letter spacing based on font size
 * @param fontSize Font size in pixels
 * @returns Recommended letter spacing in pixels
 */
export const getOptimalLetterSpacing = (fontSize: number): number => {
  // Typical recommendation is 2-4% of font size for dyslexic readers
  return Math.max(1, Math.round(fontSize * 0.03));
};

/**
 * Calculates optimal line height based on font size
 * @param fontSize Font size in pixels
 * @returns Recommended line height as a multiplier
 */
export const getOptimalLineHeight = (fontSize: number): number => {
  // Recommended line height is 1.5-2x font size for dyslexic readers
  return 1.5 + (fontSize > 16 ? 0.2 : 0);
};

/**
 * Dyslexia-friendly fonts in order of preference
 */
export const dyslexiaFriendlyFonts = [
  "Lexend",
  "OpenDyslexic",
  "Comic Sans MS",
  "Arial",
  "Verdana",
  "Century Gothic",
  "Tahoma",
  "sans-serif"
];
