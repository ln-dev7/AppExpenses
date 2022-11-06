<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let defaultNom;
  export let defaultMontant;
  export let defaultDescription;

  export let nomChg = defaultNom;
  export let montantChg = defaultMontant;
  export let descriptionChg = defaultDescription;

  function modifDep(e) {
    dispatch("modif-depense", {
      nom: nomChg,
      montant: montantChg,
      description: descriptionChg,
    });
    nomChg = "";
    montantChg = "";
    descriptionChg = "";
  }

  function ferModal(e) {
    dispatch("fer-mod");
  }
</script>

<div on:click={ferModal} class="overlay" />
<form class="carte nt-5" on:submit|preventDefault={modifDep}>
  <div class="form-group mb-3">
    <input
      bind:value={nomChg}
      type="text"
      class="form-control"
      placeholder={defaultNom}
    />
  </div>
  <div class="form-group mb-3">
    <input
      bind:value={montantChg}
      type="number"
      class="form-control"
      placeholder={defaultMontant}
    />
  </div>
  <div class="form-group mb-3">
    <input
      bind:value={descriptionChg}
      type="text"
      class="form-control"
      placeholder={defaultDescription}
    />
  </div>
  <button type="submit" class="btn btn-primary">Changer</button>
  <button on:click={ferModal} class="btn btn-secondary">Annuler</button>
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
