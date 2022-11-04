<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let objNvDep = {
    nom: "",
    montant: "",
  };
  function nouvelleDepense(e) {
    dispatch("nv-depense", { nom: objNvDep.nom, montant: objNvDep.montant });

    objNvDep.nom = "";
    objNvDep.montant = "";
  }

  export let recherche = "";
  function rechercheFunc() {
    dispatch("recherche-dep", { txt: recherche });
  }
</script>

<form class="nt-5" on:submit|preventDefault={nouvelleDepense}>
  <div class="form-group mb-3">
    <label for="depense" class="lead font-weight-bold">
      Nom de la dépense
    </label>
    <input
      bind:value={objNvDep.nom}
      type="text"
      id="depense"
      class="form-control"
      placeholder="Entrez une nouvelle dépense"
    />
  </div>
  <div class="form-group mb-3">
    <label for="montant" class="lead font-weight-bold"> Montant </label>
    <input
      bind:value={objNvDep.montant}
      type="number"
      id="montant"
      class="form-control"
      placeholder="Montant de la dépense en XAF"
    />
  </div>
  <button type="submit" class="btn btn-outline-primary">Ajouter la dépense</button>
  <div class="form-group mt-3">
    <input
      type="search"
      class="form-control"
      placeholder="Rechercher une dépense"
      bind:value={recherche}
      on:input={rechercheFunc}
    />
  </div>
  <hr>
</form>

<style>
  @media only screen and (max-width: 600px) {
    button {
      width: 100%;
    }
  }

  
</style>
