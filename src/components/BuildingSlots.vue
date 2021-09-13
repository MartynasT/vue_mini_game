<template>
  <div>
    <h2>Buildings</h2>
    <div class="slots">
      <Building
          v-for="(_building, index) in 5"
          :key="index"
          :slotId="index"
      />

    </div>
  </div>
</template>

<script>
import Building from '@/components/Building'

export default {
  name: 'BuildingSlots',
  components: { Building },
  computed:{
    playerBuildings(){
      return this.$store.state.player.buildings
    }
  }
}
</script>

<style scoped lang="scss">
.slots{
  width: 100%;
  justify-content: space-between;
  padding: 40px ;
  display: flex;
  //width: 70%;
  margin: 0 auto;

}
</style>