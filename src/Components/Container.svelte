<script>
  import CarteDepense from "./CarteDepense.svelte";
  import FormDepense from "./FormDepense.svelte";
  import { v4 as uuidv4 } from "uuid";
  //import storeData from "./../Store/depenses";
  import { tableauStock } from "../Store/store";
  import { store } from "../Store/store";

  let tableauCartes = [];

  if ($store.length != 0) {
    tableauCartes = $store;
  }

  $: total = tableauCartes.reduce((acc, curr) => {
    return (acc += curr.montant);
  }, 0);

  function modDep(e) {
    tableauCartes.forEach((el) => {
      if (el.id === e.detail.id) {
        el.nom = e.detail.nom;
        el.montant = e.detail.montant;
      }
    });

    total = tableauCartes.reduce((acc, curr) => {
      return (acc += curr.montant);
    }, 0);
  }

  function ajoutDepense(e) {
    let nvObjb = { id: uuidv4(), nom: e.detail.nom, montant: e.detail.montant };

    if (e.detail.nom == "" || e.detail.montant == "") {
      alert("Veuillez entrer tout les champs !");
    } else {
      tableauCartes = [...tableauCartes, nvObjb];
      $store = [...$store, nvObjb];
    }
  }

  function supprCarte(e) {
    if (tableauRecherche.length !== 0) {
      tableauRecherche = tableauRecherche.filter(
        (dep) => dep.id !== e.detail.id
      );
      tableauCartes = tableauCartes.filter((dep) => dep.id !== e.detail.id);
      $store = $store.filter((dep) => dep.id !== e.detail.id);
    } else {
      tableauCartes = tableauCartes.filter((dep) => dep.id !== e.detail.id);
      $store = $store.filter((dep) => dep.id !== e.detail.id);
    }
  }

  let tableauRecherche = [];
  let contenuRecherche;
  let verCon = false;
  function goRecherche(e) {
    contenuRecherche = e.detail.txt;
    tableauRecherche = tableauCartes.filter((el) =>
      el.nom.includes(contenuRecherche)
    );
    verCon = true;
    if (contenuRecherche == "") {
      tableauRecherche = [];
      verCon = false;
    }
  }
</script>

<div class="container">
  <FormDepense on:nv-depense={ajoutDepense} on:recherche-dep={goRecherche} />
  {#if tableauCartes.length === 0}
    <h3 class="mt-3 lead font-weight-bold">Aucune depense pour le moment</h3>
  {:else if tableauRecherche.length === 0 && !verCon}
    <h2 class="my-4">
      Total des dépenses : <span class="total-price">{total} XAF</span>
    </h2>
    {#each tableauCartes as depense (depense.id)}
      <div class="card-all">
        <CarteDepense
        on:suppr-depense={supprCarte}
        on:mod-depense={modDep}
        id={depense.id}
        nom={depense.nom}
        montant={depense.montant}
      />
      </div>
    {/each}
  {:else if tableauRecherche.length === 0 && verCon}
    <h3 class="mt-3 lead font-weight-bold">
      {contenuRecherche} n'est pas dans vos depense
    </h3>
  {:else}
    {#each tableauRecherche as depense (depense.id)}
      <div class="card-filter">
        <CarteDepense
        on:suppr-depense={supprCarte}
        on:mod-depense={modDep}
        id={depense.id}
        nom={depense.nom}
        montant={depense.montant}
      />
      </div>
    {/each}
  {/if}
</div>

<style>
  .total-price {
    color: rgba(240, 33, 74, 0.814);
    font-weight: 700;
  }

  .container{
    margin-top: 32px;
  }

  .card-all {

  }

  .card-filter {
    
  }
</style>
