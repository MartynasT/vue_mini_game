import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopState: false,
    slot: 0,
    profitPerSecond: {
      gold: 0,
      wood: 0,
      stone: 0
    },
    player: {
      stats: {
        gold: 30000,
        wood: 150000,
        stone: 130000
      },
      buildings: [],
    },
    activeBuildings: [],
    shop:[
      {
        name: "tent",
        image: "https://media.istockphoto.com/vectors/blue-pixel-art-tent-icon-isolated-on-white-background-camping-shelter-vector-id1267526943",
        level: 1,
        cost: {
          gold: 10,
          wood: 5,
          stone: 4
        },
        profit: {
          gold: 0.1,
          wood: 0.1,
          stone: 0.1
        },
        requires: []
      },
      {
        name: "house",
        image: "https://img.favpng.com/23/5/13/pixel-art-video-games-architecture-png-favpng-bcctUuzq1m7j5ckb6gKWHtzRx.jpg",
        level: 1,
        cost: {
          gold: 50,
          wood: 38,
          stone: 80
        },
        profit: {
          gold: 0.2,
          wood: 0.1,
          stone: 0.2
        },
        requires: ["tent"]
      },
      {
        name: "farm",
        image: "https://pbs.twimg.com/profile_images/1082467691540078592/7EcDN6fY.png",
        level: 1,
        cost: {
          gold: 250,
          wood: 400,
          stone: 500
        },
        profit: {
          gold: 0.3,
          wood: 0.4,
          stone: 0.2
        },
        requires: ["house"]
      },
      {
        name: "church",
        image: "https://krita-artists.org/uploads/default/original/3X/f/b/fb481a5e006b2d92ac2e039ebd9ca35e28fe34b8.pn",
        level: 1,
        cost: {
          gold: 3000,
          wood: 500,
          stone: 2000
        },
        profit: {
          gold: 1,
          wood: 0,
          stone: 0
        },
        requires: ["house","farm"]
      },
      {
        name: "castle",
        image: "https://i.pinimg.com/originals/d0/af/58/d0af5809ea1a05901a50825b0b6cf564.png",
        level: 1,
        cost: {
          gold: 10000,
          wood: 2000,
          stone: 2000
        },
        profit: {
          gold: 10,
          wood: 10,
          stone: 10
        },
        requires: ["house","farm","church"]
      }
    ]
  },
  mutations: {
    buyNewBuilding(state, building){
      state.player.buildings = [...state.player.buildings, building]
      state.activeBuildings = [...state.activeBuildings, building.name]
      state.shopState = false
    },

    updateUserStats(state, data){
      state.player.stats = data
    },

    toggleModal(state,slotId){
      state.shopState = !state.shopState
      state.slot = slotId
    },

    updateProfit(state, profit){
        const {gold, wood, stone} = profit
        state.profitPerSecond.gold += gold
        state.profitPerSecond.wood += wood
        state.profitPerSecond.stone += stone
    },

    makeMaterials(state){
      state.player.stats.gold += state.profitPerSecond.gold
      state.player.stats.wood += state.profitPerSecond.wood
      state.player.stats.stone += state.profitPerSecond.stone
    },
    upgradeBuilding(state, payload){

      state.player.buildings.forEach(item=>{
        if (Number(item.id) === Number(payload.id)){
          payload.level +=1;
          return item = payload;
        }

      })
    }

  },
  actions: {
    buyNewBuilding(context, building){
      let upgradePrice = {
        gold: Number(building.level) * 5 * Number(building.cost.gold),
        wood: Number(building.level) * 5 * Number(building.cost.wood),
        stone: Number(building.level) * 5 * Number(building.cost.stone)
      }
      building.upgradePrice = upgradePrice;

      context.commit('buyNewBuilding', building)
    },

    toggleModal(context,slotId){
      context.commit('toggleModal',slotId)
    },

    updateUserStats({commit, state}, materials){
      const {gold, wood, stone} = state.player.stats;
      const stats = {
        gold: gold - materials.gold,
        wood: wood - materials.wood,
        stone: stone - materials.stone,
      }
      commit("updateUserStats", stats)
    },
    updateProfit(context, profit){
      context.commit('updateProfit', profit)
    },

    makeMaterials(context){
      context.commit('makeMaterials')
    },

    upgradeBuilding(context, payload){
      let upgradePrice = {
        gold: Number(payload.level) * 5 * Number(payload.upgradePrice.gold),
        wood: Number(payload.level) * 5 * Number(payload.upgradePrice.wood),
        stone: Number(payload.level) * 5 * Number(payload.upgradePrice.stone)
      }
      payload.upgradePrice = upgradePrice;
      context.commit('upgradeBuilding', payload)
    }
  },
  modules: {
  }
})
