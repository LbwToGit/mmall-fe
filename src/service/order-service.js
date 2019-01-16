/**
 * Created by lenovo on 2019-01-03.
 */
'use strict';
var _mm = require('util/mm.js');

var _order = {
    // ��ȡ��Ʒ�б�
    getProductList : function( resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },

    createOrder : function(orderInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : orderInfo,
            success : resolve,
            error   : reject
        });
    },



    //��ȡ�����б�
    getOrderList : function(listParam, resolve, reject){
        _mm.request({
            url      : _mm.getServerUrl('/order/list.do'),
            data     : listParam,
            success   : resolve,
            error     : reject
        });
    },
    //��ȡ��������
    getOrderDetail :function(orderNumber, resolve, reject){
        _mm.request({
            url      : _mm.getServerUrl('/order/detail.do'),
            data     : {
                orderNo : orderNumber
            },
            success   : resolve,
            error     : reject
        });
    },
    //ȡ������
    cancelOrder : function(orderNumber, resolve, reject){
        _mm.request({
            url      : _mm.getServerUrl('/order/cancel.do'),
            data     : {
                orderNo : orderNumber
            },
            success   : resolve,
            error     : reject
        });
    }


}
module.exports = _order;
