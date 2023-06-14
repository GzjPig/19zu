import axios from 'axios';
import { req,reqBody } from './axiosFun';

// 获取商品列表
export const getGoodsList = (data) => { 
    return reqBody("post", "/mall/sms-flash-promotion-product-relation/page", data) 
};

// 新增商品
export const addGoods = (data) => { 
    return reqBody("post", "/mall/sms-flash-promotion-product-relation/add", data) 
};

//修改商品
export const editGoods = (data) => { 
    return reqBody("post", "/mall/sms-flash-promotion-product-relation/edit", data) 
};


//删除商品

export const delGoods = (data) => { 
    return reqBody("get", `/mall/sms-flash-promotion-product-relation/del/${data.id}`) 
};

// 检索
export const getOne = (params) => { 
        return req("get", `/mall/sms-flash-promotion-product-relation/one/${params}` ) };
    