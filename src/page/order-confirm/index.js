/*
* @Author: mmall
* @Date:   2017-05-27 17:57:49
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-28 19:48:16
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm               = require('util/mm.js');
var _order            = require('service/order-service.js');
var _address          = require('service/address-service.js');
var templateProduct   = require('./product-list.string');
var templateAddress   = require('./address-list.string');
var addressModal      = require('./address-modal.js');

var page = {
    data : {

    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function() {
        var _this = this;


        //地址的选择
        $(document).on('click','.address-item',function(){
            $(this).addClass('active')
        .siblings('.address-item').removeClass('active');
            this.data.selectedAddressId =$(this).data('id');

        });

        $(document).on('click','.order-submit',function(){
            var shippingId=this.data.selectedAddressId;
            if(shippingrd){

                _order.createOrder({
                    shippingId:shippingId
                }, function(res) {
                    window.Location.href = "./payment.html?orderNumber=" + res.orderNo;
                },function(errMsg){
                        _mm.errorTips(errMsg)
                });

            }else{
                -mm.errorTips('请选择地址后再提交');
            }

        });
        //地址的添加
        $(document).on('click','.address-add',function(){

            addressModal.show({
                isUpdate: false,

                onSuccess: function(){
                    this.loadAddressList();
                }
            });
        });
        //地址的删除
        $(document).on('click','.address-delete',function(e){
            e.stopPropagation();
            var id=$(this).parents(".address-item").data("id");
            if(window.confirm('确认要删除该地址？')){
                _address.deleteAddress(id,function(res){
                    this.loadAddressList();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }


        });
        //地址的编辑
        $(document).on('click','.address-update',function(e){
            e.stopPropagation();
            var shippingId=$(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function(res){
                addressModal.show({
                    isUpdate: false,
                    data    : res,
                    onSuccess: function(){
                        this.loadAddressList();
                    }
                });
            },function(errMag){
                _mm.errorTips(errMag);
            });
            addressModal.show({
                isUpdate: false,
                onsuccess: function(){
                    this.loadAddressList();
                }
            });
        });
    },

    // 加载地址信息
    loadAddressList : function(){
        var _this       = this;
        $('.address-con').html('<div class="loading"></div>');
        // 获取地址列表
        _address.getAddressList(function(res){
            _this.addressFilter();
            var addressListHtml=_mm. renderHtml(templateAddress, res);
            $('.address-con'). html(addressListHtml);


        }, function(errMsg){
            $('.address-con'). html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })
    },
    //处理选中状态
    addressFilter :function(data){
        if(this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i = length; i++) {
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive=true;
                    selectedAddressIdFlag =true;
                }
            }
            if(! selectedAddressIdFlag){
                this.data.selectedAddressId=nul1;
            }
        }
    },
    // 加载商品信息
    loadProductList : function(){
        $('.product-con').html('<div class="loading"></div>');
        var _this = this;
        // 获取购物车列表
        _order.getProductList(function(res){

            var productListHtml=_mm. renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);


        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">商品加载失败，请刷新后重试</p>');
        })
    }


};
$(function(){
    page.init();
})
