import React from "react";

import { ScrollView, View, Text, Image, StyleSheet, Dimensions } from "react-native";

import I18n from "i18n-js";

const PADDING = 20;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#FFFFFF" },
	contentContainer: { padding: PADDING },

	text: { fontSize: 12, marginVertical: 8 },
	title: { fontSize: 20, alignSelf: "center" },

	view: { flexDirection: "row", marginVertical: 8 },
	viewText: { flex: 1, fontSize: 12 },
	borderText: { flex: 3, borderBottomWidth: 1, borderColor: "#8B8B9A", textAlign: "center" },

	sealImgView: { flex: 1 },
	sealImg: { width: 100, height: 100 },
	signatureImg: { flex: 1, height: 30 },

	errorBox: { height: 100, alignItems: "center", justifyContent: "center" },
	errorText: { fontSize: 16, color: "#F00" },
	noDataText: { fontSize: 16, color: "#000000" }

} );

/*
投资ETUSD: "8041.35000"
矿机算力: "21.200"
至年: "2020"
至月: "07"
至日: "02"
*/

export default React.memo( function( { data, loading, error, fetchData } )
{
	React.useEffect( function()
	{
		fetchData();
	}, [] );

	if( error )
	{
		return <View style = { styles.container }>
			<View style = { styles.errorBox }>
				<Text style = { styles.errorText }>{ error }</Text>
			</View>
		</View>;
	} else
	{
		return <ScrollView style = { styles.container } contentContainerStyle = { styles.contentContainer } showsVerticalScrollIndicator = { false }>
			<Text style = { styles.title }>香港ETU理财投资合同(电子版)</Text>
			<Text style = { styles.text }>合同编号: { data[ "id" ] }{ data[ "首次投资时间" ] }</Text>
			<Text style = { styles.text }>投资方(甲方): { data[ "姓名" ] }</Text>
			<Text style = { styles.text }>证件号码(身份证、营业执照): { data[ "身份证号码" ] }</Text>
			<Text style = { styles.text }>联系方式: { data[ "电话" ] }</Text>
			<Text style = { styles.text }>设备方(乙方): 香港数字有限公司</Text>
			<Text style = { styles.text }>证件号码: 69879668-000-09-18-A</Text>
			<Text style = { styles.text }>联系方式: 18244444404</Text>
			<Text style = { styles.text }>甲乙双方因矿机营运协商联合投资, 共同开发, 推广产业发展, 促进就业机会, 本着平等自愿公平公正的原则, 根据法律中华人民共和国《国有企业资产管理法》、《中华人民共和国经济合同法》及《中国人民银行, 工业和信息化部, 中国银行监督管理委员会, 中国证券监督管理委员会, 中国保险监督管理委员会关于防范比特币风险的通知》相关规定特签订本合同供双方共同遵守, 内容如下:</Text>
			<Text style = { styles.text }>一、投资标的: </Text>
			<Text style = { styles.text }>&emsp;&emsp;1.甲方自愿投资比特币矿机&emsp;&emsp;0.40&emsp;&emsp;台, 型号 53T, 单价 3000USDT/台.此款在合同签订之日起 10 日内交付, 由甲方负责采购并托管给乙方运营, 乙方需将甲方投资的机器放置在条件有利于双方互利互惠的场地运营, 矿机的产权归甲方所有.</Text>
			<Text style = { styles.text }>&emsp;&emsp;2.乙方收取数字资产按 3000USDT 泰达币/台收取, 或相等价值的 ETUSD 或 USDT, 依据乙方系统兑换参数核算的确认数量为准换等取等值矿机.</Text>
			<Text style = { styles.text }>二、投资期限</Text>
			<Text style = { styles.text }>&emsp;&emsp;合同有效期自2020年04月03日起至2020年07月02日止(最低不低于三个月), 如未填写按甲方在乙方平台确认时间为准自动顺延</Text>
			<Text style = { styles.text }>三、分红金额及方式: </Text>
			<Text style = { styles.text }>&emsp;&emsp;分红及其回购金额以 USDT 泰达币、ETUSD 资产或其对应等值资产支付.</Text>
			<Text style = { styles.text }>&emsp;&emsp;最低分红按客户所兑换的矿机台数, 每台每天支付运营分红 9USDT 或等值 ETUSD 资产进行支付, 剩余盈利归乙方所有.</Text>
			<Text style = { styles.text }>&emsp;&emsp;甲方收款方式:甲方在乙方平台中每日领取收益, 未领取视为放弃当日收益.</Text>
			<Text style = { styles.text }>四、退出投资: </Text>
			<Text style = { styles.text }>&emsp;&emsp;1.投资期限到期按投资当日生效起, 最低需满三个月, 如甲方在三个月内退出投资, 甲方需向乙方支付矿机运营附属设施费用, 该费用按甲方投资金额的 20% 进行计算.</Text>
			<Text style = { styles.text }>&emsp;&emsp;2.投资到期满 3 个月的, 甲方无需支付矿机运营附属设施费用.</Text>
			<Text style = { styles.text }>&emsp;&emsp;3.甲方满足退出投资条件后, 提出退出申请, 乙方需在确认后 7 个工作日内完成甲方的机器回购.甲方机器保持正常运行, 乙方必须全部回购, 回购款七日内付清.乙方付款回购后, 矿机产权归乙方所有.</Text>
			<Text style = { styles.text }>&emsp;&emsp;4.因乙方因素提前回购, 从乙方支付回购款后本协议自动终止, 不再计算分红.</Text>
			<Text style = { styles.text }>&emsp;&emsp;5.甲方可在乙方安装完毕机器后随时提机, 甲方提机则自动解除合同, 由于机器价格上涨产生的收益归购买方所有.</Text>
			<Text style = { styles.text }>五、交易金规定: </Text>
			<Text style = { styles.text }>&emsp;&emsp;交易金规定: 乙方在甲方投资后, 通过乙方平台为甲方匹配等额的 USDT 交易金, 该交易金可用于甲方进行数字合约交易, 如赢利(或亏损)则按照实有数增加或减少甲方矿机数量, 所对应的运营分红按增减后的数量计算.</Text>
			<Text style = { styles.text }>六、违约处理: </Text>
			<Text style = { styles.text }>&emsp;&emsp;1.甲方签订合同时应全额付清购机款, 否则乙方不予退还所收定金, 定金交易模式(预付金)</Text>
			<Text style = { styles.text }>&emsp;&emsp;2.甲方达到回购条件时, 如因乙方不及时回购致甲方投资超期, 除正常支付分红金额外, 另需支付一倍的分红金额作为违约金, 但最长超期不得超过三个月.</Text>
			<Text style = { styles.text }>七、其他约定: </Text>
			<Text style = { styles.text }>&emsp;&emsp;1.由于雷暴、火山爆发、地震、海啸、泥石流等自然灾害或国家、全球行业计算机信息  系统故障、电力系统瘫痪、科技的更新换代等不可抗力因素所导致本合同无法继续履约, 本合同自动作废, 双方互不承担任何经济和法律责任.</Text>
			<Text style = { styles.text }>&emsp;&emsp;2.设备由于被盗抢打砸或第三方恶劣因素导致暂停生产、灭失或无法继续生产, 则合同中止, 乙方需配合甲方行驶诉讼、仲裁、报案等法律权利, 合同中止期间免除乙方应向甲方支付的分红.待恢复后合同继续履行.</Text>
			<Text style = { styles.text }>&emsp;&emsp;3.由于矿机运营地地方政府土地征用, 文物挖掘等地方政府调控行为、国家政策的临时出台或全球经济危机、全球行业的没落或淘汰而导致的暂停生产, 则合同中止, 乙方有义务尽快恢复生产, 恢复正常后合同继续履行</Text>
			<Text style = { styles.text }>&emsp;&emsp;4.甲方不得听信市场其他推广人员恶意、故意或错误扩大收益等虚假宣传.由此造成的损失与乙方无关, 不承担责任.</Text>
			<Text style = { styles.text }>八、解决合同纠纷的方式: </Text>
			<Text style = { styles.text }>&emsp;&emsp;本合同发生争议, 由甲乙双方协商解决, 协商不成, 由公司所在地或江油市仲裁委员会仲裁.</Text>
			<Text style = { styles.text }>九、本合同一式三份, 甲方一份、乙方两份, 具有同等法律效力.</Text>
			<Text style = { styles.text }>十、本合同经双方签字盖章之日起生效.</Text>
			<Text style = { styles.text }>十一、本合同内容我已认真阅读并确认.同意合同内容.并自愿承担由此产生的经济责任.</Text>
			<Text style = { styles.text }>&emsp;&emsp;甲方抄写: </Text>
			<View style = { styles.view }>
				<Text style = { styles.viewText } />
				<Text style = { styles.borderText }>同意合同内容</Text>
			</View>
			<Text style = { styles.text }>&emsp;&emsp;(电子版以乙方平台公示有效)</Text>
			<View style = { styles.view }>
				<Text style = { styles.viewText }>甲方(签章): </Text>
				<Text style = { styles.viewText }>乙方(签章): </Text>
			</View>
			<View style = { styles.view }>
				<Text style = { styles.viewText }>{ data[ "姓名" ] }</Text>
				<View style = { styles.sealImgView }>
					<Image style = { styles.sealImg } source = { require( "./../images/seal.jpg" ) } />
				</View>
			</View>
			<View style = { styles.view }>
				<Text style = { styles.viewText } />
				<View style = { styles.viewText }>
					<Text style = { styles.text }>法定代表人签字: </Text>
					<Image style = { styles.signatureImg } source = { require( "./../images/signature.jpg" ) } />
				</View>
			</View>
			<View style = { styles.view }>
				<Text style = { styles.viewText }>{ data[ "年" ] }年{ data[ "月" ] }月{ data[ "日" ] }日</Text>
				<Text style = { styles.viewText }>{ data[ "年" ] }年{ data[ "月" ] }月{ data[ "日" ] }日</Text>
			</View>
			<Text style = { styles.text }>公司地址: ROOM 510,WAYSON COMMERCIAL BUILDING,28 ONNAUGHT ROAD WEST HONGKONG</Text>
			<Text style = { styles.text }>香港荃湾沙咀道 6 号嘉达环球中心 8 楼 12 室</Text>
		</ScrollView>;
	};
} );
