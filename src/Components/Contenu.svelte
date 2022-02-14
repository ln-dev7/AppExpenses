<script>
  import CarteDepense from "./CarteDepense.svelte";
  import FormDepense from "./FormDepense.svelte";
  import { v4 as uuidv4 } from "uuid";

  let tableauCartes = [
    // {
    //   id: uuidv4(),
    //   nom: "22",
    //   montant: 6,
    // },
    // {
    //   id: uuidv4(),
    //   nom: "2",
    //   montant: 4,
    // },
  ];

  $: total = tableauCartes.reduce((acc, curr) => {
    return acc += curr.montant;
  }, 0)

  function ajoutDepense(e) {
    let nvObjb = { id: uuidv4(), nom: e.detail.nom, montant: e.detail.montant };

    if (e.detail.nom == "" || e.detail.montant == "") {
      alert("Veuillez entrer tout les champs !");
    } else {
      tableauCartes = [...tableauCartes, nvObjb];
    }
  }

  function supprCarte(e) {
      tableauCartes = tableauCartes.filter(dep => dep.id !== e.detail.id)
  }
</script>

<div class="container">
  <FormDepense on:nv-depense={ajoutDepense} />

  {#if tableauCartes.length === 0}
    <h3 class="mt-3 lead font-weight-bold">Aucune depense pour le moment</h3>
  {:else}
    <h2 class="my-4">Total des depenses : <span class="total-price">{total} XAF</span></h2>
    {#each tableauCartes as depense (depense.id)}
      <CarteDepense
        on:suppr-depense={supprCarte}
        id={depense.id}
        nom={depense.nom}
        montant={depense.montant}
      />
    {/each}
  {/if}
</div>

<style>
    .total-price{
        color: crimson;
    }
</style>
