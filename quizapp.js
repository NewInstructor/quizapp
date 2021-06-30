let questions = [{
        "question": "Wie viele Knochen hat ein Mensch?",
        "answer_1": "Der Mensch hat 9 Knochen",
        "answer_2": "Der Mensch hat 46 Knochen",
        "answer_3": "Der Mensch hat 106 Knochen",
        "answer_4": "Der Mensch hat 58 Knochen",
        "right_answer": 3
    },
    {
        "question": "Welche Hauptfunktion hat eine Bandscheibe?",
        "answer_1": "braucht man nicht",
        "answer_2": "Bewegungs- und Pufferfunktion",
        "answer_3": "Entspannungsfunktion",
        "answer_4": "Zum verdauen",
        "right_answer": 2
    },
    {
        "question": "Was sind Antagonisten?",
        "answer_1": "Ein Muskel am Unterschenkel",
        "answer_2": "Knochenarten",
        "answer_3": "Gehört zum Großhirn",
        "answer_4": "Gegenspieler eines Muskels",
        "right_answer": 4
    },
    {
        "question": "Welche Aufgabe hat eine Sehne?",
        "answer_1": "Überträgt die Kraft des Muskels auf den Knochen",
        "answer_2": "Stabilisierungsfunktion",
        "answer_3": "Sehnen haben keine Funktion",
        "answer_4": "Dienen als Blutbahn",
        "right_answer": 1
    },
];

let rightQuestions = 0;
let currentQuestion = 0;
let audio_correct = new Audio('audio/correct.mp3');
let audio_wrong = new Audio('audio/wrong.mp3');



function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}

// Fragen anzeigen
function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();

    } else {
        showNextQuestion();
        updateProgressbar();
    }
}


// Wann soll das Endscreen angezeigt werden
function gameIsOver() {
    return currentQuestion >= questions.length; // am Ende der Fragen Endscreen anzeigen

}



// Endscreen anzeigen
function showEndscreen() {
    document.getElementById('endScreen').style = ''; // blendet display none aus
    document.getElementById('questionBody').style = 'display: none'; // blendet die Fragen aus durch hinzufügen von display none

    document.getElementById('all-questions-endcard').innerHTML = questions.length; // zeigt an, wieviele Fragen es gibt
    document.getElementById('amount-of-rigth-questions').innerHTML = rightQuestions; // zeigt die Anzahl der richtigen Antworten
    document.getElementById('header-image').src = 'img/trophy.png'; // Bild austauschen 
}





// Nächste Frage anzeigen
function showNextQuestion() {

    let question = questions[currentQuestion]; // wenn nicht bei die letzte Frage, dann weitere Fragen anzeigen

    document.getElementById('question-number').innerHTML = currentQuestion + 1; // zeigt bei welcher Frage man ist. Mit + 1 wird die Zahl bei 1 anfangen
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


// Prozentanzeige updaten
function updateProgressbar() {
    let percent = (currentQuestion + 1) / questions.length; //Fortschrittsbalken Prozent berechnen
    percent = Math.round(percent * 100); // von 0,14 auf 14 hochrechnen / Math.round -> Rundet die Zahl
    document.getElementById('progress-bar').innerHTML = `${percent} %`; // die Prozentzahl in den Balken einfügen
    document.getElementById('progress-bar').style.width = `${percent}%`;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { // richtige Antwort
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audio_correct.play();
        rightQuestions++;
    } else { // falsche Antwort
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audio_wrong.play();
    }

    document.getElementById('next-button').disabled = false; // Button anklickbar machen 
    document.getElementById('overlay').classList.remove('d-none'); // Overlay überblendet die Antworten
}


// Button nächste Frage anklicken

function nextQuestion() {
    currentQuestion++; // Variable wird um 1 erhöht zb. von 0 auf 1
    showQuestion(); // Funktion wird mit den neuen Inhalten aufgerufen
    document.getElementById('next-button').disabled = true; // Button nicht anklickbar machen
    document.getElementById('overlay').classList.add('d-none'); // Overlay entfernen damit Antworten anklickbar sind

    resetAnswerButtons();
}


function resetAnswerButtons() { // Buttons sollen nicht mehr gefärbt sein
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');

}


function restartGame() {
    document.getElementById('header-image').src = 'img/quiz-img.jpg';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionBody').style = '';
}