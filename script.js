let correctPokemon;
let options = [];
let timer;
let contador = 0;

// Função para buscar um Pokémon aleatório pela API
async function getRandomPokemon() {
const randomId = Math.floor(Math.random() * 800) + 1; // Pega um Pokémon aleatório entre 1 e 150 (Geração 1)
const response = await
fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
const data = await response.json();
return data;
}


// Função para buscar quatro Pokémon aleatórios e embaralhar as opções
async function generateQuestion() {
    clearTimeout(timer);
    correctPokemon = await getRandomPokemon(); // Pokémon correto
    options = [correctPokemon]; // Adiciona o Pokémon correto nas opções
    
    // Adiciona mais 3 Pokémon aleatórios nas opções
    while (options.length < 4) {
    const randomPokemon = await getRandomPokemon();
    if (!options.includes(randomPokemon)) {
    options.push(randomPokemon);
    }
    }
    
    // Embaralha as opções
    options.sort(() => Math.random() - 0.5);
    
    displayQuestion(); // Exibe a imagem e as opções de resposta

    startTimer(10);
    }

    // Função para exibir a imagem do Pokémon e as opções de resposta
function displayQuestion() {
    const pokemonImage = document.getElementById('pokemonImage');
    pokemonImage.src = correctPokemon.sprites.front_default; // Exibe a imagem do Pokémon
    pokemonImage.style.display = 'block';
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Limpa as opções anteriores
    
    // Cria botões para cada uma das opções de resposta
    options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = capitalizeFirstLetter(option.name); // Nome do Pokémon
    button.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(button);
    });
    }

    // Função para verificar se a resposta está correta
function checkAnswer(selected) {
    clearTimeout(timer);
    const resultDiv = document.getElementById('result');
    if (selected.name === correctPokemon.name) {
    resultDiv.innerHTML = '<p>Correto!</p>';
    contador ++;
    document.getElementById('output').innerHTML = contador;
    } else {
    resultDiv.innerHTML = `<p>Incorreto! O Pokémon correto era:
    ${capitalizeFirstLetter(correctPokemon.name)}</p>`;
    }
    
    document.getElementById('nextButton').style.display = 'block'; // Exibe o botão "Próximo"
    }

    

    // Função para iniciar o temporizador
function startTimer(seconds) {
    const timerDiv = document.getElementById('timer');
    timerDiv.innerHTML = `Tempo restante: ${seconds} segundos`;

    timer = setInterval(() => {
        seconds--;
        timerDiv.innerHTML = `Tempo restante: ${seconds} segundos`;

        if (seconds <= 0) {
            clearInterval(timer);
            document.getElementById('result').innerHTML = `<p>Tempo esgotado! O Pokémon correto era: ${capitalizeFirstLetter(correctPokemon.name)}</p>`;
            document.getElementById('nextButton').style.display = 'block'; // Exibe o botão "Próximo"
        }
    }, 1000);
}


    // Quando o botão "Próximo" for clicado, gera uma nova pergunta
document.getElementById('nextButton').onclick = () => {
    document.getElementById('result').innerHTML = ''; // Limpa o resultado anterior
    document.getElementById('nextButton').style.display = 'none'; // Esconde o botão "Próximo"
    generateQuestion(); // Gera uma nova pergunta
    };

    // Função para capitalizar a primeira letra do nome do Pokémon
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
    generateQuestion();