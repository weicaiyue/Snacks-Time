<template>
  <div id="app">
    <div class="nav"><img src="./assets/logo.png"></div>
    <div id="snacks">
      <div class="snacks-item" v-for="(item,index) in productList">
        <img v-bind:src="item.productImage"/> 
        <div class="discription">{{item.productName}}</div>
        <div><span class="price">{{item.price|formatMoney(item.price)}}</span><span class="discounts">{{item.discounts|formatMoney(item.discounts)}}</span></div>
        <div class="toolbar">
          <div class="tool">
            <div class="sym"><span @click="changeNum(item,-1)"><img src="../static/减号.png"></span></div>
            <input type="number" v-model="item.quantity" disabled/>
            <div class="sym"><span @click="changeNum(item,1)"><img src="../static/加号.png"></span></div>
          </div>
        </div>
        </div>
    </div>
    <div class="fill"></div>
    <!--购物车与动画效果-->
    <cart :selected="selectProduct" :car-show='isDisplay' @on-click=" isDisplay= false " @delete='deleteProduct'></cart>
    <!--底部：购物车按钮和提交-->
    <div id ="foot" :class="{'carappear':isDisplay}">
      <div id="car-btn" v-on:click='isDisplay=!isDisplay'><img src="./assets/空购物车.png"><span class="calcu">{{total | formatMoney(total)}}</span></div>
      <div class="sub-btn">
        <img src="./assets/提交.png" @click="subFlag=!subFlag">
      </div>
    </div>
    <!--弹窗和遮罩-->
    <sub-form :is-show='subFlag' :total="total" 
    @on-close=' subFlag=false ' 
    :room-not-know="room==='unknown'" 
    :no-selected="selectProduct.length===0"></sub-form>
  </div>
</template>

<script>
import api from './public/api'
import axios from 'axios'
import subForm from './components/subForm.vue'
import cart from './components/cart.vue'
import data from './data.json'

export default{
  components:{
    subForm,
    cart
  },
  name:'app',
  data(){
    return{
      total:0,
      isDisplay:false,
      subFlag:false,
      room:'',
      productList:[],
      selectProduct:[]
    }
   
  },
  mounted:function(){
    this.$nextTick(()=>{
      this.getString();
      this.getData();
    });
  },
  methods:{
    getString(){
      var url=location.search;
      if (url.indexOf("?")!== -1) {
        var str=url.substr(1);
        var strs=str.split("=");
        this.room=strs[1];
      }else{
        this.room='unknown';
      }
    },
    getData(){
      axios.get(api.getData
      ).then(res=>{
        this.productList=res.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    changeNum(product,way){
      if (way>0) {
        product.quantity++;

      }else {
        product.quantity--;
        if (product.quantity<1) {
          product.quantity=0;
        }
      }
    },
    deleteProduct(data){
      this.productList.forEach(item=>{
        if (item.productId===data) {
          item.quantity=0;
        }
      })
    },
    formatTime(){
      var myDate=new Date();
      var month=String(myDate.getMonth()+1);
      var theDate=String(myDate.getFullYear())+month+String(myDate.getDate())+String(myDate.getHours())+String(myDate.getMinutes())+String(myDate.getSeconds());
      return theDate;
    },
    formatData(){
      var data={};
      var order = this.formatTime();
      var p_info='info:';
      data.room=this.room;
      data.order=order;
      this.selectProduct.forEach(item=>{
          p_info+=item.productName+'x'+item.quantity;
      });
      data.p_info=p_info;
      data.total=this.total;
      return data;
    },
    sendData(){
      axios.post(api.addData,this.formatData())
      .then(res=>{
        console.log("success");
      }).catch(err=>{
        console.log(err);
      });
      this.subFlag=false;
      this.productList.forEach(item=>{
        item.quantity=0;
      })
    }
  },
  watch:{
    productList:{
      handler:function(val,oldVal){
        this.total=0;
        this.selectProduct=[];
        val.forEach(product=>{
          this.total+=product.discounts*product.quantity;
          if (product.quantity!==0) {
            this.selectProduct.push(product)
          }
        })
      },
      deep:true
    }
  }
}
</script>
<style lang="scss">
  @import "./public/style.scss";
</style>