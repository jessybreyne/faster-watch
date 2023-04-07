<!-- TimeConversion.svelte -->
<script lang="ts">
  let hour24 = "";
  let userInput = "";
  let hour12 = "";
  let ampm = "";
  let success = false;
  let error = false;

  function generateRandomHour24() {
    const randomHour = Math.floor(Math.random() * 24).toString().padStart(2, "0");
    const randomMinute = Math.floor(Math.random() * 60).toString().padStart(2, "0");
    hour24 = randomHour + randomMinute;
  }

  function convertTo12HourFormat() {
    const hour = parseInt(hour24.slice(0, 2), 10);
    const minutes = hour24.slice(2);
    ampm = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
      hour12 = `12:${minutes}`;
    } else if (hour > 12) {
      hour12 = `${(hour - 12).toString().padStart(2, "0")}:${minutes}`;
    } else {
      hour12 = `${hour.toString().padStart(2, "0")}:${minutes}`;
    }
  }

  function checkAnswer() {
    const userInputHour = parseInt(userInput.slice(0, 2), 10);
    const userInputMinute = userInput.slice(3, 5);

    if (userInputHour <= 12) {
      const userInput24 = (userInputHour % 12).toString().padStart(2, "0") + userInputMinute;
      const userInput24pm = ((userInputHour % 12) + 12).toString().padStart(2, "0") + userInputMinute;
      success = userInput24 === hour24 || userInput24pm === hour24;
    } else {
      success = false;
    }
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
    const value = (event.target as HTMLInputElement).value.replace(':', '');
    if (value.length === 2 && !(event.target as HTMLInputElement).value.includes(':')) {
      userInput = (event.target as HTMLInputElement).value + ':';
    } else {
      userInput = (event.target as HTMLInputElement).value;
    }

    if (userInput.length === 5 || userInput.length === 7) {
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
    width: 100px;
  }
  .error {
    color: red;
  }
</style>

<div class="container">
  <p>24h format (HH:mm): {hour24.slice(0, 2)}:{hour24.slice(2)}</p>
  <label for="userInput">12h format (hh:mm):</label>
  <input
    type="text"
    id="userInput"
    value="{userInput}"
    on:input="{(event) => onInputChange(event)}"
    maxlength="7"
  />
  {#if success}
    <p>Success! Try another one.</p>
  {:else if error}
    <p class="error">Incorrect! Please try again.</p>
  {/if}
</div>
