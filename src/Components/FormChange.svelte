<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let nomChg = "";
  export let montantChg = "";

  function modifDep(e) {
    dispatch("modif-depense", { nom: nomChg, montant: montantChg });
    nomChg = "";
    montantChg = "";
  }

  function ferModal(e) {
    dispatch("fer-mod")
  }
</script>

<div on:click={ferModal} class="overlay" />
<form class="carte nt-5" on:submit|preventDefault={modifDep}>
  <div class="form-group mb-3">
    <input
      bind:value={nomChg}
      type="text"
      class="form-control"
      placeholder="Renomer la depense"
    />
  </div>
  <div class="form-group mb-3">
    <input
      bind:value={montantChg}
      type="number"
      class="form-control"
      placeholder="Renomer le montant"
    />
  </div>
  <button type="submit" class="btn btn-primary">Changer</button>
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
