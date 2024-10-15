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
  let result = '';
  for (let i = 1; i <= 32; i++) {
    result += 'Ключ ' + i + ': ' + caesarCipher(text, -i) + '\n';
  }
  document.getElementById('result').value = result;
}

function caesarCipher(text, shift) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let charCode = text.charCodeAt(i);

    if (charCode >= 1040 && charCode <= 1071) { // Заглавные буквы
      char = String.fromCharCode(((charCode - 1040 + shift) % 32 + 32) % 32 + 1040);
    } else if (charCode >= 1072 && charCode <= 1103) { // Строчные буквы
      char = String.fromCharCode(((charCode - 1072 + shift) % 32 + 32) % 32 + 1072);
    } 

    result += char;
  }
  return result;
}
