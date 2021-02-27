import 'core-js'
const lodashDebounce = require('lodash/debounce');
import Vue from 'vue/dist/vue.esm.browser';
import {vData} from './lib/v-data';
import {vComputed} from './lib/v-computed';
import initialization from  './lib/function/initialization';
import vMethods from './lib/v-methods';
import vWatch from './lib/v-watch';


const weatherApp = new Vue({
    el: '#weatherApp',
    data: vData,
    computed: vComputed,
    methods: vMethods,
    watch: vWatch,
    created(){
        this.debounceFindCity = lodashDebounce( this.getCityList , 1000, {leading:false, trailing:true});
    },

    mounted(){
        initialization(this);
    },
})
