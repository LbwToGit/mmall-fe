/*
* @Author: Rosen
* @Date:   2017-05-27 18:26:52
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-29 16:54:03
*/

'use strict';

var _mm= require('util/mm.js');

var _payment ={
    //获取支付信息
    getPaymentInfo :function (orderNumber,resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data    : {
                orderNo :orderNumber
            },
            success :resolve,
            error    :reject
        });
    },
    //获取订单状态
    getPaymentStatus :function (orderNumber,resolve,reject) {
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo :orderNumber
            },
            success :resolve,
            error    :reject
        });
    },
}



module.exports = _product;