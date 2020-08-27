import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
const store = new Vuex.Store({
        state:{
            count: 0,
            homeButtonCounter:0
        },
        mutations:{
            increment(state){
                state.count++;
            },
            increaseHomeButton(state){
                state.homeButtonCounter++;
            }
        }
});

export default store;
