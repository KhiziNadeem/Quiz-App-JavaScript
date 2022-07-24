const questContain = document.getElementById('quest-contain');
const btnGrid = document.getElementById('btn-grid');
const startBtn = document.getElementById('start-btn')
const questionElement = document.getElementById('question');
const nextBtn = document.getElementById('next-btn');
let shuffledQuestions, currentQuestionIndex;
const ansBtnElement = document.getElementById('btn-grid');

startBtn.addEventListener('click',startGame);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if(shuffledQuestions.length > currentQuestionIndex+1)
    {
        setNextQuestion()
    }
    else{
        setNextQuestion()
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
        nextBtn.classList.add('hide');
    }
})

function startGame(){
    document.getElementById('start-btn').classList.add('hide');
    shuffledQuestions = questions.sort(()=> Math.random() - .5);
    currentQuestionIndex = 0;
    questContain.classList.remove('hide');
    btnGrid.classList.remove('hide');
    nextBtn.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(quest){
    questionElement.innerText = quest.question;
    quest.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        btnGrid.appendChild(button);
    })
}

function resetState()
{
    clearStatusClass(document.body);
    nextBtn.classList.remove('hide');
    while(btnGrid.firstChild){
        btnGrid.removeChild(btnGrid.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(btnGrid.children).forEach(btn =>
    {
        setStatusClass(btn, btn.dataset.correct)
    })
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct)
    {
        element.classList.add('correct')
    }
    else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element)
{
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2+2?',
        answers:[
            { text: '4', correct:true },
            { text: '22', correct:false},
            { text:'7', correct:false},
            { text:'10', correct:false}
        ]
    },
    {
        question: 'Who are you?',
        answers:[
            { text: 'Abdullah', correct:false },
            { text: 'Usama', correct:false},
            { text:'Khizar', correct:true},
            { text:'Hamza', correct:false}
        ]
    },
    {
        question: 'Where do you study?',
        answers:[
            { text: 'NUST', correct:false },
            { text: 'FAST', correct:true},
            { text:'LUMS', correct:false},
            { text:'UET', correct:false}
        ]
    }
]