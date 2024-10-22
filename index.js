function encrypt() {
  let text = document.getElementById('text').value;
  let key = parseInt(document.getElementById('key').value);
  let result = caesarCipher(text, key);
  document.getElementById('result').value = result;
}

function decrypt() {
  let text = document.getElementById('text').value;
  let key = parseInt(document.getElementById('key').value);
  let result = caesarCipher(text, -key); 
  document.getElementById('result').value = result;
}

function hack() {
  let text = document.getElementById('text').value;
  let bestKey = 0;
  let bestScore = -Infinity; 
  let bestResult = ""; 

  for (let i = 1; i <= 32; i++) {
    let decryptedText = caesarCipher(text, -i);
    let score = calculateProbability(decryptedText); 

    if (score > bestScore) {
      bestScore = score;
      bestKey = i;
      bestResult = decryptedText;
    }
  }

  document.getElementById('result').value = "Ключ " + bestKey + ": " + bestResult;
}

function caesarCipher(text, shift) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let charCode = text.charCodeAt(i);

    if (charCode >= 1040 && charCode <= 1071) { 
      char = String.fromCharCode(((charCode - 1040 + shift) % 32 + 32) % 32 + 1040);
    } else if (charCode >= 1072 && charCode <= 1103) { 
      char = String.fromCharCode(((charCode - 1072 + shift) % 32 + 32) % 32 + 1072);
    } 

    result += char;
  }
  return result;
}

function calculateProbability(text) {
  let score = 0;
  let letterFrequencies = {
    'а': 8.01, 'б': 1.60, 'в': 4.54, 'г': 1.70, 'д': 2.98, 'е': 8.45, 'ё': 0.04, 'ж': 0.94, 'з': 1.74, 'и': 7.35, 
    'й': 1.21, 'к': 3.49, 'л': 4.34, 'м': 3.21, 'н': 6.70, 'о': 10.97, 'п': 2.81, 'р': 4.98, 'с': 5.67, 'т': 6.32, 
    'у': 2.64, 'ф': 0.26, 'х': 0.97, 'ц': 0.48, 'ч': 1.44, 'ш': 0.73, 'щ': 0.36, 'ъ': 0.02, 'ы': 1.90, 'ь': 1.73, 
    'э': 6.20, 'ю': 2.01, 'я': 2.00
  };

  text = text.toLowerCase(); 
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (letterFrequencies[char]) {
      score += letterFrequencies[char];
    }
  }

  return score;
}
