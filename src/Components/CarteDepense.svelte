<script>
  import { createEventDispatcher } from "svelte";
  import FormChange from "./FormChange.svelte";
  import FormConfirm from "./FormConfirm.svelte";

  const dispatch = createEventDispatcher();

  export let nom;
  export let montant;
  export let id;
  export let description;
  export let date;

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
    if (
      e.detail.nom == "" ||
      e.detail.montant == "" ||
      e.detail.description == ""
    ) {
      alert("Veuillez entrer tout les champs !");
    } else {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const formattedToday = dd + "-" + mm + "-" + yyyy;

      nom = e.detail.nom;
      montant = e.detail.montant;
      description = e.detail.description;
      date = `Modifié le  ${formattedToday}`;
      ouvr = false;
    }
    dispatch("mod-depense", {
      id: id,
      nom: nom,
      montant: montant,
      description: description,
      date: date,
    });
  }
</script>

<div class="container">
  <div class="card">
    <h3>{nom}</h3>
    <p>{description}</p>
    <h2>{montant} XAF</h2>
    <h5>{date}</h5>
    <button class="card-edit" on:click={ouvrModal}>Modifier</button>
    <button class="card-delete" on:click={ouvrModalSupp}>Supprimer</button>
  </div>
</div>

{#if ouvr}
  <FormChange
    on:fer-mod={ferModal}
    on:modif-depense={modifDep}
    defaultNom={nom}
    defaultMontant={montant}
    defaultDescription={description}
  />
{/if}

{#if ouvrSupp}
  <FormConfirm on:fer-modSupp={ferModalSupp} on:conf-supp={supprDep} />
{/if}

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 3);
    padding: .5rem;
    height: max-content;
  }
  @media screen and (max-width: 1000px) {
    .container {
    width: calc(100% / 2);
    }
  }
  @media screen and (max-width: 720px) {
    .container {
      width: 100%;
    }
  }
  .card {
    width: 100%;
    background: #fff;
    border-radius: .5rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid #EEF2FF;
  }
  .card:hover{
    box-shadow: 0 0 0 2px #726bea;
  }
  .card h2 {
    width: 100%;
    font-size: 1.5rem;
    padding: .75rem 0 0 0;
    font-weight: 700;
    color: #4f46e5;
    word-break: break-all;
  }
  .card h3 {
    font-size: 2rem;
    font-weight: 600;
    word-break: break-all;
  }
  .card h5 {
    width: 100%;
    font-size: 15px;
    color: #334155;
    word-break: break-all;
    font-weight: 300;
    font-style: italic;
    opacity: 0.5;
    text-align: right;
  }
  .card p {
    width: 100%;
    font-weight: 300;
    font-size: 15px;
    color: #4b5563;
    word-break: break-all;
    opacity: .8;
  }

  button {
    width: 100%;
    margin-top: 0.5rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  button:hover {
    opacity: 0.8;
  }

  .card-edit {
    background: #4f46e5;
    color: #fff;
  }

  .card-delete {
    background: #EEF2FF;
    color: #4f46e5;
  }
</style>
