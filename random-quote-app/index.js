
// const quoteText = document.getElementById("quote-description"),
//       quoteTag = document.getElementById("quote-tag"),
//       quoteAuthor = document.getElementById("quote-author")

const quoteBtn = document.getElementById("quote-btn")



  let getQuote = () => {
    fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
      let html = ''
      html += ` 
      <h4 id="quote-tag">Tags: ${data.tags}</h4>
      <blockquote id="quote-description">${data.content}</blockquote>
      <cite id="quote-author"> -- ${data.author}</cite>

      `;

     document.querySelector(".quote-info").innerHTML = html

    })

    
  }

quoteBtn.addEventListener("click", getQuote)