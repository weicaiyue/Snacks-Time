<template>
  <div id="app">
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-del" viewBox="0 0 26 32">
          <title>delete</title>
            <path class="path1"
                          d="M17.723 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM7.877 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM12.8 28c0.543 0 0.985-0.448 0.985-1v-12c0-0.552-0.441-1-0.985-1s-0.984 0.448-0.984 1v12c0 0.552 0.441 1 0.984 1v0zM23.631 4h-5.908v-2c0-1.104-0.882-2-1.969-2h-5.908c-1.087 0-1.969 0.896-1.969 2v2h-5.908c-1.087 0-1.969 0.896-1.969 2v2c0 1.104 0.882 2 1.969 2v18c0 2.208 1.765 4 3.939 4h13.784c2.174 0 3.938-1.792 3.938-4v-18c1.087 0 1.969-0.896 1.969-2v-2c0-1.104-0.882-2-1.969-2v0zM9.846 3c0-0.552 0.441-1 0.984-1h3.938c0.544 0 0.985 0.448 0.985 1v1h-5.908v-1zM21.662 28c0 1.104-0.882 2-1.969 2h-13.784c-1.087 0-1.97-0.896-1.97-2v-18h17.723v18zM22.646 8h-19.692c-0.543 0-0.985-0.448-0.985-1s0.441-1 0.985-1h19.692c0.543 0 0.984 0.448 0.984 1s-0.441 1-0.984 1v0z"></path>
        </symbol>
      </defs>
    </svg>
    <div class="nav"><img src="../static/logo.png"></div>
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
    <transition name="car-open">
      <div class="carDisp" v-if="isDisplay">
        <template v-if="selectProduct.length!==0">
           <div class="car-item" v-for="item in selectProduct">
            <div class="image"><img :src="item.productImage"/></div>
            <div class="num"><span>{{item.quantity | formatQuantity(item.quantity)}}</span></div>
            <div class="car-item-operation">
              <a href="javascript:void 0" class="item-edit-btn" @click="deleteProduct(item)">
                <svg class="icon icon-del">
                  <use xlink:href="#icon-del"></use>
                 </svg>
              </a>
            </div>
          </div>
        </template>
        <template v-else>
          <p>您的购物车里面什么都没有哦^_^</p>
        </template>
      </div>
    </transition>
    <!--底部：购物车按钮和提交-->
    <div id ="foot" :class="{'carappear':isDisplay}">
      <div id="car-btn" v-on:click='isDisplay=!isDisplay'><img src="../static/空购物车.png"><span class="calcu">{{total | formatMoney(total)}}</span></div>
      <div class="sub-btn">
        <img src="../static/提交.png" @click="subFlag=!subFlag">
      </div>
    </div>
    <!--弹窗和遮罩-->
    <transition name="open-modal">
      <div class="modal" v-if="subFlag">
        <div class="modal-inner">
          <div class="top">
            <button class="close" @click="subFlag = false">关闭</button>
          </div>
          <template v-if='room==="unknown"'>
          <div class="content">
            <div class="bgimg"><img src="../static/胖子.png"></div>
            <div class="confirm-tips">
              <p>不好意思^_^</p>
              <p>只有在零食妹妹箱子投放点处扫码才能消费哦~</p>
            </div>
            <div class="btn-wrap">
              <button class="btn" @click=" subFlag=false ">谢谢</button>
            </div>
          </div>
        </template>
        <template v-else>
          <template v-if="total===0">
            <div class="content">
              <div class="bgimg"><img src="../static/胖子.png"></div>
              <div class="confirm-tips">
                <p>您还什么都没有选哦^_^</p>
              </div>
              <div class="btn-wrap">
                <button class="btn" @click=" subFlag=false ">返回</button>
              </div>  
            </div>
          </template>
          <template v-else>
            <div class="content">
              <div class="bgimg"><img src="../static/胖子.png"></div>
              <div class="confirm-tips">
                <p>您的零食挑选已完成，</p>
                <p>您的待付金额为：{{total | formatMoney(total)}}</p>
                <p>请扫描箱上支付宝二维码完成支付并点击确认。</p>
                <p>零食妹妹谢谢您^_^</p>   
              </div>
              <div class="btn-wrap">
                <button class="btn btn-red" @click=" sendData() ">确认</button>
                <button class="btn" @click=" subFlag=false ">取消</button>
              </div> 
            </div>
          </template>
        </template>
        </div>
      </div>
    </transition>
    <div class="overlay" v-if="subFlag"></div>
  </div>
</template>

<script>
import api from './public/api'
import axios from 'axios'

export default{
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
  filters:{
    formatMoney:function(value){
      return '￥' +value.toFixed(2);
    },
    formatQuantity:function(num){
      return 'X'+num;
    }
  },
  mounted:function(){
    this.$nextTick(()=>{
      this.getString();
      this.getData();
    });
  },
  methods:{
    getString:function(){
      var url=location.search;
      if (url.indexOf("?")!== -1) {
        var str=url.substr(1);
        var strs=str.split("=");
        this.room=strs[1];
      }else{
        this.room='unknown';
      }
    },
    getData:function(){
      axios.get('/api/getData'
      ).then(res=>{
        this.productList=res.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    changeNum:function(product,way){
      if (way>0) {
        product.quantity++;

      }else {
        product.quantity--;
        if (product.quantity<1) {
          product.quantity=0;
        }
      }
    },
    deleteProduct:function(product){
      this.productList.forEach(item=>{
        if (item.productId===product.productId) {
          item.quantity=0;
        }
      })
    },
    formatTime:function(){
      var myDate=new Date();
      var month=String(myDate.getMonth()+1);
      var theDate=String(myDate.getFullYear())+month+String(myDate.getDate())+String(myDate.getHours())+String(myDate.getMinutes())+String(myDate.getSeconds());
      return theDate;
    },
    formatData:function(){
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
    sendData:function(){
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