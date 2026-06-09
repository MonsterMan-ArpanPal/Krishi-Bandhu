const React = {
  createElement: (type, props, ...children) => {
    return { type, props, children };
  }
};

const renderFormattedText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*[\s\S]*?\*\*)/g);
  
  const renderItalics = (str) => {
    const subParts = str.split(/(\*[\s\S]*?\*)/g);
    return subParts.map((subPart, subIdx) => {
      if (subPart.startsWith("*") && subPart.endsWith("*") && subPart.length > 2) {
        return React.createElement("em", { key: subIdx }, subPart.slice(1, -1));
      }
      return subPart;
    });
  };

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      const boldText = part.slice(2, -2);
      return React.createElement("strong", { key: idx }, renderItalics(boldText));
    }
    return React.createElement("span", { key: idx }, renderItalics(part));
  });
};

const sampleText = "* **Government Schemes:** Benefits you can avail of, like *Krishi Bhagya* or *PM-KISAN*.";
const result = renderFormattedText(sampleText);
console.log("Input Text:", sampleText);
console.log("\nParsed Output Structure:");
console.log(JSON.stringify(result, null, 2));
