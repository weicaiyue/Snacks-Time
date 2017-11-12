<template>
	<div>
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
		<div class="car-cover" v-if="carShow" @click="closeCar"></div>
		<transition name="car-open">
			<div v-if="carShow" class="carDisp">
				<template v-if='selected.length!==0'>
					<div class="car-item" v-for='item in selected'>
						<div class="image"><img :src="item.productImage"/></div>
						<div class="num"><span>{{item.quantity | formatQuantity(item.quantity)}}</span></div>
						<div class="car-item-operation">
							<a href="javascript:void 0" class="item-edit-btn" @click="deleteIt(item)">
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
	</div>
</template>
<script>
export default{
	props:{
		carShow:{
			type:Boolean,
			default:false
		},
		selected:{
			type:Array,
			default:[]
		}
	},
	data(){
		return{

		}
	},
	methods:{
		closeCar(){
			this.$emit('on-click');
		},
		deleteIt(item){
			let pid=item.productId;
			this.$emit('delete',pid)
		}
	}
}
</script>
<style scoped lang="scss">
.car-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.carDisp{
    position: fixed;
	width: 100%;height:20%;
	background-color:#FFFFE0;
	bottom:10%;z-index: 5;
	overflow: auto;
	text-align: center;
	&>p{
		padding-top:2rem;
		text-align: center;
	}
	.car-item{
		width: 94%;
		border:1px solid #e0d6c7;
		position:relative;
		background-color:#FFFFF0;
		border-radius:0.5rem;
		padding:2%;margin:1%;
		.image{
			width:20%;
			position:relative;
			left: 8%;
			img{
				max-width: 100%;height:auto;
				display: block;
			}
		}
		.num{
			position:absolute;
		    left: 50%;top:50%;
			transform:translateY(-50%);
		}
		.car-item-operation{
			position:absolute;
			left: 85%;top:50%;
			transform: translateY(-50%);
		}
	}	
}
.car-open-enter-active{
	transition:all .8s ease;
}
.car-open-leave-active{
	transition:all .8s ease;
}

.car-open-enter,.car-open-leave-to{
	transform:translateY(100%);
	opacity:1;
}
.item-edit-btn{
	display: inline-block;
    width: 1.5rem;height:1.5rem;
    .icon-del{
    	width: 100%;
    	height: 100%;
    	fill: #111;
    }
}
</style>