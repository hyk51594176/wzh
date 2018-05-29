import * as types from './types'
import ajax from './ajax'
import {
  baseUrl,
  upDateUrl
} from '@/config'
//  GET 1.验证用户是否已被注册
export const userCheck = (data, showMsg) => ajax({
  url: baseUrl + types.USER_CHECK + '/' + data.phone,
  data,
  showMsg
})
//  GET 2.发送验证短信
export const commonSms = (data, showMsg) => ajax({
  url: baseUrl + types.COMMON_SMS,
  data,
  showMsg
})

//  GET 3发送验证短信
export const commonSmsGetCode = (data, showMsg) => ajax({
  url: baseUrl + types.COMMON_SMS_GETCODE,
  data,
  showMsg
})

//  GET 4用户注册成功，短信提醒接口

export const commonSmsSendSucess = (data, showMsg) => ajax({
  url: baseUrl + types.COMMON_SMS_SENDSUCESS,
  data,
  showMsg
})

//  GET 5用户提交注册

export const user = (data, showMsg) => ajax({
  url: baseUrl + types.USER,
  data,
  showMsg
})
//  GET 6用户登录
export const userLogin = (data, showMsg) => ajax({
  url: baseUrl + types.USER_LOGIN,
  data,
  showMsg
})
//  GET 7.用户修改pushiid
export const userInfoUpdatePush = (data, showMsg) => ajax({
  url: baseUrl + types.USER_INFO_UPDATEPUSH,
  data,
  showMsg
})
//  GET 8获取用户信息 (增加了用户登录日志的存储。修改tb_user的lastlogintime 以及 log_login插入日志 )
export const userInfo = (data, showMsg) => ajax({
  url: baseUrl + types.USER_INFO,
  data,
  showMsg
})
//  GET 9修改用户信息
export const userInfoEdit = (data, showMsg) => ajax({
  url: baseUrl + types.USER_INFO_EDIT,
  data,
  showMsg
})
//  POST 10头像上传
export const userInfoUpdateImage = (data, showMsg) => ajax({
  url: baseUrl + types.USER_INFO_UPDATEIMAGE,
  data,
  showMsg,
  method: 'post',
  config: {
    'Content-Type': 'multipart/form-data'

  }
})
//  GET 11用户修改密码
export const userPasswordUpdate = (data, showMsg) => ajax({
  url: baseUrl + types.USER_PASSWORD_UPDATE,
  data,
  showMsg
})
//  GET 12 用户密码找回
export const userPasswordRetrieval = (data, showMsg) => ajax({
  url: baseUrl + types.USER_PASSWORD_RETRIEVAL,
  data,
  showMsg
})
// GET 13用户修改手机号
export const userInfoEditPhone = (data, showMsg) => ajax({
  url: baseUrl + types.USER_INFO_EDITPHONE,
  data,
  showMsg
})
//  GET 14 绑定卡
export const cardUesr = (data, showMsg) => ajax({
  url: baseUrl + types.CARD_USER,
  data,
  showMsg
})
//  GET 15根据type查询内容列表
export const content = (data, showMsg) => ajax({
  url: baseUrl + types.CONTENT,
  data,
  showMsg
})
//  GET 16根据type查询内容详情列表
export const contentInfo = (data, showMsg) => ajax({
  url: baseUrl + types.CONTENT_INFO,
  data,
  showMsg
})
//  GET 根据内容ID 查询内容详情列表
export const contentInfoId = (data, showMsg) => ajax({
  url: baseUrl + types.CONTENT_INFO_ID,
  data,
  showMsg
})
//  GET  用户退出登录
export const userSignOut = (data, showMsg) => ajax({
  url: baseUrl + types.USER_SIGNOUT,
  data,
  showMsg
})
//  GET  获取消息列表
export const messageUserMessage = (data, showMsg) => ajax({
  url: baseUrl + types.MESSAGE_USERMESSAGE,
  data,
  showMsg
})
//  GET 卡片信息查询接口
export const payInfoCardInfo = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_CARDINFO,
  data,
  showMsg
})
//  GET 卡片消费记录查询接口(包含金额和积分两种)
export const payInfoConsumeInfo = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_CONSUMEINFO,
  data,
  showMsg
})
//  GET 卡片金额消费记录查询接口
export const payInfoMoneyConsumeInfo = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_MONEYCONSUMEINFO,
  data,
  showMsg
})
//  GET 卡片积分消费记录查询接口
export const payInfoPointSconsumeInfo = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_POINTSCONSUMEINFO,
  data,
  showMsg
})
//  GET 卡片积分支付接口
export const payInfoPayPoints = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_PAYPOINTS,
  data,
  showMsg
})
//  GET 卡片金额支付接口
export const payInfoPayMoney = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_PAYMONEY,
  data,
  showMsg
})
//  GET 金额充值接口
export const payInfoAddMoney = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_ADDMONEY,
  data,
  showMsg
})
//  GET 金额充值送积分接口
export const payInfoAddMoneyByPoint = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_ADDMONEYBYPOINT,
  data,
  showMsg
})
//  GET 积分充值接口
export const payInfoAddPoints = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_ADDPOINTS,
  data,
  showMsg
})
//  GET 积分充值记录查询接口
export const payInfoPointRecordInfo = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_POINTSRECORDINFO,
  data,
  showMsg
})
//  GET 金额充值记录查询接口
export const payInfoMoneyRecordInfo = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_MONEYRECORDINFO,
  data,
  showMsg
})
//  GET 充值记录查询接口（包括金额和积分）
export const payInfoRecordInfo = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_RECORDINFO,
  data,
  showMsg
})
//  GET 卡片绑定关系查询接口
export const payInfoBingDingInfo = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_BINGDINGINFO,
  data,
  showMsg
})
//  GET 卡片绑定接口
export const payInfoBingDingCard = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_BINGDINGCARD,
  data,
  showMsg
})
//  GET 单卡产品绑定
export const payInfoBindProduct = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_BINDPRODUCT,
  data,
  showMsg
})
//  GET 卡密码修改
export const payInfoChangPassword = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_CHANGPASSWORD,
  data,
  showMsg
})
//  GET 卡片激活接口
export const payInfoActivateCard = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_INFO_ACTIVATECARD,
  data,
  showMsg
})
//  GET 获取二维码或者条形码接口:
export const qrCodeGetCodeImg = (data, showMsg) => ajax({
  url: baseUrl + types.QRCODE_GETCODEIMG,
  data,
  showMsg
})
//  GET 添加反馈意见接口
export const feedBackAdd = (data, showMsg) => ajax({
  url: baseUrl + types.FEEDBACK_ADD,
  data,
  showMsg
})
//  GET 验证支付状态
export const payAlipayGetPayStatus = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_ALIPAY_GETPAYSTATUS,
  data,
  showMsg
})
//  GET 获取支付地址信息(修改接口名)
export const payAlipayGetPayPayURL = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_ALIPAY_GETPAYURL,
  data,
  showMsg
})
//  GET 支付宝充值回调接口
export const payAlipayGetAliURL = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_ALIPAY_GETALIURL,
  data,
  showMsg
})
//  GET  快捷支付支付充值接口（目前仅仅是更改了插入和更新数据的表，没有对后台自动进行金额充值及积分赠送）
export const payAlipayGetQuickPay = (data, showMsg) => ajax({
  url: baseUrl + types.PAY_ALIPAY_GETQUICKPAY,
  data,
  showMsg
})
//  GET  获取color
export const colorGetcolors = (data, showMsg) => ajax({
  url: baseUrl + types.COLOR_GETCOLORS,
  data,
  showMsg
})
//  GET  获取素材列表接口
export const materialGetShopMaterial = (data, showMsg) => ajax({
  url: baseUrl + types.MATERIAL_GETSHOPMATERIAL,
  data,
  showMsg
})
//  GET 根据id获取详情
export const materialGetMaterialDatail = (data, showMsg) => ajax({
  url: baseUrl + types.MATERIAL_GETMATERIALDETAIL,
  data,
  showMsg
})
//  GET  获取APP版本接口
export const commonAppGetVersion = (data, showMsg) => ajax({
  url: baseUrl + types.COMMON_APP_GETVERSION,
  data,
  showMsg
})
//  GET 商家优惠券列表信息
export const couponGetcouponList = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_GETCOUPONLIST,
  data,
  showMsg
})
//  GET 优惠券会员注册
export const couponMemregister = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_MEMREGISTER,
  data,
  showMsg
})
//  GET .商家优惠券详细信息
export const couponGetcouponDetail = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_GETCOUPONDETAIL,
  data,
  showMsg
})
//  GET .会员优惠券列表信息--------------------------
export const conponGetMemcouponList = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_GETMEMCOUPONLIST,
  data,
  showMsg
})
//  GET 会员优惠券详细信息
export const conponGetmemcouponDetail = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_GETMEMCOUPONDETAIL,
  data,
  showMsg
})
//  GET .会员兑换券
export const conponConverCoupon = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_CONVERTCOUPON,
  data,
  showMsg
})
//  GET .查询会员交易
export const conponQuerMemTrade = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_QUERYMEMTRADE,
  data,
  showMsg
})
//  GET .会员优惠券领用记录查询
export const conponSearchCoupon = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_SEARCHCOUPON,
  data,
  showMsg
})
//  GET 会员优惠券核销
export const conponCancelCoupon = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_CANCELCOUPON,
  data,
  showMsg
})
//  GET .会员修改手机号
export const conponModifyPhone = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_MODIFYPHONE,
  data,
  showMsg
})
//  GET .会员解绑会员卡
export const conponUnbindCard = (data, showMsg) => ajax({
  url: baseUrl + types.COUPON_UNBINDCARD,
  data,
  showMsg
})
export const shopGetAreaShop = (data, showMsg) => ajax({
  url: baseUrl + types.SHOP_GETAREASHOP,
  data,
  showMsg
})
export const checkUpdate = (data, showMsg = false) => ajax({
  url: upDateUrl,
  data,
  showMsg
})
