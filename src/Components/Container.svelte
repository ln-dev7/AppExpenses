<script>
  import CarteDepense from "./CarteDepense.svelte";
  import FormDepense from "./FormDepense.svelte";
  import { v4 as uuidv4 } from "uuid";
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
        el.description = e.detail.description;
        el.date = e.detail.date;
      }
    });

    store.set(tableauCartes);

    total = tableauCartes.reduce((acc, curr) => {
      return (acc += curr.montant);
    }, 0);
  }

  function ajoutDepense(e) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "-" + mm + "-" + yyyy;

    let nvObjb = {
      id: uuidv4(),
      nom: e.detail.nom,
      montant: e.detail.montant,
      description: e.detail.description,
      date: `Crée le  ${formattedToday}`,
    };

    if (
      e.detail.nom == "" ||
      e.detail.montant == "" ||
      e.detail.description == ""
    ) {
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
    <div class="card-all">
      {#each tableauCartes as depense (depense.id)}
        <CarteDepense
          on:suppr-depense={supprCarte}
          on:mod-depense={modDep}
          id={depense.id}
          nom={depense.nom}
          montant={depense.montant}
          description={depense.description}
          date={depense.date}
        />
      {/each}
    </div>
  {:else if tableauRecherche.length === 0 && verCon}
    <h3 class="mt-3 lead font-weight-bold">
      {contenuRecherche} n'est pas dans vos depense
    </h3>
  {:else}
    <div class="card-filter">
      {#each tableauRecherche as depense (depense.id)}
        <CarteDepense
          on:suppr-depense={supprCarte}
          on:mod-depense={modDep}
          id={depense.id}
          nom={depense.nom}
          montant={depense.montant}
          description={depense.description}
          date={depense.date}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .total-price {
    color: rgba(240, 33, 74, 0.814);
    font-weight: 700;
  }

  .container {
    margin-top: 2rem;
  }

  .card-all {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }

  @media screen and (max-width: 768px) {
    .card-all {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .card-filter {
  }
</style>
