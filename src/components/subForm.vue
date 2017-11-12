<template>
	<div>
		<div class="overlay" v-if="isShow"></div>
		<transition name="open-modal">
			<div class="modal" v-if="isShow">
				<div class="modal-inner">
					<div class="top">
						<button class="close" @click="changFlag">关闭</button>
					</div>
					<div class="content">
						<div class="bgimg"><img src="../assets/胖子.png"></div>
						<div class="confirm-tips">
							<template v-if="roomNotKnow">
								<p>不好意思^_^</p>
								<p>只有在零食妹妹箱子投放点处扫码才能消费哦~</p>
							</template>
							<template v-else>
								<template v-if="noSelected">
									<p>您还什么都没有选哦^_^</p>
								</template>
								<template v-else>
									<p>您的零食挑选已完成，</p>
									<p>您的待付金额为：{{total | formatMoney(total)}}</p>
									<p>请扫描箱上支付宝二维码完成支付并点击确认。</p>
									<p>零食妹妹谢谢您^_^</p>
								</template>
							</template>
						</div>
						<div class="btn-wrap">
							<button class="btn" @click=" changFlag ">谢谢</button>
						</div>
					</div>
				</div>
			</div>
			
		</transition>
	</div>
</template>
<script>
export default{
	props:{
		isShow:{
			type:Boolean,
			default:false
		},
		total:{
			type:Number,
			default:0
		},
		roomNotKnow:{
			type:Boolean,
			default:false
		},
		noSelected:{
			type:Boolean,
			default:false
		}
	},
	data(){
		return{

		}
	},
	methods:{
		changFlag(){
			this.$emit('on-close')
		}
	}
}
</script>
<style scoped lang="scss">
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 16rem;
    height: auto;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    z-index: 201;
    .modal-inner{
    	background-color:#fff;
    	padding: 2rem 2rem;
    }
}
.content{
    position:relative;
}
.bgimg{
	width:100%;
	opacity:0.4;
	img{
		max-width: 100%;height:auto;
	}
}
.confirm-tips {
    width: 100%;
    background-color:transparent;
    position:absolute;
    top:10%;
}
.confirm-tips, .modal{
    text-align: center;
}
.open-modal-enter-active{
	transition: all .6s ease-out;
}
.open-modal-leave-active{
	transition: all .4s ease-out;
}
.open-modal-enter,.open-modal-leave-to{
	transform: translateY(20%);
	opacity:0;
}

.btn-wrap {
	width:100%;
    margin-top: 1rem;
    text-align: center;
    font-size: 0;
    background-color:transparent;
    .btn{
    	width: 45%;margin: 0 2.5%;
    }
}
.close {
    position: absolute;
    top: 7px;
    right: 7px;
    width: 34px;
    height: 34px;
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    text-indent: -8000px;
}
.close:before {
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
}
.close:before,.close:after {
    position: absolute;
    top: 16px;
    left: -4px;
    content: "";
    width: 44px;
    height: 3px;
    background: #605f5f;
}
.close:after {
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>