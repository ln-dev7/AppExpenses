<script>
  import { createEventDispatcher } from "svelte";
import FormChange from "./FormChange.svelte";
import FormConfirm from "./FormConfirm.svelte";

  const dispatch = createEventDispatcher();

  export let nom;
  export let montant;
  export let id;

  function supprDep() {
    dispatch("suppr-depense", { id: id });
  }

  function ouvrirModal() {
    dispatch("ouvrir-modal", { id: id });
  }

   $: ouvr = false;

  function ouvrModal(e) {
    ouvr = !ouvr;
  }
  function ferModal() {
    ouvr = false;
  }

  $: ouvrSupp = false;

  function ouvrModalSupp(e) {
    ouvrSupp = !ouvrSupp;
  }
  function ferModalSupp() {
    ouvrSupp = false;
  }

  function modifDep(e) {
      if (e.detail.nom == "" || e.detail.montant == "") {
        alert("Veuillez entrer tout les champs !");
      } else {
        nom = e.detail.nom;
        montant = e.detail.montant;

        ouvr = false;
      }
      dispatch("mod-depense", { id: id, nom: nom, montant: montant });
    }
</script>

<div class="card my-3">
  <div class="card-body">
    <h3>{nom}</h3>
    <p>{montant} XAF</p>
    <div class="card-right">
      <i class="edit" on:click={ouvrModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          ><path fill="none" d="M0 0h24v24H0z" /><path
            d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
            fill="rgba(77,198,113,1)"
          /></svg
        >
      </i>
      <i class="trash" on:click={ouvrModalSupp}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          ><path fill="none" d="M0 0h24v24H0z" /><path
            d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm3-3V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9zm0 8v6h2v-6H9zm4 0v6h2v-6h-2z"
            fill="rgba(255,0,0,1)"
          /></svg
        >
      </i>
    </div>
  </div>
</div>

{#if ouvr}
  <FormChange
    on:fer-mod={ferModal}
    on:modif-depense={modifDep}
  />
{/if}

{#if ouvrSupp}
  <FormConfirm on:fer-modSupp={ferModalSupp} on:conf-supp={supprDep} />
{/if}

<style>
  .card {
    position: relative;
  }
  .card h3 {
    font-size: 35px;
  }
  .card p {
    font-weight: 300;
    font-size: 15px;
  }
  i {
    cursor: pointer;
    margin: 0 0.5rem;
  }
  i svg {
    width: 30px;
  }
  .card-right {
    position: absolute;
    top: 10px;
    right: 20px;
  }
</style>
