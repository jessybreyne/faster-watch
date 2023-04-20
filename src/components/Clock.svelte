<script>
  export let format;
  export let showNumbers;
  export let time = new Date();
  console.log(time)
  let hourHand;
  let minuteHand;

  function setClockRotation(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const hours12 = hours % 12 + minutes / 60;

    let hourRotation;
    let minuteRotation = minutes * 6;

    if (parseInt(format) === 24) {
      hourRotation = (hours + minutes / 60) * 15 + 180;
    } else {
      hourRotation = hours12 * 30;
    }

    hourHand.style.transform = `rotate(${hourRotation}deg)`;
    minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
  }

  $: {
    if (hourHand && minuteHand && format) {
      setClockRotation(time);
  }
 }
</script>

<div class="clock fadeIn">
  <div class="wrap">
    <span id="heure" bind:this={hourHand}></span>
    <span id="minute" bind:this={minuteHand}></span>
    <span class="dot"></span>
    {#if parseInt(format) === 24}
      {#if showNumbers === 'true'}
        {#each Array(24).fill().map((_, i) => i + 1) as hour (hour)}
          <div class="sep" id={`best-h${hour}`}>{hour}</div>
        {/each}
      {:else}
        {#each Array(24).fill().map((_, i) => i + 1) as hour (hour)}
          <div class="sep" id={`best-h${hour}`}>|</div>
        {/each}
      {/if}
    {:else}
      {#if showNumbers === 'true'}
        {#each Array(12).fill().map((_, i) => i) as hour (hour)}
          <div class="sep" id={`h${hour}`}>{hour}</div>
        {/each}
      {:else}
        {#each Array(12).fill().map((_, i) => i) as hour (hour)}
          <div class="sep" id={`h${hour}`}>|</div>
        {/each}
      {/if}
    {/if}

    {#if showNumbers === 'true'}
      {#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute (minute)}
        <div class="sep" id={`m${minute}`}>{minute}</div>
      {/each}
    {:else}
      {#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute (minute)}
        <div class="sep" id={`m${minute}`}>|</div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .clock {
    border-radius: 50%;
    background: #fff;
    box-shadow: 8px 8px 1px 0 black;
    width: 350px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

.wrap {
    position: relative;
    width: 350px;
    height: 350px;
  }

#minute,
#heure {
    position: absolute;
    height: 100px;
    width: 6px;
    margin: auto;
    top: -27%;
    left: 0;
    bottom: 0;
    right: 0;
    transform-origin: bottom center;
    transform: rotate(0deg);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
    background: black;
    transition: all 0.4s ease-in-out,
}

#minute {
    position: absolute;
    height: 130px;
    width: 4px;
    top: -38%;
    left: 0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
    transform: rotate(90deg);
}

#seconde {
    position: absolute;
    height: 90px;
    width: 2px;
    margin: auto;
    top: -26%;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 4px;
    background: #ff4b3e;
    transform-origin: bottom center;
    transform: rotate(180deg);
}

.dot {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    border: 2px solid #1b1b1b;
    border-radius: 50%;
    margin: auto;
}

#best-h12 {
    -webkit-transform: translate(0px, -120px);
    -o-transform: translate(0px, -120px);
    transform: translate(0px, -120px);
}

#best-h13 {
    -webkit-transform: rotate(15deg) translate(0px, -120px);
    -o-transform: rotate(15deg) translate(0px, -120px);
    transform: rotate(15deg) translate(0px, -120px);
}

#best-h14 {
    -webkit-transform: rotate(30deg) translate(0px, -120px);
    -o-transform: rotate(30deg) translate(0px, -120px);
    transform: rotate(30deg) translate(0px, -120px);
}

#best-h15 {
    -webkit-transform: rotate(45deg) translate(0px, -120px);
    -o-transform: rotate(45deg) translate(0px, -120px);
    transform: rotate(45deg) translate(0px, -120px);
}

#best-h16 {
    -webkit-transform: rotate(60deg) translate(0px, -120px);
    -o-transform: rotate(60deg) translate(0px, -120px);
    transform: rotate(60deg) translate(0px, -120px);
}

#best-h17 {
    -webkit-transform: rotate(75deg) translate(0px, -120px);
    -o-transform: rotate(75deg) translate(0px, -120px);
    transform: rotate(75deg) translate(0px, -120px);
}

#best-h18 {
    -webkit-transform: rotate(90deg) translate(0px, -120px);
    -o-transform: rotate(90deg) translate(0px, -120px);
    transform: rotate(90deg) translate(0px, -120px);
}

#best-h19 {
    -webkit-transform: rotate(105deg) translate(0px, -120px);
    -o-transform: rotate(105deg) translate(0px, -120px);
    transform: rotate(105deg) translate(0px, -120px);
}

