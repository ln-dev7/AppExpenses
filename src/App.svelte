<script>
  import Container from "./Components/Container.svelte";
  import Navbar from "./Components/Navbar.svelte";
</script>

<main class="main">
  <Navbar />
  <Container />
</main>

<style>
    .main{
        min-height: 100vh;
        background: #F8FAFC;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
</style>
