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
<form class="form" on:submit|preventDefault={modifDep}>
  <div class="form-input">
    <input bind:value={nomChg} type="text" placeholder="Nouveau nom" />
  </div>
  <div class="form-input">
    <input
      bind:value={montantChg}
      type="number"
      class="form-control"
      placeholder="Nouveau montant"
    />
  </div>
  <div class="form-input">
    <input
      bind:value={descriptionChg}
      type="text"
      class="form-control"
      placeholder="Nouvelle description"
    />
  </div>
  <div>
    <button type="submit" class="change">Changer</button>
    <button on:click={ferModal} class="cancel">Annuler</button>
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

  .form-input input {
    width: 100%;
    border: none;
    box-shadow: 0 0 0 1px #bcbec3;
    border-radius: 4px;
    padding: 10px;
    outline: none;
    font-weight: 400;
  }

  .form-input input:focus {
    box-shadow: 0 0 0 2px #726bea;
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

  .change {
    background: #4f46e5;
    color: #fff;
  }

  .cancel {
    background: #F3F5FD;
    color: #0F172A;
  }
</style>
