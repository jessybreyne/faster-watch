<script>
let formatOptions = [
    { id: 12, value: "12h" },
    { id: 24, value: "24h" },
  ];

  let showNumbersOptions = [
    { id: "true", value: "With numbers" },
    { id: "false", value: "Without numbers" },
  ];

  let selectedFormat = formatOptions[0].id;
  let selectedShowNumbers = showNumbersOptions[0].id;
  let format = selectedFormat;
  let showNumbers = selectedShowNumbers;

  function updateFormat(newFormat) {
    selectedFormat = newFormat;
    format = selectedFormat;
  }

  function updateShowNumbers(newShowNumbers) {
    selectedShowNumbers = newShowNumbers;
    showNumbers = selectedShowNumbers;
  }
  import Clock from './Clock.svelte';

  let userInput = '';
  let message = '';
  let messageType = '';
  let randomTime = getRandomTime();
  let amPm = '';
  updateAmPm();
  let correctAnswers = 0;
let timerActive = false;
let timeRemaining = 60;

  function getRandomTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return new Date(1970, 0, 1, hours, minutes);
  }

  function onInputChange(event) {
    message = '';
    userInput = event.target.value;
    if (userInput.length === 2 && !userInput.includes(':')) {
      userInput += ':';
    }
    if (userInput.length === 5) {
      checkAnswer();
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Backspace' && userInput.length === 3) {
      userInput = userInput.slice(0, -1);
    }
  }

function checkAnswer() {
    const formattedTime = randomTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const [randomHours, randomMinutes] = formattedTime.split(':').map(Number);
    let [inputHours, inputMinutes] = userInput.split(':').map(Number);

    // Convertir 24h en 0h
    if (inputHours === 24) {
        inputHours = 0;
    }

    // Traiter 00:xx comme 24:xx si nécessaire
    if (randomHours === 24 && inputHours === 0) {
        inputHours = 24;
    }

    const hoursMatch = randomHours === inputHours;
    const minutesDifference = Math.abs(randomMinutes - inputMinutes);
    const minutesMatch = minutesDifference <= 3;

    if (hoursMatch && minutesMatch) {
      if (!timerActive) {
      startTimer();
    }
    correctAnswers += 1;
      message = 'Success';
      messageType = 'success';
      userInput = '';
      randomTime = getRandomTime(); // Génère une nouvelle heure aléatoire
      updateAmPm();

    } else {
      message = 'Incorrect';
      messageType = 'error';
    }
}

  function updateAmPm() {
    amPm = randomTime.getHours() >= 12 ? 'PM' : 'AM';
  }

  function startTimer() {
  timerActive = true;
  const timerInterval = setInterval(() => {
    timeRemaining -= 1;
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timerActive = false;
      alert(`Le minuteur est terminé. Vous avez ${correctAnswers} bonnes réponses.`);
      timeRemaining = 60;
      correctAnswers = 0;
    }
  }, 1000);
}



</script>

<div class="container">
  <p class="timer">Temps restant : {timeRemaining}s</p>
  <Clock time={randomTime} {format} showNumbers="{showNumbers}" />
   <p class="ampm">{amPm}</p>
  <input
    type="text"
    value="{userInput}"
    on:input="{onInputChange}"
    on:keydown="{onKeyDown}"
    maxLength="5"
  />
  <p class="{messageType === 'success' ? 'success' : 'error'}">{message}</p>
  <label for="format">Format:</label>
  <div>
    {#each formatOptions as option}
      <button
        class="{option.id === selectedFormat ? 'active' : ''}"
        on:click={() => updateFormat(option.id)}
      >
        {option.value}
      </button>
    {/each}
  </div>
  <label for="showNumbers">Affichage:</label>
  <div>
    {#each showNumbersOptions as option}
      <button
        class="{option.id === selectedShowNumbers ? 'active' : ''}"
        on:click={() => updateShowNumbers(option.id)}
      >
        {option.value}
      </button>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  input {
    width: 70px;
    height: 50px;
    box-shadow: none;
    border: 2px solid white;
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    padding: 5px 15px;
    background: none;
    color: white;
    text-align: center;
  }
  input:focus {
    outline: none;
    border-color: var(--primary);
  }
  input:hover {
    border-color: var(--primary-hover);
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  button {
    margin-right: 0.5rem;
    border: 2px solid white;
    transition: all 0.3s ease-in-out;
    padding: 5px 15px;
    color: white;
    background: none;
    cursor: pointer;
  }
  button:hover {
    color: black;
    background: white;
  }
  .active {
    background-color: var(--primary);
    color: white;
  }
  .ampm {
    font-size: 18px;
    font-weight: bold;
    margin-top: -10px;
  }
  .timer {
  color: white;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>