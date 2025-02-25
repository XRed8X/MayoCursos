// carrusel de imagenes


// Array de nombres de archivos de las imágenes
var images = ['banner.jpg','3.webp','rai.jpg','jap.jpg']

// Selecciona todos los elementos con la clase 'header'
var slides = document.querySelectorAll('.header')

// Inicializa el contador
var i = 0

// Función para establecer la imagen de fondo
function setBg() {
    // Recorre cada elemento en 'slides' y establece su imagen de fondo
    slides.forEach(function(slide) {
        slide.style.backgroundImage = "url('/img/banners/" + images[i] + "')"
    })
    // Incrementa el contador y usa el operador módulo para reiniciarlo al llegar al final del array
    i = (i + 1) % images.length
}

// Llama a 'setBg()' una vez para establecer la imagen inicial
setBg()

// Usa 'setInterval' para llamar a 'setBg' cada 5000 ms (5 segundos)
setInterval(setBg, 5000)



// quizz

// Datos del quiz: array de objetos con preguntas y respuestas.
const quizData = [
    {
        question: "¿Cuál es la principal diferencia entre un café espresso y un café americano?",
        a: "El color del café",
        b: "La taza para servirlo",
        c: "El tiempo de preparación",
        d: "El agua utilizada",
        correct: "d",
    },
    {
        question: "¿Qué tipo de molido es ideal para una cafetera de prensa francesa?",
        a: "Molido fino",
        b: "Molido grueso",
        c: "Molido medio",
        d: "Molido fino medio",
        correct: "b",
    },
    {
        question: "¿Cuál es el origen del término 'mocha' en el contexto del café?",
        a: "Una ciudad de Yemen con ese nombre",
        b: "Una receta colombiana que está en el curso",
        c: "Un señor la dijo al tomar su café",
        d: "La propuso un científico",
        correct: "a",
    },
    {
        question: "¿Qué es el 'latte art' y en qué tipo de bebida se encuentra comúnmente?",
        a: "Un patrón de diseño para 'Java' con Spring",
        b: "Una técnica de creación de diseños en la superficie del café",
        c: "Una manera de vender más",
        d: "Una solución cuando el café no está bueno",
        correct: "b",
    },
]

// Elementos del DOM
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

// Variables de estado
let currentQuiz = 0
let score = 0

// Carga la primera pregunta
loadQuiz()

function loadQuiz() {
    // Deselecciona todas las respuestas
    deselectAnswers()

    // Obtiene los datos de la pregunta actual
    const currentQuizData = quizData[currentQuiz]

    // Muestra la pregunta y las opciones en el DOM
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    // Deselecciona todas las respuestas marcadas
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    // Obtiene la respuesta seleccionada
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

// Maneja el evento de clic en el botón de enviar
submitBtn.addEventListener('click', () => {
    // Obtiene la respuesta seleccionada
    const answer = getSelected()
    
    if(answer) {
        // Verifica si la respuesta es correcta y actualiza el puntaje
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        // Avanza a la siguiente pregunta
        currentQuiz++

        // Carga la siguiente pregunta o muestra el resultado final si no hay más preguntas
        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
                <h4>Contestaste ${score}/${quizData.length} preguntas bien</h4>
                <img src="/img/chika.gif" alt="chika bailando" class="scores_gif">
                <button onclick="location.reload()">Reload</button>
            `
        }
    }
})


// progress-step

// Elementos del DOM para el progreso
const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('submit')
const circles = document.querySelectorAll('.circle')

// Variable de estado para el paso actual
let currentActive = 1

// Maneja el evento de clic en el botón de siguiente
next.addEventListener('click', () => {
    currentActive++

    // Asegura que currentActive no exceda el número de pasos
    if(currentActive > circles.length) {
        currentActive = circles.length
    }

    // Actualiza el progreso visual
    update()
})

// Maneja el evento de clic en el botón de anterior
prev.addEventListener('click', () => {
    currentActive--

    // Asegura que currentActive no sea menor que 1
    if(currentActive < 1) {
        currentActive = 1
    }

    // Actualiza el progreso visual
    update()
})

// Función para actualizar el progreso visual
function update() {
    circles.forEach((circle, idx) => {
        // Añade o remueve la clase 'active' según el paso actual
        if(idx < currentActive) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

    // Calcula y establece el ancho de la barra de progreso
    const actives = document.querySelectorAll('.active')
    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'
}
