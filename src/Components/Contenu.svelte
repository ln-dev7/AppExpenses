<script>
  import CarteDepense from "./CarteDepense.svelte";
  import FormDepense from "./FormDepense.svelte";
  import { v4 as uuidv4 } from "uuid";
  //import storeData from "./../Store/depenses";
  import {tableauStock} from "../Store/store"
  import {store} from "../Store/store"

  let tableauCartes = [
    // {
    //   id: uuidv4(),
    //   nom: "a",
    //   montant: 1,
    // },
    // {
    //   id: uuidv4(),
    //   nom: "b",
    //   montant: 2,
    // },
  ];

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

  if ($store.length != 0){
    let tableauCartesClone = $store;
    tableauCartes = tableauCartesClone.splice(1, tableauCartesClone.length);
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
      Total des depenses : <span class="total-price">{total} XAF</span>
    </h2>
    {#each tableauCartes as depense (depense.id)}
      <CarteDepense
        on:suppr-depense={supprCarte}
        on:mod-depense={modDep}
        id={depense.id}
        nom={depense.nom}
        montant={depense.montant}
      />
    {/each}
  {:else if tableauRecherche.length === 0 && verCon}
    <h3 class="mt-3 lead font-weight-bold">
      {contenuRecherche} n'est pas dans vos depense
    </h3>
  {:else}
    {#each tableauRecherche as depense (depense.id)}
      <CarteDepense
        on:suppr-depense={supprCarte}
        on:mod-depense={modDep}
        id={depense.id}
        nom={depense.nom}
        montant={depense.montant}
      />
    {/each}
  {/if}
</div>

<style>
  .total-price {
    color: crimson;
  }
</style>
