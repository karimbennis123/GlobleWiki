//FUNCTIONALITY #1 -----------------------------------------------------------------------------------------

function addWiki(country){

    if(document.querySelector(`div[data-country="${country}"]`)){
        return;
    }
    const div = document.createElement('div');
    div.setAttribute('data-country', country);
    div.classList.add("fact-div");

    observer.disconnect();

    document.body.appendChild(div);

    const factHTML = document.createElement('p');
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(country)}&format=json&origin=*&redirects`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
          const pages = data.query.pages;
          const page = Object.values(pages)[0];
          const intro = page.extract;
          const sentences = intro.split(". ")
                                .map(sentence => sentence.trim() + ".")
                                .filter(sentence => sentence.length > 1);
          const fact = sentences[Math.floor(Math.random() * sentences.length)];
          factHTML.innerHTML = `Fun fact: ${fact}`;
        });
    factHTML.style.textAlign = "center";
    factHTML.style.color = "black";
    factHTML.style.fontFamily = "Outfit";
    

    div.appendChild(factHTML);

    const link = document.createElement('a');
    link.style.display = "block";
    link.style.textAlign = "center";
    link.textContent = "learn more on Wikipedia";
    link.href = `https://wikipedia.org/wiki/${country}`;
    link.target = "_blank";
    link.style.color = "blue";
    link.style.marginTop = "10px";
    link.style.fontFamily = "Outfit";
    link.style.textDecoration = "underline";

    div.appendChild(link);

    observer.observe(document.body, observerOptions);

}

const observer = new MutationObserver(mutations => {

    mutations.forEach(mutation => {

        if(mutation.type === "childList"){
            const countryDOM = document.querySelector("#root > div.max-w-xs.sm\\:max-w-md.md\\:max-w-2xl.mx-auto.z-20.absolute.top-0.bottom-0.left-0.right-0.block > div.mt-10.mb-6.block.mx-auto.text-center > p");
            
            if(countryDOM && countryDOM.textContent.startsWith("The Mystery Country is")){
                const countryRAW = countryDOM.textContent;
    
                const country = countryRAW
                                .replace("The Mystery Country is ", "")
                                .replace("!", "")
                                .trim();
                addWiki(country);
            }
        }
    });
} )

const observerOptions = {

    childList: true,
    subtree: true,
};

const body = document.body;
observer.observe(body, observerOptions);



