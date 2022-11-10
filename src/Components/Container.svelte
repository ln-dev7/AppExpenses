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
      tableauCartes = tableauCartes.reverse();
      $store = [...$store, nvObjb];
      $store = $store.reverse();
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
      el.nom.toLowerCase().includes(contenuRecherche.toLowerCase())
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
  <div class="container-main">
    {#if tableauCartes.length === 0}
      <h3>Vous n'avez aucune depense pour le moment</h3>
    {:else if tableauRecherche.length === 0 && !verCon}
      <div class="container-price">
        <h2>
          Total des dépenses : <span>{total} XAF</span>
        </h2>
      </div>
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
      <h3>
        <span>{contenuRecherche}</span> n'est pas dans vos depense
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
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 0 2rem 0;
    background: #f8fafc;
  }

  .container-main {
    position: relative;
    padding: 20px;
    border-radius: 10px;
    width: 95%;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  h3 {
    font-weight: 500;
    text-align: center;
    padding: 1rem 0;
  }

  h3 span {
    color: #0ea5e9;
    font-weight: 600;
  }

  .container-price {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0.75rem;
  }

  .container-price h2 {
    font-weight: 500;
    width: fit-content;
    padding: 0.5rem 1rem;
    background: #fff;
    border: 1px solid #716bea39;
    border-top: none;
  }

  .container-price span {
    color: #f0214ad0;
    font-weight: 700;
  }

  .card-all,
  .card-filter {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
</style>
