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
  <div>
    <div class="form-input">
      <label for="depense"> Nom de la dépense </label>
      <input
        bind:value={objNvDep.nom}
        type="text"
        id="depense"
        class="form-input-name"
        placeholder="Entrez une nouvelle dépense"
      />
    </div>
    <div class="form-input">
      <label for="amount"> Montant </label>
      <input
        bind:value={objNvDep.montant}
        type="number"
        id="amount"
        class="form-input-amount"
        placeholder="Montant de la dépense en XAF"
      />
    </div>
  </div>
  <div>
    <div class="form-input">
      <label for="description"> Description de la dépense </label>
      <input
        bind:value={objNvDep.description}
        type="text"
        id="description"
        class="form-input-description"
        placeholder="Entrez une description"
      />
    </div>
  </div>
  <button type="submit" class="add">Ajouter la dépense</button>
  <div>
    <input
      type="search"
      class="form-control"
      placeholder="Rechercher une dépense"
      bind:value={recherche}
      on:input={rechercheFunc}
    />
  </div>
  <hr />
</form>

<style>
  .form {
    width: 100%;
  }
  .add {
    background-color: #0ea5e9;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  @media only screen and (max-width: 600px) {
    button {
      width: 100%;
    }
  }
</style>
