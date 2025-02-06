// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(reversePhrase("Do I Choose You Pikachu"))
}

function draw() {
  background(220);

}

function reversePhrase(sentence) {
  let sentenceArr = sentence.split(" ");
  return(recursiveReverse(sentenceArr,sentenceArr.length));
}

function recursiveReverse(sentenceArr, i) {
  let test = sentenceArr.shift()
  let sentenceModArr = sentenceArr.unshift(test);
  if (i > 0) {
    return(recursiveReverse(sentenceModArr,i-1));
  } else {
    return(sentenceModArr);
  }
}