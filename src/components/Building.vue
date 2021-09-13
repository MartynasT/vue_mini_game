<template>
  <div class="building-slot">
    <div class="building">
      <h2 class="slot-title">{{buildingForSlot ? buildingForSlot.name : 'Free Slot'}}</h2>
      <h2 v-if="buildingForSlot" >LVL: {{buildingForSlot.level}}</h2>
      <img :src="buildingForSlot ? buildingForSlot.image : ''" alt="">
    </div>
    <div class="actions">
      <button @click="toggleModal(slotId)">Build</button>
      <button @click="upgradeBuilding">Upgrade </button>
      <div v-if="buildingForSlot">
        <h3>Upgrade price</h3>
        <ul>
          <li>GOLD: {{buildingForSlot.upgradePrice.gold}}</li>
          <li>WOOD: {{buildingForSlot.upgradePrice.wood}}</li>
          <li>Stone: {{buildingForSlot.upgradePrice.stone}}</li>
        </ul>
      </div>
    </div>
<!--    {{buildingForSlot}}-->

  </div>
</template>

<script>
export default {
  name: 'Building',
  props: ['slotId'],
  computed: {
    buildingForSlot(){
      const buildings = this.$store.state.player.buildings;
      return buildings.find(building => building.id == this.slotId);
    },
    playerMaterials(){
      return this.$store.state.player.stats
    },
  },
  methods:{
    toggleModal(slotId){
      this.$store.dispatch('toggleModal',slotId)
    },
    upgradeBuilding(){
      const {gold, wood, stone} = this.buildingForSlot.upgradePrice;

      if (this.playerMaterials.gold >=  gold &&
          this.playerMaterials.wood >=  wood &&
          this.playerMaterials.stone >= stone ) {

        this.$store.dispatch('updateUserStats', this.buildingForSlot.upgradePrice)
        this.$store.dispatch('updateProfit', this.buildingForSlot.profit)
        this.$store.dispatch('upgradeBuilding', this.buildingForSlot)

      }
    }
  },

}
</script>

<style scoped lang="scss">

  .building-slot{
    border: 2px solid #141A14;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    //width: 23%;
    flex: 1;
  }

  .slot-title{
    color: #575656;
  }
  
  button{
    display: block;
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
  }

  img{
    width: 80%;
    display: block;
  }

</style>