<template>
    <div class="info">
      <h3>Info</h3>
      <h4>Buildings arr:</h4>
      <p>{{$store.state.player.buildings}}</p>
      <p>{{$store.state.slot}}</p>
    </div>
</template>

<script>
export default {
  name: 'Info',
}
</script>

<style scoped>
  .info{
    width: 350px;
    position: fixed;
    top: 10px;
    right: 10px;
    border: 2px solid #8B0020;
  }

</style>