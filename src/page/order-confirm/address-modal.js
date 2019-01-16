/**
 * Created by lenovo on 2019-01-04.
 */
'use strict';
var _mm                    = require('util/mm.js');
var _address               = require('service/address-service.js');
var _cities                = require('util/cities/index.js');
var templateAddressModal   = require('./address-modal.string');

var addressModal = {
    show:function(option) {
        this.option=option;
        this.option.data =option.data || {};
        this.$modalWrap=$('.modal-wrap');
        //��Ⱦҳ��
        this.loadModal();
        //���¼�
        this.bindEvent();
    },
    bindEvent :function(){

        var _this=this;
        //ʡ�ݺͳ��еĶ�������
        this.$modalWrap.find('#receiver-province').change(function() {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });

        //ʡ�ݺͳ��еĶ�������
        this.$modalWrap.find('.address-btn').click(function() {
            var receiverInfo=_this. getReceiverInfo(),
                isUpdate =_this.option.isUpdate;
            //ʹ���µ�ַ������֤ͨ��
            if(! isUpdate &&receiverInfo.status) {
                //�����ռ��ˣ�������֤ͨ��
                _address.save(receiverInfo.data,function(res){
                    _mm.successTips('��ַ��ӳɹ�');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                    &&_this.option.onSuccess(res);

                },function(errMsg){
                    _mm.errorTips(errMsg);
                });

            }else if(isUpdate &&receiverInfo.status) {
                // ��֤��ͨ��
                _address.update(receiverInfo.data,function(res){
                    _mm.successTips('��ַ�޸ĳɹ�');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                    &&_this.option.onSuccess(res);

                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                -mm.errorTips(receiverInfo.errMsg ||'�������ﲻ����~');
                
            }
        });
        //
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();
        });
        //�����Ż����ɰ����򣬹رյ���
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        });

    },
    loadModal:function(){
        var addressModalHtml=_mm.renderHtml(templateAddressModal,{
            isUpdate : this.option.isUpdate,
            data     : this.option.data
        });

        this.$modalWrap.html(addressModalHtml);
        //����ʡ��
        this.loadProvince();

    },

    //����ʡ����Ϣ
    loadProvince:function(){
        var provinces=_cities.getProvinces() || [],
            $provinceSelect=this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        //����ʡ��
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities:function(provinceName){
        var cities=_cities.getCities(provinceName) || [],
            $citySelect=this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        //����ʡ��
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);

        }
    },
    getReceiverInfo : function(){
      var   receiverInfo={};
        result={
            status: false
        };
        receiverInfo.receiverName=$.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince=this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity=this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress=$.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone=$.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip=$.trim(this.$modalWrap.find('#receiver-zip').val());

        if(this.option.isUpdate){
            receiverInfo.Id=this.$modalWrap.find('#receiver-id').val();
        }

        if(receiverInfo.receiverName) {
            result.errMsg = '�������ռ�������';
        }else if(!receiverInfo.receiverProvince)
        {
            result.errMsg ='��ѡ���ռ�������ʡ��';
        }else if(!receiverInfo.receiverCity)
        {
            result.errMsg = '��ѡ���ռ������ڳ���';
        }else if(!receiverInfo.receiverAddress) {
            result.errMsg ='�������ռ�����ϸ��ַ';
        }else if(!receiverInfo.receiverPhone){
            result.errMsg='�������ռ����ֻ���';
        }
        //������֤��ͨ��
        else{
            result.status =true;
            result.data =receiverInfo;
        }
        return result;
    },
    //��ȡselect���ѡ����룺array�����HTML
    getSelectOption : function(optionArray){
    var html='<option value="">��ѡ��</option>';
        for(var i= 0, length=optionArray.length; i<length; i++){
            html += '<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>';
        }
        return html;
    },
    hide:function(){
        this.$modalWrap.empty();

    }
};
module.exports=addressModal;

