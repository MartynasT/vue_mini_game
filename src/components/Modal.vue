<template>
  <div class="modal">
    <h2>SHOP</h2>
    <div class="shop">
      <div class="building" v-for="(item, i) in buildings" :key="i">
        <h3>{{item.name}}</h3>
        <img :src="item.image" alt="">
        <h4>Price:</h4>
        <ul>
          <li v-for="(key, value, index) in item.cost" :key="index">
            {{value}} -- {{key}}
          </li>
        </ul>
<!--        <h4>Profit:</h4>-->
<!--        <ul>-->
<!--          <li v-for="(key, value, index) in item.profit" :key="index">-->
<!--            {{value}} &#45;&#45; {{key}}-->
<!--          </li>-->
<!--        </ul>-->
        <button @click="buy(item)">Buy</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  computed: {
    buildings(){
      return this.$store.state.shop
    },
    playerMaterials(){
      return this.$store.state.player.stats
    },
    slotId(){
      return this.$store.state.slot
    },
    playerBuildings () {
      return this.$store.state.player.buildings
    },
    activeBuildings () {
      return this.$store.state.activeBuildings;
    }
  },
  methods:{
    buy(item){

      //Check if slot is EMPTY
      let slotIndex = this.playerBuildings.findIndex(x => (x.id == this.slotId));
      let checkIfOccupiedSlot = true;
      if (slotIndex === -1){
        checkIfOccupiedSlot = false
      }else{
        checkIfOccupiedSlot = true
      }




      //Check if required building exists
      let buildingRequirementMatch = false
      if (item.name === 'tent') {
          buildingRequirementMatch = true
      }else{
        buildingRequirementMatch = item.requires.every((val) => this.activeBuildings.includes(val))
        // alert(buildingRequirementMatch)

        // if (this.activeBuildings.includes(item.requires[0])){
       //   buildingRequirementMatch = check(item.requires, this.activeBuildings)
       // }else{
       //   alert('need')
       // }
      }





      const {gold, wood, stone} = item.cost

      if (checkIfOccupiedSlot) {
        alert('this slot is occupied')
      }else{
        if (buildingRequirementMatch){
          //Check Player Materials
          if (this.playerMaterials.gold >=  gold &&
              this.playerMaterials.wood >=  wood &&
              this.playerMaterials.stone >= stone ) {

            const newBuilding = JSON.parse(JSON.stringify(item));
            newBuilding.id = this.slotId;
            this.$store.dispatch('buyNewBuilding', newBuilding)
            this.$store.dispatch('updateUserStats', newBuilding.cost)
            this.$store.dispatch('updateProfit', newBuilding.profit)
          }else {
            alert('NOT ENOUGH MATERIALS')
          }

        }
      }




      //
      // if (checkIfOccupiedSlot) {
      //   alert('this slot is occupied')
      // }else{
      //   const {gold, wood, stone} = item.cost
      //   item.id = this.slotId;
      //   const newBuilding = JSON.parse(JSON.stringify(item));
      //   let playerStatsRaw = this.playerMaterials;
      //
      //   let required = true;
      //   if (item.name !== 'tent'){
      //     let index= this.playerBuildings.findIndex(x => (x.name === item.requires[0]));
      //     console.log(index)
      //     if (index === -1){
      //       required = false
      //     }
      //   }
      //   console.log(required)
      //
      //   if (this.playerMaterials.gold >=  gold &&
      //       this.playerMaterials.wood >=  wood &&
      //       this.playerMaterials.stone >= stone && required) {
      //     console.log('GOOD')
      //
      //     const data = {
      //       building: newBuilding,
      //       stats: {
      //         gold: playerStatsRaw.gold - gold,
      //         wood: playerStatsRaw.wood - wood,
      //         stone: playerStatsRaw.stone - stone,
      //       }
      //     }
      //
      //     this.$store.dispatch('buyNewBuilding', data)
      //   }else {
      //     alert('NOT ENOUGH MATERIALS')
      //   }
      // }

    }
  }
}
</script>

<style scoped lang="scss">

.modal{
  padding: 20px;
  border: 2px solid #141A14;
  border-radius: 20px;
}

.shop{
  display: flex;
}
.building{
  width: 200px;
  margin: 20px;
  img {
    display: block;
    width: 80%;
    margin: 0 auto;
  }
}

</style>