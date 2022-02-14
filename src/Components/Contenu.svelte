<script>
  import CarteDepense from "./CarteDepense.svelte";
  import FormDepense from "./FormDepense.svelte";
  import { v4 as uuidv4 } from "uuid";

  let tableauCartes = [
    {
      id: uuidv4(),
      nom: "MacBook",
      montant: 500000,
    },
    {
      id: uuidv4(),
      nom: "Ecran",
      montant: 95000,
    },
    {
      id: uuidv4(),
      nom: "Chaise",
      montant: 110000,
    },
  ];
</script>

<div class="container">
  <FormDepense />
  <h2 class="my-4">Total des depenses :</h2>

  {#each tableauCartes as depense (depense.id)}
    <CarteDepense nom={depense.nom} montant={depense.montant} />
  {/each}
</div>
