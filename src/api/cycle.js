import axios from 'axios';
import { req,reqBody } from './axiosFun';

// 获取列表
export const getList = (data) => { 
    return reqBody("post", "/mall/sms-flash-promotion-session/page", data) 
};

// 新增
export const add = (data) => { 
    return reqBody("post", "/mall/sms-flash-promotion-session/add", data) 
};

//修改
export const edit = (data) => { 
    return reqBody("post", "/mall/sms-flash-promotion-session/edit", data) 
};


//删除
export const del = (data) => { 
    return reqBody("get", `/mall/sms-flash-promotion-session/del/${data.id}`) 
};

// 检索
export const getOne = (params) => { 
        return req("get", `/mall/sms-flash-promotion-session/one/${params}` ) };

    