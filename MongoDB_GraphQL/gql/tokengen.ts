// random 
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// brain fuck everything
const characters = "abcdefghijklm01234ABCDEFGHIJKLM56789NOPQRSTUVWXYZnopqrstuvwxyz"
let enc_chars = {}
for(let i = 0; i < 62; i++) {

  enc_chars[characters[i]] = characters[getRandomInt(62)]

}
// the func
export const obfuscate = (input, pwd = false) => {
  let res = ''
  let len = input.length
  
  if (pwd)
    len /=2

  for(let i = 0; i < len; i++) {
    res +=enc_chars[input[i]] + characters[getRandomInt(62)]
  }

  return res

}
