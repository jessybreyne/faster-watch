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
    hour24 = randomHour;
  }

  function convertTo12HourFormat() {
    const hour = parseInt(hour24, 10);
    ampm = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
      hour12 = `12`;
    } else if (hour > 12) {
      hour12 = `${(hour - 12).toString().padStart(2, "0")}`;
    } else {
      hour12 = `${hour.toString().padStart(2, "0")}`;
    }
  }

  function checkAnswer() {
    const userInputHour = parseInt(userInput, 10);

    if (userInputHour <= 12) {
      const userInput24 = (userInputHour % 12).toString().padStart(2, "0");
      const userInput24pm = ((userInputHour % 12) + 12).toString().padStart(2, "0");
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
    width: 50px;
    outline-color: initial;
    background-color: grey;
    color: white;
    border: 1px solid blue;
  }
  .error {
    color: red;
  }
</style>

<div class="container">
  <p>24h format (HH): {hour24}</p>
  <label for="userInput">12h format (hh):</label>
  <input
    type="text"
    id="userInput"
    value="{userInput}"
    on:input="{(event) => onInputChange(event)}"
    maxlength="2"
  />
  {#if success}
    <p>Success! Try another one.</p>
  {:else if error}
    <p class="error">Incorrect! Please try again.</p>
  {/if}
</div>