#best-h20 {
    -webkit-transform: rotate(120deg) translate(0px, -120px);
    -o-transform: rotate(120deg) translate(0px, -120px);
    transform: rotate(120deg) translate(0px, -120px);
}

#best-h21 {
    -webkit-transform: rotate(135deg) translate(0px, -120px);
    -o-transform: rotate(135deg) translate(0px, -120px);
    transform: rotate(135deg) translate(0px, -120px);
}

#best-h22 {
    -webkit-transform: rotate(150deg) translate(0px, -120px);
    -o-transform: rotate(150deg) translate(0px, -120px);
    transform: rotate(150deg) translate(0px, -120px);
}

#best-h23 {
    -webkit-transform: rotate(165deg) translate(0px, -120px);
    -o-transform: rotate(165deg) translate(0px, -120px);
    transform: rotate(165deg) translate(0px, -120px);
}

#best-h24 {
    -webkit-transform: rotate(180deg) translate(0px, -120px);
    -o-transform: rotate(180deg) translate(0px, -120px);
    transform: rotate(180deg) translate(0px, -120px);
}

#best-h1 {
    -webkit-transform: rotate(195deg) translate(0px, -120px);
    -o-transform: rotate(195deg) translate(0px, -120px);
    transform: rotate(195deg) translate(0px, -120px);
}

#best-h2 {
    -webkit-transform: rotate(210deg) translate(0px, -120px);
    -o-transform: rotate(210deg) translate(0px, -120px);
    transform: rotate(210deg) translate(0px, -120px);
}

#best-h3 {
    -webkit-transform: rotate(225deg) translate(0px, -120px);
    -o-transform: rotate(225deg) translate(0px, -120px);
    transform: rotate(225deg) translate(0px, -120px);
}

#best-h4 {
    -webkit-transform: rotate(240deg) translate(0px, -120px);
    -o-transform: rotate(240deg) translate(0px, -120px);
    transform: rotate(240deg) translate(0px, -120px);
}

#best-h5 {
    -webkit-transform: rotate(255deg) translate(0px, -120px);
    -o-transform: rotate(255deg) translate(0px, -120px);
    transform: rotate(255deg) translate(0px, -120px);
}

#best-h6 {
    -webkit-transform: rotate(270deg) translate(0px, -120px);
    -o-transform: rotate(270deg) translate(0px, -120px);
    transform: rotate(270deg) translate(0px, -120px);
}

#best-h7 {
    -webkit-transform: rotate(285deg) translate(0px, -120px);
    -o-transform: rotate(285deg) translate(0px, -120px);
    transform: rotate(285deg) translate(0px, -120px);
}

#best-h8 {
    -webkit-transform: rotate(300deg) translate(0px, -120px);
    -o-transform: rotate(300deg) translate(0px, -120px);
    transform: rotate(300deg) translate(0px, -120px);
}

#best-h9 {
    -webkit-transform: rotate(315deg) translate(0px, -120px);
    -o-transform: rotate(315deg) translate(0px, -120px);
    transform: rotate(315deg) translate(0px, -120px);
}

#best-h10 {
    -webkit-transform: rotate(330deg) translate(0px, -120px);
    -o-transform: rotate(330deg) translate(0px, -120px);
    transform: rotate(330deg) translate(0px, -120px);
}

#best-h11 {
    -webkit-transform: rotate(345deg) translate(0px, -120px);
    -o-transform: rotate(345deg) translate(0px, -120px);
    transform: rotate(345deg) translate(0px, -120px);
}

#h0 {
    -webkit-transform: translate(0px, -120px);
    -o-transform: translate(0px, -120px);
    transform: translate(0px, -120px);
}

#h1 {
    -webkit-transform: rotate(30deg) translate(0px, -120px);
    -o-transform: rotate(30deg) translate(0px, -120px);
    transform: rotate(30deg) translate(0px, -120px);
}

#h2 {
    -webkit-transform: rotate(60deg) translate(0px, -120px);
    -o-transform: rotate(60deg) translate(0px, -120px);
    transform: rotate(60deg) translate(0px, -120px);
}

#h3 {
    -webkit-transform: rotate(90deg) translate(0px, -120px);
    -o-transform: rotate(90deg) translate(0px, -120px);
    transform: rotate(90deg) translate(0px, -120px);
}

