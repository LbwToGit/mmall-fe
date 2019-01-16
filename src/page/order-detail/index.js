/*
 * @Author: Rosen
 * @Date:   2017-05-23 19:33:33
 * @Last Modified by:   Rosen
 * @Last Modified time: 2017-05-23 22:30:31
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide          = require('page/common/nav-side/index.js');
var _mm              = require('util/mm.js');
var _order           = require('service/order-service.js');
var templateIndex   = require('./index.string');

// page �߼�����
var page = {
    data:{
       orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // ��ʼ�����˵�
        navSide.init({
            name: 'order-list'
        });
        //����detail����
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','order-cancel',function(){
            if(window.confirm('ȷ��Ҫȡ���ö�����')){
                _order.cancelOrder(_this.data.orderNumber,function(res){
                    _mm.successTips('�ö���ȡ���ɹ�');
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
        });
    },
    //���ض����б�
    loadDetail: function(){
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            _this.dataFilter(res);
            orderDetailHtml = _mm.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function(errMsg){
            $content.html('<p class="err-tip">'+errMsg+'</p>');
        });
    },
    //���ݵ�����
    dataFilter : function(data){
        data.needPay == data.status == 10;
        data.isCancelable == data.status == 10;
    }
};
$(function(){
    page.init();
});