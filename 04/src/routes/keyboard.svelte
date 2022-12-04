<script lang="ts">
  import { onMount } from 'svelte';
  import Key from './key.svelte';
  import type { KeyModel } from './key.type';

  const customWidths = new Map<string, number>([
    ["del", 109],
    ["caps", 129],
    ["enter", 128],
    ["tab", 108],
    ["lshift", 161],
    ["rshift", 165],
  ])

  const customKeyName = new Map<string, string>([
    ["lshift", "shift"],
    ["rshift", "shift"]
  ])

  const keyboardEventName = new Map<string, string>([
    ["del", "Backspace"]
  ])
  
  const row1 = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "del"];
  const row2 = ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"];
  const row3 = ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter"];
  const row4 = ["lshift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "rshift"];

  let keys: KeyModel[][] = [];
  let animatedRowId = 0;
  let animatedKeyId = 0;

  let keysDown = new Set<string>();

  function generateKeys(row: string[]) {
    return row.map((keyId) => {
      const key: KeyModel = { key: customKeyName.get(keyId) || keyId }
      key.width = customWidths.get(keyId) || 65;
      key.identifier = keyId;
      key.isAnimating = false;
      return key;
    });
  }

  function chooseNewAnimatedKey() {
    keys[animatedRowId][animatedKeyId].isAnimating = false;
    animatedRowId = Math.floor(Math.random() * 4);
    animatedKeyId = Math.floor(Math.random() * keys[animatedRowId].length);
    keys[animatedRowId][animatedKeyId].isAnimating = true;
    keys = keys;
  }

  onMount(() => {
    keys.push(generateKeys(row1));
    keys.push(generateKeys(row2));
    keys.push(generateKeys(row3));
    keys.push(generateKeys(row4));
    
    chooseNewAnimatedKey()
  });

  function doesKeyPressMatchExpectation(expectedKey: KeyModel, eventKey: string) {
    if (expectedKey.identifier === "del") {
      return eventKey === "Backspace";
    }
    if (expectedKey.identifier === "caps") {
      return eventKey === "CapsLock";
    }
    return expectedKey.key === eventKey.toLowerCase();
  }

  function doesShiftKeyMatchExpectation(expectedKey: KeyModel, eventKey) {
    if (expectedKey.identifier === "lshift"){
      return eventKey.code === "ShiftLeft";
    }
    if (expectedKey.identifier === "lshift"){
      return eventKey.code === "ShiftRight";
    }
  }

  function handleKeydown(event) {
    event.preventDefault();
		let char = (typeof event !== 'undefined') ? event.key : event.which
    console.log(event);
    if (keysDown.has(char)) return;
    keysDown.add(char);
    let expectedKey = keys[animatedRowId][animatedKeyId];
    if (expectedKey.key !== "shift") {
      if (doesKeyPressMatchExpectation(expectedKey, char)) {
        chooseNewAnimatedKey();
      }
    } else {
      if (doesShiftKeyMatchExpectation(expectedKey, event)) {
        chooseNewAnimatedKey();
      }
    }
  }

  function handleKeyup(event) {
    event.preventDefault();
		let char = (typeof event !== 'undefined') ? event.key : event.which
    keysDown.delete(char);
    if (char == "CapsLock") {
      if (doesKeyPressMatchExpectation(expectedKey, char)) {
        chooseNewAnimatedKey();
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>

<div class="keyboard">
  <div class="keys">
    {#each keys as keyRow}
      <div class="row">
        {#each keyRow as key}
          <Key {key} />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .keyboard {
    align-items: center;
    background-color: var(--keyboard-background-color);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    height: 383px;
    width: 1199px;
  }

  .keys {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 296px;
    width: 1109px;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    width: 100%;
  }
</style>