#h4 {
    -webkit-transform: rotate(120deg) translate(0px, -120px);
    -o-transform: rotate(120deg) translate(0px, -120px);
    transform: rotate(120deg) translate(0px, -120px);
}

#h5 {
    -webkit-transform: rotate(150deg) translate(0px, -120px);
    -o-transform: rotate(150deg) translate(0px, -120px);
    transform: rotate(150deg) translate(0px, -120px);
}

#h6 {
    -webkit-transform: rotate(180deg) translate(0px, -120px);
    -o-transform: rotate(180deg) translate(0px, -120px);
    transform: rotate(180deg) translate(0px, -120px);
}

#h7 {
    -webkit-transform: rotate(210deg) translate(0px, -120px);
    -o-transform: rotate(210deg) translate(0px, -120px);
    transform: rotate(210deg) translate(0px, -120px);
}

#h8 {
    -webkit-transform: rotate(240deg) translate(0px, -120px);
    -o-transform: rotate(240deg) translate(0px, -120px);
    transform: rotate(240deg) translate(0px, -120px);
}

#h9 {
    -webkit-transform: rotate(270deg) translate(0px, -120px);
    -o-transform: rotate(270deg) translate(0px, -120px);
    transform: rotate(270deg) translate(0px, -120px);
}

#h10 {
    -webkit-transform: rotate(300deg) translate(0px, -120px);
    -o-transform: rotate(300deg) translate(0px, -120px);
    transform: rotate(300deg) translate(0px, -120px);
}

#h11 {
    -webkit-transform: rotate(330deg) translate(0px, -120px);
    -o-transform: rotate(330deg) translate(0px, -120px);
    transform: rotate(330deg) translate(0px, -120px);
}

#m0 {
    -webkit-transform: translate(0px, -150px);
    -o-transform: translate(0px, -150px);
    transform: translate(0px, -150px);
}

#m5 {
    -webkit-transform: rotate(30deg) translate(0px, -150px);
    -o-transform: rotate(30deg) translate(0px, -150px);
    transform: rotate(30deg) translate(0px, -150px);
}

#m10 {
    -webkit-transform: rotate(60deg) translate(0px, -150px);
    -o-transform: rotate(60deg) translate(0px, -150px);
    transform: rotate(60deg) translate(0px, -150px);
}

#m15 {
    -webkit-transform: rotate(90deg) translate(0px, -150px);
    -o-transform: rotate(90deg) translate(0px, -150px);
    transform: rotate(90deg) translate(0px, -150px);
}

#m20 {
    -webkit-transform: rotate(120deg) translate(0px, -150px);
    -o-transform: rotate(120deg) translate(0px, -150px);
    transform: rotate(120deg) translate(0px, -150px);
}

#m25 {
    -webkit-transform: rotate(150deg) translate(0px, -150px);
    -o-transform: rotate(150deg) translate(0px, -150px);
    transform: rotate(150deg) translate(0px, -150px);
}

#m30 {
    -webkit-transform: rotate(180deg) translate(0px, -150px);
    -o-transform: rotate(180deg) translate(0px, -150px);
    transform: rotate(180deg) translate(0px, -150px);
}

#m35 {
    -webkit-transform: rotate(210deg) translate(0px, -150px);
    -o-transform: rotate(210deg) translate(0px, -150px);
    transform: rotate(210deg) translate(0px, -150px);
}

#m40 {
    -webkit-transform: rotate(240deg) translate(0px, -150px);
    -o-transform: rotate(240deg) translate(0px, -150px);
    transform: rotate(240deg) translate(0px, -150px);
}

#m45 {
    -webkit-transform: rotate(270deg) translate(0px, -150px);
    -o-transform: rotate(270deg) translate(0px, -150px);
    transform: rotate(270deg) translate(0px, -150px);
}

#m50 {
    -webkit-transform: rotate(300deg) translate(0px, -150px);
    -o-transform: rotate(300deg) translate(0px, -150px);
    transform: rotate(300deg) translate(0px, -150px);
}

#m55 {
    -webkit-transform: rotate(330deg) translate(0px, -150px);
    -o-transform: rotate(330deg) translate(0px, -150px);
    transform: rotate(330deg) translate(0px, -150px);
}

.sep {
    position: absolute;
    height: 10px;
    width: 10px;
    text-align: center;
    line-height: 10px;
    top: 175px;
    left: 175px;
    color: #3A5486;
}
</style>
