const userInput = document.getElementById("userInput")
const checkBtn = document.getElementById("checkBtn")
const vowelCount = document.getElementById("vowelCount")
const vowelFilter = document.getElementById("vowel-letter")


 const vowels = [ 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']



function vowelCountByUserInput() {
    let count = 0;
    let letters = Array.from(userInput.value)
  
    letters.forEach(function(value,index, arr) {

        if(vowels.includes(value)) {
            count++;
        }
   })
   vowelCount.innerHTML = count
   
}


checkBtn.addEventListener("click", function() {

    vowelCountByUserInput()
})



