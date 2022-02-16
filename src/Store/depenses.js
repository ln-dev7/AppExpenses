import {writable} from 'svelte/store';

const tableauStock = writable([
    {
        id: 'll',
        nom: 90,
        montant: 88
    },
]);

export default tableauStock;