//服务器地址
var url = '' 
//腾讯云对象存储鉴权地址
var cosSignatureUrl = '';
//腾讯云对象存储的区域：华东地区为sh
var cosRegion = '';
//腾讯云对象存储cos的APPID
var cosAPPID = '12XXXXXXXX';
//腾讯云COSSecretId
var cosSecretId = '';
//腾讯云COSSecretKey
var cosSecretKey = '';
//bucket
var cosBucketName = '';
//dir路径
var cosDirName = '';

module.exports = {
    url: url,
    cosSignatureUrl: cosSignatureUrl,
    cosRegion: cosRegion,
    cosAPPID: cosAPPID,
    cosBucketName: cosBucketName,
    cosDirName: cosDirName
}