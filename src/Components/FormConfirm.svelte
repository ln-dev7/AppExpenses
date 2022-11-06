<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function confSupp(e) {
    dispatch("conf-supp");
  }

  function ferModalSupp(e) {
    dispatch("fer-modSupp")
  }
</script>

<div on:click={ferModalSupp} class="overlay" />
<form class="form" on:submit|preventDefault={confSupp} on:reset|preventDefault={ferModalSupp}>
  <div>
      <p>Voulez vous vraiment supprimer ?</p>
  </div>
  <div>
    <button type="submit" class="yes">Oui</button>
  <button type="reset" class="no">Non</button>
  </div>
</form>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    width: 95%;
    border-radius: 0.5rem;
    padding: 2rem;
    background: #fff;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }

  p {
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
  }

  button {
    width: 100%;
    font-weight: 500;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: .25rem;
    cursor: pointer;
  }

  .yes {
    background: #f0214ad0;
    color: #fff;
  }

  .no {
    background: #4f46e5;
    color: #fff;
  }
</style>