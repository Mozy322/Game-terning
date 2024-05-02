// Variabler for poengsum, rundePoeng, aktivSpiller, og gameIsOn
var poengsum, rundePoeng, aktivSpiller;
var gameIsOn = false;
var winningScore = 100; // Standard verdi for antall poeng som trengs for å vinne
 
// Start spillet-funksjonen
const startSpill = () => {
    // Tilbakestiller variabler
    poengsum = [0, 0];
    aktivSpiller = 0;
    rundePoeng = 0;
    gameIsOn = true;
 
    // Skjuler terningen og tilbakestiller GUI
    document.querySelector('.terning').style.display ='none';
    document.getElementById('poeng-0').textContent = '0';
    document.getElementById('poeng-1').textContent = '0';
    document.getElementById('sum-0').textContent = '0';
    document.getElementById('sum-1').textContent = '0';
}
 
// Kast terning-funksjonen
const kastTerning = () => {
    let terning = Math.floor(Math.random() * 6) + 1; // Kast terning
    document.querySelector('.terning').style.display ='block'; // Vis terningen
    console.log('terning:',terning);
    document.querySelector('.terning').src = 'img/terning-' + terning + '.png'; // Vis riktig terningbilde
 
    rundePoeng = rundePoeng + terning; // Legg til poeng fra denne runden
    console.log('rundePoeng:',rundePoeng);
    document.getElementById('poeng-' + aktivSpiller).textContent = rundePoeng; // Oppdater GUI med rundePoeng
 
    if(terning === 1) { // Hvis en-er er kastet
        console.log('Du fikk 1');
        rundePoeng = 0; // Nullstill rundePoeng
        document.getElementById('poeng-' + aktivSpiller).textContent = rundePoeng; // Oppdater GUI
        byttSpiller(); // Bytt til neste spiller
    } else {
        // Fortsett med samme spiller
        checkWin(); // Sjekk om spilleren har vunnet
    }
}
 
// Bytt spiller-funksjonen
const byttSpiller = () => {
    console.log('byttSpiller func');
    if(gameIsOn){ // Sjekker om spillet er i gang
        aktivSpiller === 0 ? aktivSpiller = 1 : aktivSpiller = 0; // Bytter aktiv spiller
        rundePoeng = 0; // Nullstiller rundePoeng
        document.getElementById('poeng-' + aktivSpiller).textContent = '0'; // Nullstiller GUI for ny runde
        document.getElementById('sum-' + aktivSpiller).textContent = poengsum[aktivSpiller]; // Oppdaterer total poengsum for aktiv spiller
 
        // Endre visuell indikasjon av aktiv spiller i GUI
        document.querySelector('.spiller-0-panel').classList.toggle('aktiv');
        document.querySelector('.spiller-1-panel').classList.toggle('aktiv');
    }
}
 
// Behold poeng-funksjonen
const holdFunction = () => {
    // Beholder rundePoengene til spilleren
    poengsum[aktivSpiller] += rundePoeng;
    // Oppdaterer GUI
    document.getElementById('poeng-' + aktivSpiller).textContent = '0';
    document.getElementById('sum-' + aktivSpiller).textContent = poengsum[aktivSpiller];
    // Sjekk om spilleren har vunnet
    checkWin();
    // Bytter til neste spiller
    byttSpiller();
}
 
// Funksjon for å vise vinnermelding og starte på nytt
function displayWinnerAndRestart(winner) {
    var winnerMessageElement = document.getElementById('winnerMessage');
    winnerMessageElement.textContent = winner + ' vinner!';
    winnerMessageElement.style.display = 'block';
    setTimeout(() => {
        winnerMessageElement.style.display = 'none';
        startSpill(); // Start spillet på nytt etter 3 sekunder
    }, 3000);
}
 
// Funksjon for å sjekke om en spiller har vunnet
function checkWin() {
    if (poengsum[aktivSpiller] >= winningScore) {
        gameIsOn = false;
        var winner = aktivSpiller === 0 ? document.getElementById('navn-0').textContent : document.getElementById('navn-1').textContent;
        displayWinnerAndRestart(winner); // Vis vinnermelding og start på nytt
    }
}
 
// Event-lyttere for knappene
const nyttSpillKnapp = document.querySelector('.btn-ny');
nyttSpillKnapp.addEventListener('click', startSpill);
 
const kastTerningKnapp = document.querySelector('.btn-kast');
kastTerningKnapp.addEventListener('click', kastTerning);
 
const holdKnapp = document.querySelector(".btn-hold");
holdKnapp.addEventListener("click", holdFunction);