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
<form class="carte mt-5" on:submit|preventDefault={confSupp} on:reset|preventDefault={ferModalSupp}>
  <div class="form-group mb-3">
      <p>Voulez vous vraiment supprimer ?</p>
  </div>
  <button type="submit" class="btn btn-danger">Oui</button>
  <button type="reset" class="btn btn-success">Non</button>
</form>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
  }
  .carte {
    max-width: 600px;
    width: 97%;
    border: 1px solid #333;
    padding: 15px;
    background: #fff;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
</style>