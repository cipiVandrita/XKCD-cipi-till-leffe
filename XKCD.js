window.onload =function() {
    document.maxComic = -1;
    getComic("latest");

    document.getElementById('forstBild').addEventListener('click',function(){getComic(1)});

    //pm siffran inte är 1 så går den till bilden före
    document.getElementById('bildFore').addEventListener('click',function(){
            if(document.currentComic != 1){
                getComic(document.currentComic-1)
            }
    });

    //tar en slump bild med max
    document.getElementById('slumpaBild').addEventListener('click',function(){getComic(Math.floor(Math.random() * document.maxComic) + 1)});

    //om bilden inte är max siffran så går den till nästa bild
    document.getElementById('bildEfter').addEventListener('click',function(){
            if(document.currentComic != document.maxComic){
                getComic(document.currentComic+1)
            }
    } );

    document.getElementById('sistBild').addEventListener('click',function(){getComic("latest")});
}

function getComic(which) {
    //returnerar json och verification
    fetch('https://xkcd.vercel.app/?comic='+which)
    .then(function(response){
        if(response.status==200){
            return response.json();
        }
    })
    //sätt siffra till rätt max
    .then(function(data){
        if(document.maxComic<data.num){
            document.maxComic=data.num;
        }
        appendComic(data);
 })
}

function appendComic(data) {
    //lagar en titel 
    let text = document.createElement('h2');
    text.innerHTML = data.title;

    let xkcdBild = document.getElementById('xkcdBild');
    xkcdBild.innerHTML="";
    xkcdBild.appendChild(text);

    //lagar bild
    let mediaComic = document.createElement('img');
    mediaComic.src = data.img;
    mediaComic.id = "comicImg";

    //sifran av bilden
    let numberComic = document.createElement('figcaption');
    numberComic.innerHTML = data.num;

    let figure = document.createElement('figure');
    figure.appendChild(mediaComic);
    figure.appendChild(numberComic);
    xkcdBild.appendChild(figure);

    //bild datum
    dateComic = document.createElement("p");
    let date = new Date(data.year, data.month-1, data.day);
    dateComic.innerHTML = date.toLocaleDateString();
    
    xkcdBild.appendChild(dateComic);

    document.currentComic = data.num;

}