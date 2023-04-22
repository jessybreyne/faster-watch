<!-- TimeConversion.svelte -->
<script lang="ts">
  export let url;

  import { getLangFromUrl, useTranslations } from '../i18n/utils';

  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  let hour24 = "";
  let userInput = "";
  let hour12 = "";
  let ampm = "PM";
  let success = false;
  let error = false;

  function generateRandomHour24() {
  const randomHour = Math.floor(Math.random() * 24).toString().padStart(2, "0");
  hour24 = randomHour;
}


  function convertTo12HourFormat() {
  const hour = parseInt(hour24, 10);

  if (hour === 0) {
    hour12 = `12`;
    ampm = "AM";
  } else if (hour > 12) {
    hour12 = `${(hour - 12).toString()}`;
    ampm = "PM";
  } else {
    hour12 = `${hour.toString()}`;
    ampm = hour === 12 ? "PM" : "AM";
  }
}


function checkAnswer() {
  const inputHour = parseInt(userInput, 10);

  success = parseInt(hour12, 10) === inputHour && (inputHour >= 1 && inputHour <= 12);
  error = !success;

  if (success) {
    userInput = "";
    generateRandomHour24();
    convertTo12HourFormat();
  }
}



function onInputChange(event: Event) {
  success = false;
  error = false;
  userInput = (event.target as HTMLInputElement).value;

  if (userInput.length === 2) {
    checkAnswer();
  }
}


  generateRandomHour24();
  convertTo12HourFormat();

</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  h3 {
    font-size: 3rem;
  }
</style>

<div class="container">
  <h3>{hour24}h </h3>
  <label for="userInput">12h format (HH):</label>
  <input
    type="text"
    id="userInput"
    value="{userInput}"
    on:input="{(event) => onInputChange(event)}"
    maxlength="2"
  />
  {#if success}
    <p class="success">{t('success')}</p>
  {:else if error}
    <p class="error">{t('error')}</p>
  {/if}
</div>
