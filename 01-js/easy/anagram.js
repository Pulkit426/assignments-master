/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  let arr1 = str1.toLowerCase().split("")
  let arr2 = str2.toLowerCase().split("")

  if(arr1.length !== arr2.length)
  return false

  let count=0

  for(let i=0;i<arr1.length; i++){

    for(let j=0;j<arr2.length;j++){
    if(arr1[i]===arr2[j])
    count++
    }

    if(count===0) return false
    else count=0
  }
return true
}

module.exports = isAnagram;
