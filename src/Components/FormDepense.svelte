<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let objNvDep = {
    nom: "",
    montant: "",
    description: "",
  };
  function nouvelleDepense(e) {
    dispatch("nv-depense", {
      nom: objNvDep.nom,
      montant: objNvDep.montant,
      description: objNvDep.description,
    });

    objNvDep.nom = "";
    objNvDep.montant = "";
    objNvDep.description = "";
  }

  export let recherche = "";
  function rechercheFunc() {
    dispatch("recherche-dep", { txt: recherche });
  }
</script>

<form class="form" on:submit|preventDefault={nouvelleDepense}>
  <div class="form-container">
    <div class="form-add">
      <div class="form-input">
        <label for="depense"> Nom de la dépense </label>
        <input
          bind:value={objNvDep.nom}
          type="text"
          id="depense"
          placeholder="Entrez une nouvelle dépense"
        />
      </div>
      <div class="form-input">
        <label for="amount"> Montant </label>
        <input
          bind:value={objNvDep.montant}
          type="number"
          id="amount"
          placeholder="Montant de la dépense en XAF"
        />
      </div>
      <div class="form-input">
        <label for="description"> Description de la dépense </label>
        <input
          bind:value={objNvDep.description}
          type="text"
          id="description"
          placeholder="Entrez une description"
        />
      </div>
    </div>
    <button type="submit" class="add">Ajouter la dépense</button>
    <div>
      <input
        type="search"
        class="form-search"
        placeholder="Rechercher une dépense"
        bind:value={recherche}
        on:input={rechercheFunc}
      />
    </div>
  </div>
</form>

<style>
  .form {
    width: 100%;
    padding: 1.5rem 0;
    background: #F0F4FEAF;
    border-bottom: 1px solid #716bea39;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    width: 95%;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-add {
    display: grid;
    grid-gap: 1rem;
    grid-template-areas: "nom montant" "description description";
  }

  @media screen and (max-width: 580px) {
    .form-add {
      grid-template-areas: "nom" "montant" "description";
      grid-gap: .5rem;
    }
  }

  .form-input:nth-child(1) {
    grid-area: nom;
  }

  .form-input:nth-child(2) {
    grid-area: montant;
  }

  .form-input:nth-child(3) {
    grid-area: description;
  }

  .form-input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .form-input label {
    font-weight: 500;
    margin-bottom: 0.25rem;
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

  .add {
    width: fit-content;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 2px solid #fff;
    background: #fff;
    color: #726bea;
    font-weight: 600;
    box-shadow: 0 0 0 2px #726bea;
    cursor: pointer;
  }

  .add:hover {
    background: #0ea4e920;
  }

  @media screen and (max-width: 460px) {
    .add {
      width: 100%;
    }
  }

  .form-search {
    width: 100%;
    border: none;
    box-shadow: 0 0 0 1px #bcbec3;
    border-radius: 4px;
    padding: 10px;
    outline: none;
    font-weight: 400;
  }
  .form-search:focus {
    box-shadow: 0 0 0 2px #0EA5E9;
  }
</style>
