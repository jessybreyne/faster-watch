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
    const randomHour = Math.floor(Math.random() * 12 + 12).toString().padStart(2, "0");
    hour24 = randomHour;
  }

  function convertTo12HourFormat() {
    const hour = parseInt(hour24, 10);

    if (hour === 0) {
      hour12 = `12`;
    } else if (hour > 12) {
      hour12 = `${(hour - 12).toString()}`;
    } else {
      hour12 = `${hour.toString()}`;
    }
  }

  function checkAnswer() {
    success = hour24 === userInput;
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
  <h3>{hour12}h {ampm}</h3>
  <label for="userInput">24h format (HH):</label>
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
