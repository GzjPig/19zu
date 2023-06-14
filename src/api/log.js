import axios from 'axios';
import { req,reqBody } from './axiosFun';

// 获取列表
export const getList = (data) => { 
    return reqBody("post", "/mall/sms-flash-promotion-log/page", data) 
};

// 新增
export const add = (data) => { 
    return reqBody("post", "/mall/sms-flash-promotion-log/add", data) 
};

//修改
export const edit = (data) => { 
    return reqBody("post", "/mall/sms-flash-promotion-log/edit", data) 
};


//删除
export const del = (data) => { 
    return reqBody("get", `/mall/sms-flash-promotion-log/del/${data.id}`) 
};

// 检索
export const getOne = (params) => { 
        return req("get", `/mall/sms-flash-promotion-log/one/${params}` ) };

export const getOneByPrId = (params) => { 
            return req("get", `/mall/sms-flash-promotion-log/getSubscribeProduct${params}` ) };
    