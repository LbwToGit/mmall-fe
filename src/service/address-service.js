/**
 * Created by lenovo on 2019-01-03.
 */
'use strict';
var _mm = require('util/mm.js');

var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    save : function(addressInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    :addressInfo,
            success : resolve,
            error   : reject
        });
    },
    getAddress : function(shippingId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    :{
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    update : function(addressInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    :addressInfo,
            success : resolve,
            error   : reject
        });
    },
    deleteAddress : function(shippingId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    :{
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    }
}


module.exports = _address;
