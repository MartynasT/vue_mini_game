<template>
    <div class="items">
      <div class="stat">
        <img src="./../assets/gold.png" alt="">
        <span>{{stats.gold.toFixed(2)}}</span>
      </div>
      <div class="stat">
        <img src="./../assets/wood.png" alt="">
        <span>{{stats.wood.toFixed(2)}}</span>
      </div>
      <div class="stat">
        <img src="./../assets/stone.png" alt="">
        <span>{{stats.stone.toFixed(2)}}</span>
      </div>
    </div>

</template>

<script>
export default {
  name: 'PlayerStats',
  computed:{
    stats(){
      return this.$store.state.player.stats
    }
  }
}
</script>

<style scoped lang="scss">
  .items{
    display: flex;
    padding: 10px 50px;
    background-color: lightgray;
    justify-content: space-around;
    .stat{
      width: 250px;
      display: flex;
      align-items: center;
      img{
        width: 40px;
        margin-right:  20px;
      }
      span{
        font-size: 20px;
      }
    }
  }

</style>