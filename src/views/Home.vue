<template>
  <div class="home">
    <PlayerStats />
    <building-slots />

    <Modal  v-if="$store.state.shopState"/>
    <Info v-if="false"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PlayerStats from '@/components/PlayerStats'
import BuildingSlots from '@/components/BuildingSlots'
import Modal from '@/components/Modal'
import Info from '@/components/Info'

export default {
  name: 'Home',
  components: {
    Info,
    Modal,
    BuildingSlots,
    PlayerStats,
  },
  created () {
   setInterval(()=>{
      this.$store.dispatch('makeMaterials')
   },1000)
  }
}
</script>

<style scoped lang="scss">
  .home{
    position: relative;
    //display: flex;
  }

  .main-info{
    display: flex;
  }


</style>
