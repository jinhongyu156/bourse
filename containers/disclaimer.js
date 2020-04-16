import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { WebView } from "react-native-webview";

import { Dimensions } from "react-native";

const SCREENWIDTH = Dimensions.get( "window" ).width * 0.8;
const SCREENHEIGHT = Dimensions.get( "window" ).height * 0.8;

const styles = StyleSheet.create( {

	overlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	wrapper: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }

} );


const html = `<div style = "font-size: 40px"><h2 style="text-align:center;margin-top:5vw">用户协议(免责声明)
  <br>User Agreement (Disclaimer)</h2>
<br>
<br>加拿大SLB电子交易公司（以下称 “公司”）是一家根据加拿大相关法律在加拿大注册成立的公司，该公司运营网站http://www.slb.one/（以下称“本网站”或“网站”），该网站是一个专门供用户进行数字资产交易和提供相关服务（以下称“网站服务”或“服务”）的数字资产交易平台。为了本协议表述之方便，公司和该网站在本协议中合称使用“我们”或其他第一人称称呼。登陆本网站或使用网站服务的自然人或其他主体均为本网站的用户，本协议表述之便利，以下使用“您”或其他第二人称。为了本协议表述之便利，我们和您在本协议中合称为“双方”，我们或您单称为“一方”。本网站所有内容，为便利用户，可能提供多个语言版本，若有冲突或遗漏等情况，以中文内容为准。
<br>The website www.slb.one (the “Website”) is operated by Canada SLB Electronic Trade Inc., a company duly incorporated under the laws of Canada (the “Company”). The Website is a digital asset trading platform where users can conduct digital asset transactions and on or through which related services (the “Services”) are made available to the users. For the purpose of this Agreement, the words “we”, “us”, “our” and other first-person addressing refer to the Company and this Website collectively. The words “you”, “your” and other second-person addressing refer to the natural person or other entity accessing or otherwise using the Website and/or the Services (the “User”). For the purpose of this Agreement, we and the User are hereinafter collectively referred to as the “Parties”, and individually, a “Party”. The content of this Website, for the User’s convenience, may be provided in multilingual versions. In the event of any conflict between different versions, the Chinese version will prevail.
<br>本用户协议（以下称“本协议”或“本使用条款与条件”）包含重要提示、一般条款和条件、反洗钱与反恐怖融资政策以及本网站已发布或将来可能发布的各类规则、声明、说明等内容。
<br>This User Agreement (the “Agreement” or the “Terms and Conditions of Use”) consists of important notices, general terms and conditions, anti-money laundering and anti-terrorist financing policy as well as all rules, statements, explanations and other documents having already been posted or to be posted on the Website in the future.
<br>一、重要提示：
<br>I. Important Notices
<br>我们在此特别提醒您：
<br>We hereby bring the following to your special attention:
<br>1. 公司并非一家银行、信贷联盟、信托机构或其他类型的金融机构，不受适用于金融机构的相关法律、法规、规则和指令的管辖和约束；
<br>1. The Company is not a bank, credit union, trust or any other type of financial institution and is not subject to the laws, regulations, rules and directives applicable to financial institutions；
<br>2. 公司不受加拿大存款保险公司或提供存款保险服务的其他实体的保护。数字货币和数字货币存款均不在任何保险单的保障范围内；您是唯一有责任保护您的数字货币钱包的人；
<br>2. The Company is not protected by the Canadian Deposit Insurance Corporation or any other entity providing deposit insurance services；neither digital currencies nor digital currency deposits are protected by any insurance policy; It's your sole responsibility to protect your digital currency wallet;
<br>3. 数字资产本身不由任何金融机构或公司或本网站发行；依据加拿大法律规定，诸如比特币等数字货币不是法定货币；可通过本网站和/或网站服务购买的数字资产并非不列颠哥伦比亚省《证券法》所规定的“证券”，因此，您不享有法律规定证券买受人有权享有的各项权利、救济和保护；
<br>3. Digital assets are not issued by any financial institution or the Company or this Website; Digital currencies, such as Bitcoin or other crypto currencies, are not legal tender pursuant to the laws of Canada; the digital assets available for purchase via this Website and/or the Services are not “securities” within the meaning of the Securities Act (British Columbia) and, therefore, you will not have any of the rights, remedies or other protections available at law to purchasers of securities;
<br>4. 数字资产市场是全新的、未经确认的，而且可能不会增长；
<br>4. Digital asset market is a brand-new and unconfirmed market and may not expand in the future;
<br>5. 数字资产主要由投机者大量使用，零售和商业市场使用相对较少，数字资产交易存在极高风险，其全天不间断交易，没有涨跌限制，价格容易受庄家、政府政策的影响而大幅波动；
<br>5. Digital assets are widely used by speculators and relatively fewer retailers and other merchants are using digital assets; digital asset transactions are extremely risky; the transaction may take place 24ⅹ7, without any limit up or limit down; the trading price is liable to fluctuate due to manipulation by the market maker or enactment or change of policies by governments in the world;
<br>• 6. 因各国法律、法规和/或规范性文件的制定或者修改，数字资产交易随时可能被暂停或被禁止；
<br>6. Digital asset trading may be suspended or even banned at any time by enactment of or amendment to laws, regulations and/or other regulatory documents by a country or countries;
<br>7. 加拿大《所得税法》适用于数字货币交易（含使用加密货币的交易）；用数字货币购买商品的，卖方须缴纳所得税；数字货币被视为商品，适用《所得税法》中关于易货贸易的规则；对于数字货币买卖中产生的收益或亏损，您须一并进行纳税申报；
<br>7. The Income Tax Act of Canada applies to digital currency transactions, including those made with crypto currencies；goods purchased using digital currency must be included in the seller’s income for tax purposes; digital currencies are considered a commodity and are subject to the barter rules of the Income Tax Act；When you file your taxes you must report any gains or losses from selling or buying digital currencies；
<br>8. 数字资产交易有极高风险，并不适合绝大部分人士；您了解和理解此投资有可能导致部分损失或全部损失，所以您应该以能承受的损失程度来决定投资的金额；您了解和理解数字资产会产生衍生风险，所以如有任何疑问，建议先寻求理财顾问的协助；此外，除了上述提及的风险以外，还会有未能预测的风险存在；您应慎重考虑并用清晰的判断能力去评估自己的财政状况及上述各项风险而作出任何买卖数字资产的决定，并承担由此产生的全部损失; 您承认并同意，对于您使用本网站或网站服务而产生的或与该使用行为有关的任何损失，我们不对您或任何其他人承担任何责任。
<br>8. Digital asset trading is extremely risky and is not suitable for most people；you know and understand that digital asset investment may end up with loss in whole or in part, therefore, you shall make your investment decision in accordance with your ability to bear such loss; you know and understand that there will be derivative risks in connection with digital assets; if you have any question, you’re advised to consult with a financial advisor; besides the aforementioned risks, there will be other unpredictable risks; you shall prudently and with clear judgment assess your financial position as well as all risks before you make a decision on buying or selling any digital asset, and you shall be responsible for any and all losses as a result thereof; you acknowledge and agree that we accept no responsibility or liability to you or any other person whatsoever for any loss incurred from or in connection with your use of the Website or the Services.
<br>您认可并确认以下事项：
<br>You hereby acknowledge and confirm the following:
<br>1. 您了解本网站仅作为您获取数字资产信息、寻找交易方、就数字资产的交易进行协商及开展交易的场所，公司及本网站均不参与您的任何交易，故您应自行谨慎判断确定相关数字资产及/或信息的真实性、合法性和有效性，并自行承担因此产生的责任与损失；
<br>1. You understand that this Website is only a marketplace for obtaining digital asset information, looking for potential traders, negotiating about digital asset transactions and conducting transactions; neither the Company nor the Website is involved in your transactions; you are solely responsible for informing yourself as to the authenticity, legality and effectiveness of digital assets and/or any information in concern and shall be solely responsible for any liability or loss as a result thereof;
<br>2. 本网站的任何意见、消息、探讨、分析、价格、建议和其他资讯均是一般的市场评论，并不构成投资建议；我们不承担您或任何其他人因依赖该资讯而产生的直接或间接损失，包括但不限于任何利润损失;
<br>2. All opinions, information, discussions, analyses, prices, suggestions/advices and other contents contained on or in the Website are provided for informational purposes only and are not intended to constitute investment advices, and we’re not responsible or liable for any direct or indirect loss or damages incurred by you or any other person relying on any such information or any other contents;
<br>3. 本网站的内容会随时更改并不作另行通知，虽然我们尽力提供准确、完整的信息，但我们对提供的信息不作任何保证，亦不会承担任何因本网站上的资讯或因未能连接互联网、传送或接收任何通知和信息时的延误或失败而直接或间接产生的损失;
<br>3. Any content of this Website may be removed, modified or otherwise changed without notice to the User; although we endeavor to provide accurate and complete information, we make no representation or warranty with respect to such information; we are not responsible or liable for any direct or indirect loss or damages arising from any information posted on the Website, any disconnection from the Internet, or any delay in or failure to send or receive any notice or information;
<br>4. 本网站和网站服务仅可在依据相关法律规定使用本网站和网站服务为合法行为的法域使用；禁止在本网站或网站服务被认定为非法或未获政府有权机关许可的法域使用网站服务；如果公司根据其单方判断认为您违反了本协议，或者根据您所在法域的法律本网站提供的服务或者您使用本网站提供的服务的行为是非法的，公司有权随时暂停，终止或清除您的账户，或者暂停或终止您使用本网站提供的服务或数字资产交易。禁止位于美国，中国大陆的任何人使用本网站提供的服务;
<br>4. The Website and Services may only be accessed from and used in jurisdictions in which such access and use is legal under the applicable laws; any use of the Services from a location where the Website or Services are illegal or otherwise unauthorized by the competent authorities located therein is expressly prohibited; in the event that the Company, at its sole discretion, believes that you breach any term or condition of this Agreement or that the Services are illegal or you use the Website or the Services in a manner that is unlawful in the jurisdiction of your residence, the Company shall have the right to, from time to time, suspend, terminate or delete your account, or suspend or terminate your rights to use the Services or to conduct digital asset transactions; use of the Services by residents or citizens of the United States of American or of the Mainland China is expressly prohibited;
<br>5. http://www.slb.one/为本网站唯一官方对外信息公布平台；
<br>5. The website address www.slb.one is the only official platform where information is posted and published on behalf of the Website;
<br>6. 本网站任何服务均不接受信用卡支付；
<br>6. No credit card payment will be acceptable for the Services;
<br>7. 禁止使用本网站或网站服务从事洗钱、走私、非法换汇、商业贿赂、恐怖融资等一切非法交易活动，若发现此类事件，本站将采取各种可使用之手段，包括但不限于冻结账户，通知相关权力机关等，我们不承担由此产生的所有责任并保留向相关人士追究责任的权利；
<br>7. It’s prohibited to use the Website or the Services for such illegal activities as money laundering, smuggling/trafficking, illegal currency exchange, commercial bribery and terrorist financing; in the event of any of the above, we will take all practical measures, including but without limitation to freezing your account and reporting to competent authorities; we bear no responsibility or liability for any such measures and reserve the right to make claims against the person conducting any such illegal activity;
<br>8. 禁止使用本网站或网站服务进行恶意操纵市场、不正当交易（恶意交易）等一切违法或不道德交易活动，若发现此类事件，本网站将对所有恶意操纵价格、恶意影响交易系统等不道德的行为采取警告、限制交易、关停账户等预防性地保护措施，我们不承担由此产生的所有责任并保留向相关人士追究责任的权利；
<br>8. It’s prohibited to use this Website or the Services for such illegal or unethical activities as market manipulation and/or unfair dealing (hostile dealing); in the event of any of the above, we will tack such preventive measures as issuing warning notices, restricting trading and/or closing accounts; we bear no responsibility or liability for any such measures and reserve the right to make claims against the person conducting any such activity;
<br>二、一般条款和条件
<br>II. General Terms and Conditions
<br>1. 总则
<br>1. General Provisions
<br>1.1 您在使用本网站提供的各项服务之前，应仔细阅读本协议，如有不理解之处或其他必要，请咨询专业律师。如您不同意本协议及/或随时对其的修改，您应立即停止使用本网站提供的服务并不再登陆本网站。您一旦登陆本网站、使用本网站的任何服务或任何其他类似行为即表示您已了解并完全同意本协议各项内容，包括本网站对本协议随时所做的任何修改。
<br>1.1 You shall carefully read the terms and conditions of this Agreement before you start to use any of the Services. If there is anything that you don’t understand, or if you need any help with the Agreement, you are advised to consult an attorney-at-law. If you don’t agree to any term or condition of this Agreement or any amendment thereto from time to time, you shall immediately discontinue your use of the Services and do not log in to the Website. Once you access or make use of this Website and/or the Services or do any other action to that effect, you are deemed to have understood and absolutely agree to all terms and conditions of this Agreement as amended or restated from time to time by the Website.
<br>1.2 您通过按照本网站的要求填写相关信息，并经过其他相关程序后成功注册可以成为本网站的会员（以下称“会员”），在进行注册过程中点击“同意”按钮或类似含义的按钮即表示您以电子签署的形式与公司达成协议；或您在使用本网站过程中点击任何标有“同意”或类似意思的按钮的行为或以其他本网站允许的方式实际使用本网站提供的服务时，均表示您完全了解、同意且接受本协议项下的全部条款的约束。
<br>1.2 After typing in required information and following other relevant procedures, you may become a member of this Website (a “Member”). By hitting the “consent” button (or any other button to that effect) during the registration process, you are deemed to have entered into the Agreement with the Company; by hitting any “consent” button (or any other button to that effect) during your use of the Website or by making use of the Services in any other way permitted by the Website, you are deemed to have completely understood, agreed to, accepted and been bound by all terms and conditions of this Agreement.
<br>1.3 成为本网站的会员后，您将获得一个会员帐号及相应的密码，该会员帐号和密码由您本人负责保管，且仅可由您本人使用。您必须安全保存该密码，不得向任何第三人透露，也不得允许任何第三人使用。您帐号的一切操作皆视为您本人操作，您承担所有操作风险，并应当对以您帐号进行的所有活动和事件负法律责任。
<br>1.3 After you become a Member, you will have a username and an account password. The username and password shall be taken care of by you and may only be used by you. You must keep your account password secure and not disclose it to any person or permit any other person to use it. All activities occurring on your account are deemed to have been conducted by you and at your own risk. You are solely responsible for the activity or event that occurs on your account.
<br>1.4 只有成为本网站的会员才可使用本网站提供的数字资产交易平台进行交易及享受其他本网站规定的只有会员才可获得的服务；会员外的其他人仅可登陆网站、浏览网站及其他本网站规定的可获得的服务。
<br>1.4 You must become a Member in order to access and make transactions on or through the digital currency trading platform created on the Website and/or to use any of the Services made available through the Website to Members. Non-member users may only log in to and browse on the Website, and use the services available to non-members.
<br>1.5 通过注册和使用任何由本网站提供的服务和功能，您被视为已向我们做出如下陈述、保证和承诺：
<br>By creating an account or using the Services, you are deemed to have represented, warranted and covenanted to us as follows:
<br>1.5.1 接受本协议所有条款及条件的约束；
<br>1.5.1 You have accepted the Terms and Conditions of Use and agreed to be bound by them；
<br>1.5.2 您确认您已年满19周岁或达到适用于您的法律所规定的可订立合同的法定年龄，并有充分的能力接受这些条款和受这些条款的约束，以及使用本网站进行数字资产交易；您在本网站的注册、销售或购买、发布信息等接受本网站服务的行为应当符合对您有管辖权的主权国家或地区相关法律法规；
<br>1.5.2 You confirm that you are at least 19 years of age or have attained the age that capacitates you to enter into a contract pursuant to laws applicable to you; you’re fully competent and have the capacity to enter into, accept and be bound by these Terms of Conditions of Use, and to conduct digital asset transactions on or through this Website; your registration with this Website as well as sale, purchase and information posting made on or through the Website or other actions indicating your acceptance of the Services shall be in consistency with laws and regulations in the jurisdiction of your residence or nationality;
<br>1.5.3 您保证交易中涉及到的属于您的数字资产均为合法取得并所有；
<br>1.5.3 You warrant that the digital assets your transaction involves have been legally obtained and is lawfully owned by you;
<br>1.5.4 您同意您为您自身的交易或非交易行为承担全部责任和任何收益或亏损;
<br>1.5.4 You agree that you’re solely responsible for your actions (whether trading or non-trading actions) and for your losses or gains incurred from such actions;
<br>1.5.5 您确认注册时提供的信息是真实、完整和准确的；信息提交后相关信息发生变更的，您应在变更发生之日起10日内更新该信息；因您未及时更新相关信息而给您或任何其他人造成任何损失或损害的，我们不承担任何责任。
<br>1.5.5 You confirm that all information that you submit in connection with the creation of your account or otherwise is true, complete and accurate; if any information changes after the date of submission, you shall update such information no later than ten (10) days after the date of such change; We accept no responsibility or liability whatsoever for any loss or damages incurred by you or any other person arising from or in connection with your failure to maintain current and accurate information.
<br>1.5.6 您同意遵守任何有关法律的规定，就税务目的而言，包括报告任何交易所得；
<br>1.5.6 You agree to observe and abide by all applicable laws and to file returns on your income for tax purposes;
<br>1.5.7 本协议只是就您与我们之间达成的权利义务关系进行约束，而并不涉及本网站用户之间与其他网站和您之间因数字资产交易而产生的法律关系及法律纠纷；
<br>1.5.7 This Agreement is entered into by and binding upon you and us, and has nothing to do with rights and obligations between the Users or between you and other websites with respect to digital asset transactions;
<br>1.5.8 您仅可为合法目的并以合法方式使用本网站和/或网站服务；您对本网站或网站服务的使用未经授权或违反相关法律规定的，您应对我们因此遭受的损失和损害承担赔偿责任，本网站有权冻结或注销您的账户，并可在通知您之后从您的账户提取部分或全部数字资产以获得赔偿。
<br>1.5.8 You may use the Website and/or the Services only for lawful purposes and in a lawful manner; if you use the Website or the Services in a manner that is unauthorized or in contravention of any applicable law, you shall be liable to and responsible for any and all losses and damages incurred by us in connection with such unauthorized or unlawful action, and the Website shall have the right to freeze or revoke your account and, upon notice to you recover such losses or damages by withdrawing some or all of digital assets held therein.
<br>2. 协议修订
<br>2. Amendment to the Agreement
<br>我们保留不时修订本协议、并以网站公示的方式进行公告、不再单独通知您的权利。变更后的协议会在本协议首页标注变更时间，一经在网站公布，立即自动生效。您应不时浏览及关注本协议的更新变更时间及更新内容，如您不同意相关变更，应当立即停止使用本网站及网站服务；您继续使用本网站或网站服务，即表示您接受并同意受修订协议的约束。
<br>The Company reserves the right to, from time to time and without notice to you, modify, amend or otherwise change this Agreement in part or in whole and to post the amended Agreement on the Website. The amended Agreement will bear on its first page the date of amendment and will become effective automatically and immediately at the time when it is posted on this Website. You shall constantly check if there is any change to the Agreement. If you do not agree to such change, you shall immediately discontinue your use of this Website and the Services. Your continued use of this Website or any of the Services after changes to the Agreement will constitute your acceptance of the changes and consent to be bound by them.
<br>3. 注册
<br>3. Registration
<br>3.1 注册资格
<br>您确认并承诺：在您完成注册程序或以其他本网站允许的方式实际使用本网站提供的服务时，您应当是具备可适用的法律规定的可签署本协议及使用本网站服务应具有的能力的自然人、法人或其他组织。您一旦点击“注册”按钮，即表示您自身或您的有权代理人已经同意该协议内容并由其代理注册及使用本网站服务。若您不具备前述主体资格，则您及您的有权代理人应承担因此而导致的一切后果，且公司保留注销或永久冻结您账户，并向您及您的有权代理人追究责任的权利。
<br>3.1 Eligibility to Register
<br>You confirm and undertake that at the time of completion of account registration process or when you actually use any of the Services in a manner permitted by the Website you are a natural person, a legal person or other entity who is fully competent and has full capacity to enter into this Agreement and/or to use the Services. Your hitting the “register” button means that you and your agent(s) agree to accept this Agreement and to use the Services. If you lack any of the capacities, you and your agent(s) shall be responsible and liable for all losses and/or damages as a result thereof; the Company reserves the right to close or permanently freeze your account and to make claims against you and your agent(s).
<br>3.2 注册目的
<br>您确认并承诺：您进行本网站注册或以其他方式使用网站服务并非出于非法或不道德或破坏本网站数字资产交易秩序的目的。
<br>3.2 Purposes of Registration
<br>You confirm and undertake that neither your registration with this Website nor your otherwise use of the Services will be for any unlawful or unethical purpose or for the purpose of jeopardizing the order of digital asset transactions conducted on or through the Website.
<br>3.3注册流程
<br>3.3 Registration Process
<br>3.3.1 您同意根据本网站用户注册页面的要求提供有效电子邮箱、手机号码、账户密码等信息，您可以使用您提供或确认的邮箱、手机号码或者本网站允许的其它方式作为登陆手段进入本网站。如有必要，按照不同法域相关法律法规的规定，您必须提供您的真实姓名、身份证件等法律法规及隐私条款及反洗钱条款规定的相关信息并不断更新注册资料，符合及时、详尽、准确的要求。您应对所有原始键入的资料的真实性、完整性和准确性负责，并承担因此产生的任何直接或间接损失及不利后果。
<br>3.3.1 You agree to follow the account registration process and requirements set out on the registration page(s) of the Website and, submit such information as valid email address and mobile phone number, together with an account password. You may log in to access the Website using the said email address or mobile phone number or such other login methods as the Website allows. In case of necessity, you must provide your real name and ID documents in pursuance to applicable laws and/or regulations, privacy policy and/or anti-money laundering policy. You must keep all such information updated, current, complete and accurate, and you’re solely responsible for the authenticity, completeness and accuracy of all information you submitted to the Website as well as all losses (whether direct or indirect) or adverse effects as a result of your failure to do so.
<br>3.3.2 如您所在主权国家或地区的法律法规、规则、命令等规范对手机号码有实名要求，您同意提供注册的手机号码是经过实名登记的，如您不按照规定提供，因此给您带来的任何直接或间接损失及不利后果均应由您承担。
<br>3.3.2 If applicable laws, rules or orders in the sovereign country or region where you reside require real name verification for mobile phone number, you agree to submit a verified mobile phone number. If you fail to do the same, you will be solely responsible and liable for all losses (whether direct or indirect) and adverse effects as a result thereof.
<br>3.3.3您提供合法、完整且有效的注册所需信息并经验证后，可获得本网站帐号和密码，您获得本网站帐号及密码时视为注册成功，可在本网站进行会员登陆。
<br>3.3.3 After you submit lawful, complete and valid information that is required for account registration and type in the confirmation code, you will have a username and the password, which indicates your success in registration with the Website. You may log in to access the Website as a Member thereafter.
<br>3.3.4 您同意接收本网站发送的与本网站管理、运营相关的电子邮件和/或短消息。
<br>3.3.4 You agree to receive any and all emails and text messages from the Website with respect to the management or operation of the Website.
<br>4. 服务
<br>4. Services
<br>本网站只为您通过本网站进行数字资产交易活动提供网络交易平台服务。本网站并不作为买家或卖家参与买卖数字资产行为本身；本网站不提供任何国家法定货币充入和提取的相关服务。
<br>This Website only provides a cyber platform for you to sell and/or buy digital assets. The Website is not a part of any sale or purchase of any digital assets, and doesn’t provide services for recharging your account with legal tender or withdraw legal tender from your account.
<br>我们保留随时不经通知您而变更、中止、中断或终止本网站或网站服务的任何内容的权利。
<br>We reserve the right to, from time to time and without notice to you, change, suspend, discontinue or terminate any aspect of this Website or the Services.
<br>4.1 服务内容
<br>4.1 Service Details
<br>4.1.1 您有权在本网站浏览数字资产各项产品的实时行情及交易信息、有权通过本网站提交数字资产交易指令并完成数字资产交易。
<br>4.1.1 You shall have the right to browse on the Website and view all real-time market data and trading information with respect to digital assets and to submit an order and then complete a digital asset transaction through the Website.
<br>4.1.2 您有权在本网站查看您在本网站会员帐号下的信息，有权应用本网站提供的功能进行操作。
<br>4.1.2 You shall have the right to check your account information on or through the Website and manage your account using tools provided by the Website.
<br>4.1.3 您有权按照本网站发布的活动规则参与本网站组织的网站活动。
<br>4.1.3 You shall have the right to participate in any activity sponsored by the Website following rules for such activity posted on the Website.
<br>4.1.4 本网站承诺为您提供的其他服务。
<br>4.1.4 Other services the Website undertakes to provide you with.
<br>4.2.服务规则
<br>4.2 Rules in Respect of the Services
<br>您承诺遵守下列本网站服务规则：
<br>You hereby undertake to observe and abide by the following rules in respect of the Services:
<br>4.2.1 您必须严格遵守法律法规、规章、及政策要求的规定，保证账户中所有数字资产来源的合法性，不得在本网站或利用本网站服务从事非法或其他损害本网站或第三方权益的活动，如发送或接收任何违法、违规、侵犯他人权益的信息，发送或接收传销材料或存在其他危害的信息或言论，未经本网站授权使用或伪造本网站电子邮件题头信息等;
<br>4.2.1 You must strictly observe and abide by all applicable laws, regulations, rules and policies and ensure that the digital assets in your account have been obtained in a lawful manner. You shall not conduct, on or through this Website, any illegal activity or any activity that is harmful to this Website or to a third party; the said activities include, without limitation to, sending or receiving any information that is in contravention of any applicable law or rule or infringes any right of a third party, sending or receiving information with respect to a pyramid scheme or being otherwise harmful, and unauthorized use of or forging email header(s) of the Website.
<br>4.2.2 您应当妥善使用和保管您在本网站帐号及登陆密码、资金密码、及您注册时绑定的手机号码、以及手机接收的手机验证码的安全。您对使用本网站帐号和登陆密码、资金密码、手机验证码进行的任何操作和后果承担全部责任。当您发现本网站帐号、登陆密码、或资金密码、验证码被未经其授权的第三方使用，或存在其他帐号安全问题时，应立即有效通知本网站，要求本网站暂停本网站帐号的服务。本网站有权在合理时间内对您的该等请求采取行动，但我们对您或任何第三人因该未经授权使用行为而遭受的损失和损害不承担任何责任。您在未经本网站同意的情况下不得将本网站帐号以赠与、借用、租用、转让或其他方式处分给他人。
<br>4.2.2 You shall prudently use and keep secure your account username and password, fund password, mobile phone number bound at the time of registration, and confirmation code received via your mobile phone. You shall be solely responsible and liable for all actions and their consequences occurring on your account username and/or password, fund password, and/or confirmation code. If, at any time, you are aware of any unauthorized use by a third party of your account username and/or password, fund password and/or confirmation code, or any other incident that indicates a certain security problem with respect to your account, you shall immediately notify the Website requesting for suspension of your account. The Website shall have the right to take actions in a reasonable time. We are not responsible or liable to you or any other person for any loss or damages caused by the unauthorized use of your account. You shall not, without consent of this Website, give away, lend, lease, transfer or otherwise dispose of your account.
<br>4.2.3 您同意对您在本网站的帐号或密码下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、网上续签协议或购买服务等）承担责任。
<br>4.2.3 You agree to be solely responsible and liable for all actions and activities (including without limitation to information disclosure, posting information, giving consent by hitting a button or buttons on the Website, submitting agreements, and/or renewing any agreement online or purchasing services) occurring on or in connection with your username and/or password.
<br>4.2.4 您在本网站进行数字资产交易时不得恶意干扰数字资产交易的正常进行、破坏交易秩序；不得以任何技术手段或其他方式干扰本网站的正常运行或干扰其他用户对本网站服务的使用；不得以虚构事实等方式恶意诋毁本网站的商誉。
<br>4.2.4 You shall not, while conducting a digital asset transaction on the Website, willfully interfere with the normal process of any digital asset transaction or do harm to the trading order; you shall not, by means of technology or otherwise, interfere with proper functioning of this Website or with the use by other user(s) of the Services; you shall not, by using any made-up fact or otherwise, willfully defame the goodwill of the Website.
<br>4.2.5 如您因网上交易与其他用户产生纠纷的，不得通过司法或行政以外的途径要求本网站提供相关资料。
<br>4.2.5 You shall not, unless in judicial or administrative proceedings, request for any information or document from the Website in the event of any dispute between you and any other User.
<br>4.2.6 您在使用本网站提供的服务过程中，所产生的应纳税赋，以及一切硬件、软件、服务及其它方面的费用，均由您独自判断和承担。
<br>4.2.6 All taxes, fees and other expenses payable for such things as hardware, software and services in relation to or as a result of your use of the Services shall be in your judgment and at your expense.
<br>4.2.7 您应当遵守本网站不时发布和更新的本协议以及其他服务条款和操作规则，有权随时终止使用本网站提供的服务。
<br>4.2.7 You shall observe and comply with this Agreement as well as other terms of services and procedural regulations published and/or renewed from time to time by the Website, and are entitled to discontinue the use of the Services at any time.
<br>4.3.交易规则
<br>4.3 Trading Rules
<br>4.3.1 您承诺在进入本网站或通过本网站与其他用户进行交易的过程中良好遵守如下交易规则。
<br>4.3.1 You undertake to observe and abide by the following rules whenever you access this Website and/or conduct a transaction on or through this Website with another User or Users.
<br>4.3.1.1 浏览交易信息
<br>您在本网站浏览交易信息时，应当仔细阅读交易信息中包含的全部内容，包括但不限于价格、委托量、手续费、买入或卖出方向， 您完全接受交易信息中包含的全部内容后方可点击按钮进行交易。
<br>4.3.1.1 Browse Trading Information
<br>When you browse trading information on the Website, you shall always pay careful attention to details of the content, including without limitation to price, entrusted quantity, commission charges, and sale or purchase. You may conduct a transaction by hitting the button only when you unconditional accept all such details contained in the trading information.
<br>4.3.1.2 提交委托
<br>在浏览完交易信息确认无误之后您可以提交交易委托。您提交交易委托后，即您授权本网站代理您进行相应的交易撮合，本网站在有满足您委托价格的交易时将会自动完成撮合交易而无需提前通知您。对于您或任何第三人因相关交易未获及时撮合而遭受的损失和损害，我们概不承担任何责任。
<br>4.3.1.2 Submit Entrustment
<br>You may submit entrustment after you view the trading information and confirm them correct, and by submitting entrustment, you authorize the Website to match orders on your behalf. The Website will, without prior notice to you, automatically match your order with another order at a price equal to the entrustment price. We accept no responsibility or liability whatsoever for any loss or damages incurred by you or any other person arising from or in connection with purchase or sale orders that are not fulfilled on a timely basis.
<br>4.3.1.3 查看交易明细
<br>您可以通过管理中心的交易明细中查看相应的成交记录，确认自己的详细交易记录。
<br>4.3.1.3 Check Details of Transactions
<br>You may check details of your transactions through the management center and confirm the detailed transaction records.
<br>4.3.1.4 撤销/修改委托
<br>在委托未达成交易之前，您有权随时撤销或修改委托。
<br>4.3.1.4 Cancel/Amend Entrustment
<br>You are entitled to from time to time cancel or make any amendment to the entrustment before a match of orders occurs and the intended transaction takes place.
<br>5. 本网站的权利和义务
<br>5. Rights and Obligations of the Website
<br>5.1 如您不具备本协议约定的注册资格，则本网站有权拒绝您进行注册，对已注册的，本网站有权注销您的会员帐号，本网站保留向您或您的有权代理人追究责任的权利。同时，本网站保留其他任何情况下决定是否接受您注册的权利。
<br>5.1 If you are not eligible to register as a Member in accordance with this Agreement, the Website shall have the right to decline or revoke the registration, as the case may be, and reserve the right to make claims against you and/or your agent(s). Meanwhile, the Website reserves the right to accept or decline your registration under any other circumstances.
<br>5.2 本网站发现账户使用者并非账户初始注册人时，有权中止或终止该账户的使用。
<br>5.2 The Website shall have the right to suspend or terminate any account if the user of such account is not the person in whose name the said account is registered and obtained.
<br>5.3 本网站有合理理由怀疑您提供的信息错误、不实、失效或不完整时，有权要求您更正、更新信息或中止、终止为其提供网站服务。
<br>5.3 In the event that any information you submitted to the Website is reasonably suspected to be erroneous, false, invalid or incomplete, the Website shall have the right to request correction and/or renewal of such information, or to suspend or terminate the Services to you.
<br>5.4 本网站有权在发现本网站上显示的任何信息存在明显错误时，对信息予以更正。
<br>5.4 The Website shall have the right to correct any apparently erroneous or incorrect information displayed thereon.
<br>5.5 本网站保留随时修改、中止或终止本网站服务的权利，本网站行使修改或中止服务的权利不需事先告知您；本网站终止本网站一项或多项服务的，终止自本网站在网站上发布终止公告之日生效。
<br>5.5 The Website reserves the right to, from time to time and without prior notice to you, change, suspend or terminate the Services. In case of termination of any part of the Services, the termination shall become effective on the date when a notice to that effect is posted on the Website.
<br>5.6 本网站会尽力采取必要的技术手段和管理措施以保持本网站的正常运行。
<br>5.6 The Website will endeavor to maintain the proper functioning of the Website by making use of necessary technology and management measures.
<br>5.7 如您连续一年以上（含一年）未使用本网站会员帐号和密码登陆本网站，则本网站有权注销您的帐号。帐号注销后，本网站有权将该会员名开放给其他用户注册使用。
<br>5.7 If you discontinue logging in to the Website using your account username and password for a year or longer consecutively, the Website shall have the right to revoke your account. In the event of such revocation, the Website has the right to assign the same username to another user.
<br>5.8 本网站有权随时删除本网站内各类不符合法律法规或本网站规定等的内容信息，本网站行使该等权利不需提前通知您。
<br>5.8 The Website shall have the right to, from time to time and without prior notice to you, delete and remove any and all information that fails to comply with applicable laws and/or regulations, or rules imposed by this Website.
<br>5.9 本网站有权根据您所属主权国家或地区的法律法规、规则、命令等规范的要求，要求您提供更多的信息或资料等，并采取合理的措施，以符合当地的规范之要求，您有义务配合；本网站有权根据您所属主权国家或地区的法律法规、规则、命令等规范的要求，暂停或永久停止对您的开放本网站及其部分或全部服务。
<br>5.9 The Website shall have the right to request additional information and documents from you in pursuance to applicable laws, regulations, rules and/or orders in the sovereign country or region where you reside and to take reasonable measures to ensure compliance with such laws, regulations, rules and/or orders. In any such case, you owe us a duty of cooperation. In addition, the Website has the right to suspend or permanently cease to make any part or all of the Services available to you.
<br>5.10 本网站和网站服务可能包含安全缺陷，该安全缺陷在遭受恶意网络攻击时可能导致您账户内的数据、数字资产或其他资产丢失或被盗。您使用本网站及/或网站服务的风险完全由您自己承担。
<br>5.10 The Website and the Services may contain security flaws that, if subject to malicious cyberattack, may result in the loss or theft of your data, digital assets or other funds in your account. Your use of the Website and/or the Services is entirely at your own risk.
<br>6. 赔偿
<br>6. Indemnity
<br>6.1 在任何情况下，我们对您的损害赔偿责任均不会超过您向本网站支付的为期三个月的服务费总和。
<br>6.1 Under no circumstances shall we be responsible and liable for any loss or damages in excess of the aggregate amount you paid to the Website as service fees for a three-month period.
<br>6.2 如您发生违反本协议或其他法律法规等情况，您须向我们至少赔偿200万美元及承担由此产生的全部费用（包括律师费等），如不够弥补实际损失，您须补全。
<br>6.2 In the event that you are in default on this Agreement or in contravention of any applicable law or regulation, you must pay to us USD two (2) million in addition to all costs and expenses (including attorney’s fees). If the said amount is not enough to cover the actual damages suffered by us, you must make up the difference.
<br>6.3 因您登录和/或使用本网站、网站服务或您在本网站的账户，或因您违反任何相关法律、法规、规则或命令的规定或要求或侵犯任何第三人的权利，而导致本网站、公司或其董事、高级管理人员、员工、代理人或代表被索赔、承担赔偿责任或义务、遭受损失或支出费用的，您同意对前述各项进行赔偿，且不追究前述任何人任何责任。
<br>6.3 You agree to defend, indemnify and hold harmless the Website, the Company and its directors, officer, employees, agents and representatives from and against any and all claims, damages, obligations, losses, costs and expenses arising from or in relation to your access to and/or use of the Website, the Services or your account on the Website, or your violation of any applicable law, regulation, rule or order or of any third party right.
<br>7. 寻求禁令救济的权利
<br>7. Right to Seek Injunctions
<br>我们和您均承认普通法对违约情况的救济措施可能不足以弥补我们遭受的全部损失, 故非违约方有权在违约情况下寻求禁令救济以及普通法或衡平法允许的其他所有的补救措施。
<br>Both you and we acknowledge and agree that remedies at common law may be inadequate to compensate for our losses and that in the event of a breach of this Agreement the non-breaching party shall have the right to seek an injunction and all other reliefs under common law or equitable law.
<br>8. 责任限制与免责
<br>8. Limitation of Liability and Disclaimer
<br>8.1 您了解并同意，在任何情况下，我们均不就以下各事项承担任何责任：
<br>8.1 You understand and agree that under no circumstances we accept any responsibility or liability for any of the following:
<br>8.1.1 收入的损失；
<br>8.1.1 Loss of income;
<br>8.1.2 交易利润或合同损失；
<br>8.1.2 Loss of profits or loss under a contract;
<br>8.1.3 业务中断；
<br>8.1.3 Discontinuance of business;
<br>8.1.4 预期可节省的货币的损失；
<br>8.1.4 Loss in estimated saving of money;
<br>8.1.5 信息的损失；
<br>8.1.5 Loss in information;
<br>8.1.6 机会、商誉或声誉的损失；
<br>8.1.6 Loss of opportunity, damage to goodwill or reputation;
<br>8.1.7 数据的损坏或损失；
<br>8.1.7 Damage to or loss of data
<br>8.1.8 购买替代产品或服务的成本；
<br>8.1.8 Costs of purchasing substitute products or services
<br>8.1.9 任何由于侵权（包括过失）、违约或其他任何原因产生的间接的、特殊的或附带性的损失或损害，不论这种损失或损害是否可以为我们合理预见,也不论我们是否事先被告知存在此种损失或损害的可能性。
<br>8.1.9 Any and all indirect, special, consequential or incidental damages or losses as a result of tort (including negligence), breach of contract or otherwise, whether such damages and losses are reasonably foreseeable by us and whether we have prior notice of the possibility of such damages and/or losses.
<br>8.1.1 条至8.1.9条均是彼此独立的。
<br>The foregoing articles (from Article 8.1.1 to Article 8.1.9) are independent of one another.
<br>8.2 您了解并同意，我们不对因下列任何情形给您造成的任何损失和损害承担任何赔偿责任：
<br>8.2 You understand and agree that we accept no responsibility or liability for any loss or damages arising from any of the following event or occurrence:
<br>8.2.1 我们有合理的理由认为您的具体交易事项可能存在重大违法或违约情形；
<br>8.2.1 We reasonably believe that the transaction you conduct may be in contravention of an applicable law in a material aspect or constitute a major default;
<br>8.2.2 我们有合理的理由认为您在本网站的行为涉嫌违法或不道德；
<br>8.2.2 We reasonably believe that you act on or through the Website in an unlawful or unethical manner;
<br>8.2.3 通过本网站服务购买或获取任何数据、信息或进行交易等行为或替代行为产生的费用及损失；
<br>8.2.3 Costs and expenses incurred in connection with purchase or acquisition of any data and/or information or any transaction or substitute transaction performed or conducted using the Services;
<br>8.2.4 您对本网站服务的误解；
<br>8.2.4 Your misunderstanding of any of the Services;
<br>8.2.5 任何非因我们的原因而引起的与本网站提供的服务有关的其它损失。
<br>8.2.5 Any other damages or losses arising from or in connection with the Services but are not attributable to us.
<br>8.3 对于因下列任何原因造成的不能提供或延迟提供服务，以及由此给您造成的损失，我们不承担任何责任：信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、天气原因、意外事故、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、银行或其他合作方原因、数字资产市场崩溃、政府行为、 司法或行政机关的命令、其他不在我们可控范围内或我们无能力控制的行为或第三方的原因。
<br>8.3 We accept no responsibility or liability for failure to provide or delay in providing any of the Services, or any loss or damages as a result thereof, arising from or in connection with any of the following events or occurrences: maintenance of information network facilities, information network disconnection, failure of computers or communication facilities or any other system, power failure, weather, accidents, strikes, labor disputes, insurrections, revolts, riots, lack of productivity or insufficiency of raw materials, fire, flood, storms, explosion, war, anything attributable to a bank or any other person, collapse of the digital asset market, acts of a government, judicial or administrative orders, any other action beyond our control or beyond our ability to control, and any other thing attributable to a third party.
<br>8.4 我们不能保证本网站和网站服务总能正常使用，也不保证本网站包含的全部信息、程序、文本等完全安全，不受任何病毒、木马等恶意程序的干扰和破坏，故您登陆、使用本网站或任何网站服务或下载及使用下载的任何程序、信息、数据等均是您个人的决定并自行承担风险及可能产生的损失。
<br>8.4 We cannot guarantee that the Website or the Services will always be available or that all information, programs, texts and other things contained on or in the Website will be completely secure or free of all viruses, Trojan houses or other malicious programs. Your logging in to, accessing, making use of this Website or any of the Services, or downloading or making use of any of the downloaded programs, information, data and/or other things will be at your sole discretion and your own risk.
<br>8.5 我们对本网站中链接的任何第三方网站的任何信息、产品、服务、业务及其他任何内容等不做任何保证和承诺，您如果使用第三方网站提供的任何服务、信息及产品等均为您个人决定且承担由此产生的一切责任。
<br>8.5 We make no representations, warranties or undertakings regarding any third party website that is linked to this Website in terms of the information appearing thereon or any of the products, services, businesses or any other contents described thereon. Your use of any service, information, products or other things appearing or described on any third party website shall be at your sole discretion and your own risk.
<br>8.6 我们对于您使用本网站或网站服务不做任何明示或暗示的保证，包括但不限于本网站或网站服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。此外，我们也不对本网站或网站提服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性作出任何承诺和保证。是否登陆或使用本网站提供的服务是您个人的决定且自行承担风险及可能产生的损失。我们对于数字资产的市场、价值及价格等不做任何明示或暗示的保证，您理解并了解数字资产市场是不稳定的，价格和价值随时会大幅波动甚至崩盘，交易数字资产是您个人的自由选择及决定且自行承担风险及可能产生的损失。
<br>8.6 We make no representations, warranties or undertakings, express or implied, regarding the Website or the Services. We don’t warrant or undertake that the Website or the Services are applicable, without any error or omission, uninterrupted, accurate, reliable or fit for a particular purpose. Moreover, we make no representations, warranties or undertakings regarding any technology or information embodied into or directly or indirectly used by this Website or the Services in terms of validity, accuracy, correctness, reliability, quality, stability, completeness or timeliness. Whether to access or use the Website and/or the Services is entirely at your discretion and your own risk. We make no warranties or undertakings, express or implied, regarding such matters as the market condition and value or price of digital assets. You know and understand that the digital asset market is unstable and that both the value and the price of your digital assets may increase or decrease rapidly and substantially or even collapse. Whether to take part in digital asset transactions is at your sole discretion and your own risk.
<br>8.7 本协议中规定的我们的保证和承诺是由我们就本协议、本网站和网站服务作出的唯一保证和陈述，并取代任何其他途径和方式产生的陈述、保证和承诺，无论是书面的或口头的，明示的或暗示的。所有这些保证和陈述仅仅代表我们自身的承诺和保证，并不保证任何第三方遵守本协议中的保证和承诺。
<br>8.7 The warranties and undertakings made by us under this Agreement are the only warranties and undertakings we make with respect to this Agreement, the Website and the Services, and supersede and distinguish all representations, warranties and undertakings, written or oral, express or implied, made by any other means or in any other manner. All such warranties and undertakings are made with respect to us, and we don’t guarantee that any third party will be bound by any such warranty or undertaking.
<br>8.8 我们并不放弃本协议中未提及的在法律适用的最大范围内我们享有的限制、免除或抵销我们损害赔偿责任的任何权利。
<br>8.8 We do not waive the right to be entitled to, to the maximum extent permissible under applicable laws, the limitation, relief and/or set-off of our liabilities.
<br>8.9 您注册后即表示认可我们按照本协议中规定的规则进行的任何操作，产生的任何风险均由您承担。
<br>8.9 By registering with the Website, you acknowledge and agree to any and all actions we will conduct in accordance with rules set forth in this Agreement and all such actions are at your risk.
<br>9. 协议的终止
<br>9. Termination of the Agreement
<br>9.1 本网站有权依据本协议约定注销您的本网站帐号，本协议于帐号注销之日终止。
<br>9.1 The Website shall have the right to revoke or close your account pursuant to terms and conditions of this Agreement, in which case this Agreement will terminate at the date of such revocation.
<br>9.2 本网站有权依据本协议约定终止全部本网站服务，本协议于本网站全部服务终止之日终止。
<br>9.2 The Website shall have the right to terminate all Services pursuant to terms and conditions of this Agreement, in which case this Agreement will terminate at the date of termination of all the Services.
<br>9.3 本协议终止后，您无权要求我们继续向您提供任何服务或履行任何其他义务，包括但不限于要求我们为您保留或向您披露您原本网站帐号中的任何信息，向您或第三方转发任何信息等。
<br>9.3 Upon termination of this Agreement, you cease to be entitled to the Services from or performance of any obligation by us. Without limiting the generality of the foregoing, you cease to have the right to request us to keep or disclose to you any information in your former account, or to forward to you or any third party any information.
<br>9.4 本协议的终止不影响守约方要求违约方承担任何其他责任。
<br>9.4 Termination of this Agreement is without prejudice to any right, claim or remedy by the non-breaching party against the breaching party.
<br>10. 知识产权
<br>10. Intellectual Property Rights
<br>10.1 本网站所包含的全部智力成果包括但不限于网站标志、数据库、网站设计、文字和图表、软件、照片、录像、音乐、声音及其前述组合，软件编译、相关源代码和软件 (包括小应用程序和脚本) 的知识产权均归我们所有。您不得为商业目的复制、更改、拷贝、发送或使用前述任何材料或内容。
<br>10.1 All intellectual properties on or in or in connection with this Website, including without limitation to the Website logos, database, website design, words and diagrams, computer software, photographs, videos, music, sound or voice or combination of any of the above, software compilation, source codes and software (including applets and scripts) are owned and reserved by us. You shall not, for commercial purposes, duplicate, modify, copy, send or use any of the aforementioned materials and/or contents.
<br>10.2 本网站名称中包含的所有权利 (包括但不限于商誉和商标、标志) 均归公司所有。
<br>10.2 All titles, rights and interests in or in connection with the name of the Website, including but limitation to goodwill, trademarks and logos, are owned and reserved by the Company.
<br>10.3 您接受本协议即视为您主动将您在本网站发表的任何形式的信息的著作权，包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权 以及应当由著作权人享有的其他可转让权利无偿独家转让给本网站所有。我们有权利就任何主体侵权单独提起诉讼并获得全部赔偿。 本协议效力及于您在本网站发布的任何受著作权法保护的作品内容， 无论该内容形成于本协议签订前还是本协议签订后。
<br>10.3 By accepting this Agreement, you are deemed to have transferred, exclusively and royalty-free, to the Website the copyrights over all information (in whatever form) you post on the Website. The said copyrights include without limitation to the reproduction right, distribution right, rental right, right of exhibition, right of display, right of performance, right of presentation, right of broadcasting, right of dissemination through information network, right of cinematography, right of adaptation, right of translation, right of compilation and all other transferable rights the copyright owner is entitled to. We shall be entitled to bring any action against anyone who infringes such copyrights and to all damages. This Agreement covers all copyrightable works you post on the Website, whether they are created before or after the date of conclusion of this Agreement.
<br>10.4 您在使用本网站服务过程中不得非法使用或处分本网站或他人的知识产权权利。您不得将已发表于本网站的信息以任何形式发布或授权其它网站（及媒体）使用。
<br>10.4 You shall not, when accessing and/or using this Website, make use or dispose of any intellectual property of the Website or of any other party in an unlawful manner. You shall not post whatever information you post on this Website on or grant license of use to any other website (or media).
<br>10.5 您登陆本网站或使用本网站提供的任何服务均不视为我们向您转让任何所有权或知识产权。
<br>10.5 Your use of the Website or any of the Services does not transfer to you any ownership or intellectual property right in the Website or its contents.
<br>11. 信息保护
<br>11. Information Protection
<br>11.1 适用范围
<br>Scope of Application
<br>本第11条的适用范围如下：
<br>This Article 11 applies to:
<br>11.1.1 在您注册网站帐号或者使用账户时，您根据本网站要求提供的个人注册信息，包括但不限于电话号码、邮箱信息、身份证件信息；
<br>11.1.1 All personal information you submitted to the Website during the process of registration or your use of the Website, including without limitation to phone number, email address and identity information;
<br>11.1.2 在您使用本网站服务时，或访问本网站网页时，本网站自动接收并记录的您浏览器上的服务器数值，包括但不限于IP地址等数据及您要求取用的网页记录；
<br>11.1.2 Server values the website automatically received and recorded during your use of the Services or accessing the web pages, including without limitation to such data as IP address and records of the web pages you requested and/or accessed;
<br>11.1.3 本网站收集到的您在本网站进行交易的有关数据，包括但不限于交易记录；
<br>11.1.3 All data and information with respect to transactions you conduct on or through this Website and collected by the Website, including without limitation to trading records;
<br>11.1.4本网站通过合法途径取得的其他您个人信息。
<br>11.1.4 Your other personal information obtained by the Website in any lawful manner。
<br>11.2 信息使用
<br>11.2 Use of Information
<br>11.2.1除相关法律有相反规定或本协议条款和条件有相反约定外，您通过本网站发布或发送的所有信息均被视为非保密信息，我们有权为我们认为适当的目的而使用和披露任何此类信息，包括但不限于任何想法、概念、发明及专有技术等。
<br>11.2.1 Subject to applicable laws and terms and conditions of this Agreement, all information that you post on or send via the Website are deemed to have been communicated on a non-confidential basis, and we shall have the right to use and disclose any such information, including any ideas, inventions, concepts or know-how disclosed therein, for any purpose we consider fit.
<br>11.2.2 不需要您额外的同意，您在本网站注册成功即视为您同意我们收集并使用您在本网站的各类信息。您了解并同意，本网站可以将收集的您信息用作包括但不限于下列用途：
<br>11.2.2 Your successful registration with the Website constitutes your consent (without any other or further consent of yours) to our collection and use of all information you submitted to or through the Website. You understand and agree that we may use such information for any such purposes as:
<br>11.2.1.1 向您提供本网站服务；
<br>11.2.1 Providing the Services to you;
<br>11.2.1.2 基于主权国家或地区相关主管部门的要求或相关法律规定向相关部门进行报告；
<br>11.2.1.2 Filing reports to any sovereign country or competent authority upon request by such country or authority or as is required by any applicable law;
<br>11.2.1.3本网站将您的信息用于身份验证、客户服务、安全防范、诈骗监测、市场推广、存档和备份用途，或与第三方合作推广网站等合法用途；
<br>11.2.1.3 Your information may be used by the Website for identity verification, customer services, security safeguard, fraud monitor, market promotion, archives keeping and/or backups, or any other lawful purpose such as website promotion in cooperation with a third party；
<br>11.2.1.4 帮助我们设计新产品及服务，改善本网站现有服务；
<br>11.2.1.4 Helping the Website with the design of new products or services, or to improve the Services；
<br>11.2.1.5您同意本网站向您发送营销活动通知、商业性电子信息以及我们认为您可能感兴趣的各类广告；
<br>11.2.1.5 You hereby agree that we may send to you notices of any activity, commercial electronic information, and advertisements we think you might be interested in；
<br>11.2.1.6 本网站为完成合并、分立、收购或资产转让而将您的信息发送和披露给任何相关第三方；
<br>11.2.1.6 In the event of any merger, division, acquisition or asset transfer, the Website will send and disclose your information to any third party in concern；
<br>11.2.1.7 软件认证或管理软件升级；
<br>11.2.1.7 Software verification or upgrade of management software；
<br>11.2.1.8 邀请您参与有关本网站服务的调查；
<br>11.2.1.8 Inviting you to participate in any survey on the Services；
<br>11.2.1.9 用于和政府机关、公共事务机构、协会等合作的数据分析；
<br>11.2.1.9 Data analysis in cooperation with any governmental agency, public affair institution, association or any other entity; and
<br>11.2.1.10 用作其他一切合法目的以及经您授权的其他用途。
<br>11.2.1.10 For any and all other purposes permissible by applicable laws or authorized by you。
<br>11.2.2 本网站不会向其他任何人出售或出借您的个人信息，除非事先得到您的许可。本网站也不会在明知的情况下允许任何第三方以非法手段收集、编辑、出售或者无偿传播您的个人信息。
<br>11.2.2 The Website will not, unless obtaining your prior permission, sell or lend your personal information to any other person. The Website will not knowingly allow any third party to collect, edit, sell or disseminate (for free) your personal information in any unlawful manner.
<br>11.3 本网站对所获得的您的身份资料和交易信息等进行保密，不得向任何单位和个人提供您的身份资料和交易信息，但相关主权国家或地区法律法规、政令、命令等规定要求本网站提供的除外。
<br>11.3 The Website will keep confidential your identify information and trading information obtained by the Website, and shall not provide such information to any other entity or person except that such provision is requested by a sovereign country or region in concern or required by any applicable law, regulation, decree, order or otherwise.
<br>11.4 我们可能随时被要求依据加拿大《犯罪所得（洗钱）与恐怖融资法》及其他相关法律的规定向有权机关披露与用户及其帐户有关的信息。在此任何情况下，对于您或任何第三人因该披露行为而遭受的任何损失和损害，我们不承担任何责任。
<br>11.4 We may be required, from time to time, to disclose to competent authorities certain information about Users and their accounts in pursuance to the Proceeds of Crime (Money Laundering) and Terrorist Financing Act and other applicable laws. In any such case, we accepts no responsibility or liability whatsoever for any loss or damages incurred by you or any other person arising from or in connection with any such disclosure.
<br>12. 计算
<br>虽然所有计算方法都已经在网站上公示，且所有的交易计算结果都经过我们的核实，，但是我们不能保证网站的使用不会受到干扰，也不保证计算结果不存在误差。
<br>12. Computation
<br>All methods of computation are posted on the Website and all trading results are verified by us, but we cannot guarantee that use of the Website will not be interfered with or the computation results will be error-free.
<br>13. 出口控制
<br>您理解并承认，根据加拿大相关法律，您不得将本网站上的任何材料（包括软件）出口、再出口、进口或转移，故您保证不会主动实施或协助或参与任何上述违反法规的出口或有关转移或其他违反适用的法律和法规的行为；如发现此类情形，您须及时向我们报告并协助我们处理。
<br>13. Export Control
<br>You understand and agree that, pursuant to the laws of Canada, you are not allowed to export, re-export, import or transfer any material (software included) appearing on or in this Website, and therefore you guarantee that you will not voluntarily engage in, assist in or take part in any action that is in contravention of any applicable law or regulation in terms of such export or transfer or otherwise. In any such case, you must promptly report to and assist us in handling the situation.
<br>14. 转让
<br>本协议中约定的权利及义务同样约束各方的受让人、继承人、遗嘱执行人和管理人。未经我们事先同意，您不得将本协议部分或全部转让给任何第三人，但我们可随时将我们在本协议中的权利和义务转让给任何第三人，并给予您提前30天的通知。
<br>14. Assignment
<br>All contractual rights and obligations under this Agreement shall be binding upon each party’s assignee, heir or successor in law, will executor, and administrator of the estate. You shall not, without our prior consent, assign this Agreement in part or in while to any third party. However, we may from time to time transfer any of the rights or obligations under this Agreement to any third party with thirty (30) days’ notice to you.
<br>15. 可分割性
<br>如本协议中的任何条款被任何有管辖权的法院认定为不可执行的，无效的或非法的，并不影响本协议的其余条款的效力。
<br>15. Severability
<br>In the event that any provision of this Agreement is held by any court of competent jurisdiction to be unenforceable, invalid or illegal, such unenforceability, invalidity and illegality shall not in any manner affect or impair any other provision of this Agreement
<br>16. 非代理关系
<br>本协议中的任何规定均不可被认为创造了、暗示了或以其他方式将一方视为另一方的代理人、受托人或其他代表人，本协议有其他规定的除外。
<br>16. Non-agency
<br>Unless otherwise agreed upon by the parties under this Agreement, nothing contained herein shall constitute, create, imply or otherwise place a party hereto in the position as an agent, trustee or representative of the other party.
<br>17. 权利放弃
<br>本协议任何一方对追究本协议约定的违约责任或其他责任的弃权并不能被认定或解释为对其他违约责任的弃权；未行使或迟延行使任何权利或救济不得以任何方式被解释为对该等权利或救济的放弃。
<br>17. Waiver of Rights
<br>The waiver by a party hereto of a breach of any provision of this Agreement shall not operate or be construed as a waiver of any other breach. Failure or delay to exercise any right or to resort to any remedy shall not in any manner be construed as a waiver of that right or remedy.
<br>18. 标题
<br>所有标题仅为协议表述方便之用，不应据以认定本协议条款的含义或据以解释本协议内容。
<br>18. Headings
<br>The headings of provisions contained in this Agreement are for convenience only and shall not affect in any way the meaning of any provision or the construction and interpretation of this Agreement.
<br>19. 适用法律与争议解决
<br>本协议根据加拿大法律订立，其成立、效力、解释、内容、履行、执行、修订和终止均适用加拿大不列颠哥伦比亚省法律及适用于该省的加拿大相关法律；任何因或与本协议约定的服务有关而产生的索赔或诉讼，都应依照加拿大的法律进行管辖并加以解释和执行。为避免疑义，任何针对我们或者是和我们有关的索赔或诉讼的管辖法院或诉讼地均在加拿大，您无条件且不可撤销地同意不列颠哥伦比亚省高级法院及其他有管辖权的加拿大法院对相关诉讼的非排他性管辖权，并放弃援引不方便法院原则的权利。本网站其他业务对管辖有专门约定的，从其约定。
<br>19. Applicable Law and Dispute Settlement
<br>This Agreement is concluded and entered into in pursuance to the laws of Canada. Formation, validity, interpretation, contents, performance, enforcement, modification and termination of this Agreement, and all claims and lawsuits arising out of or in relation to the Services shall be governed by and construed in accordance with the laws of the Province of British Columbia and the laws of Canada applicable therein. For the avoidance of doubt, any and all claims or lawsuits against or involving us shall be litigated in a court of competent jurisdiction in Canada. You hereby unconditionally and irrevocably consent to the non-exclusive jurisdiction of the British Columbia Superior Court of Justice (or any other court of competent jurisdiction in Canada) and waive any objection based on forum non-convenience with respect to any such action or lawsuit, except as otherwise agreed upon by the parties hereto in terms of any other services provided by the Website.
<br>20. 协议的生效和解释
<br>20. Effectiveness and Interpretation of the Agreement
<br>20.1 本协议于您在本网站完成注册程序并获得本网站帐号和密码时生效，对本网站和您均具有约束力。
<br>20.1 This Agreement shall become effective upon completion of your registration with the Website and your obtaining a username and password from the Website, and shall be binding upon both you and the Website.
<br>20.2 本协议的最终解释权归本网站所有。
<br>20.2 The Website reserves the right of final interpretation with respect to terms and conditions of this Agreement.
<br>三、反洗钱和反恐怖融资政策
<br>III. Anti-Money Laundering and Anti-Terrorist Financing Policy
<br>1. 你了解、认可并同意，为反洗钱和/或反恐怖融资的目的，我们有权采取下列行动：
<br>1. You understand, acknowledge and agree that for the purposes of anti-money laundering and/or anti-terrorist financing we have the rights to:
<br>1.1对用户进行尽职调查和持续的监督;
<br>1.1 Conduct due diligence over the Users and keep constant monitor over their accounts;
<br>1.2 审查和定期检查已完成和正在发生的交易;
<br>1.2 Examine and review transactions (whether completed or in process) at regular intervals;
<br>1.3向主管当局报告可疑交易;
<br>1.3 Report suspicious transactions to competent authorities;
<br>1.4身份证明文件、地址证明文件和交易记录的证明文件将会保留至少六年，如被提交给有权机关，我们将不再另行通知您；
<br>1.4 All identity proof documents, address proof documents and trading records will be kept for at least six (6) years. If any of these documents is submitted to any competent authority, we will not give your any notice of such submission;
<br>1.5 整个交易过程中，信用卡被禁止使用。
<br>1.5 Use of credit cards is forbidden with respect to any part of the trading process.
<br>2. 身份信息与核实确认
<br>2. Identity Information and Verification and confirmation thereof
<br>2.1 身份信息
<br>2.1 Identity Information
<br>2.1.1 根据不同法域的不同规定及不同的实体类型，我们收集的您的信息内容可能不一致，原则上将向注册的个人收集以下信息：
<br>（a）个人基本信息：您的姓名，住址（及永久地址，如果不同） ，出生日期及国籍等可获得的其他情况;身份验证应提供官方或其他类似权威机构发放的文件，比如护照，身份证或其他身份证明文件;您提供的地址将使用适当的方法进行验证，比如检查乘用交通工具的票据或检查选民登记册等;
<br>（b）有效的照片：在您注册之前，您须提供您将您的身份证件放在胸前的照片；
<br>（c）联系方式：电话/手机号码和/或有效的电子邮件地址。
<br>2.1.1 The information we collect about you may vary pursuant to laws and regulations of different jurisdictions and dependent on what kind of entity you are. In principle, if you are an individual, we collect the following information about you:
<br>(a) Basic personal information: your full name, address (and permanent address, if your current address differs from your permanent address), date of birth, nationality and other obtainable personal information; identity verification requires you to provide and submit verification documents such as passports and ID cards issued by a competent authority; the address you provided will be certified by examining public transport tickets or the register of votes or in any other appropriate manner;
<br>(b) Valid photograph: before the registration, you must provide us with a photograph of you with your ID card or other identity document held by you in front of your chest; and
<br>(c) Contact information: phone number or mobile phone number, and/or valid email address.
<br>2.1.2如果您是一家公司或其他合法实体，我们将收集以下信息以确定您及本网站帐户的最终受益人：
<br>（a）公司注册、登记证；公司的章程与备忘录副本；公司的股权结构和所有权说明的详细证明材料，证明决定本网站账户的开立以及执行的授权委托人的董事会决议；按照要求需要提供的公司董事、大股东及本网站账户有权签字人的身份证明文件；该公司的主要营业地址，如果与公司的邮寄地址不同，提供邮寄地址。如果公司在本地的地址与它的主要营业地址不一致的，则被视为风险较高的客户，需要提交额外附加文件;
<br>（b）根据不同法域的不同规定及不同的实体类型，我们要求提供的其他认证和有权机关发布的文件以及我们认为必要的文件。
<br>2.1.2 If you are a company or other legal entity, we will collect the following information about you to ascertain the final beneficiary of you and of the account on the Website:
<br>(a) Certificate of incorporation, a copy of articles of association and memorandum of association, poof documents for share structure and ownership, resolution of the board of directors concerning the appointment and authorization of an agent for the purposes of opening and managing a SLB account, proof documents for identity of the directors, major shareholders and the authorized signatory with respect to the account (if so requested), address of principal place of business (and mail address, if the principal place of business differs from the mail address); any company whose local address is different from the address of its principal place of business will be deemed a client of high risks and shall provide extra documents;
<br>(b) Other verification documents, official documents issued by competent authorities and such documents as deemed necessary by us in pursuance to different jurisdictions and dependent on what kind of entity you are.
<br>2.1.3 我们只接受英语版本或汉语版本的信息和文件，如不是，您需将相关信息和文件翻译成英文的版本并加以公证。
<br>2.1.3 We only accept information and documents in English and/or in Chinese. In any other case, you need to have the information and/or documents translated into English, and then have the English version notarized.
<br>2.2确认核实
<br>2.2 Confirmation and Verification
<br>2.2.1我们要求您提供身份证明文件的全部页面内容。
<br>2.2.1 You are required to submit all pages of the identity proof documents.
<br>2.2.2 我们要求您提供您将您的身份证明文件放在您胸前的照片。
<br>2.2.2 You are required to submit a photograph of you with your identity proof document held by you in front of your chest.
<br>2.2.3证明文件的副本一般应核和原始凭证进行核对。然而，如果某个可信赖的合适的认证人已证明该副本文件是原始文件准确而全面的复制件，该副本可接受。这样的认证人包括大使、司法委员、地方治安官等。
<br>2.2.3 Copies of a proof document shall be verified against the original copy of that document. Notwithstanding the foregoing, a copy is acceptable if it has been duly certified by a reliable and competent person (such as the ambassador, judicial commissioner, and the local sheriff) as a true and intact copy of the original.
<br>2.2.4 识别最终受益人和账户控制权的要求是确定哪些个人最终拥有或控制本网站用户，和/或确定正在进行的交易是由他人代为执行。如果是企业，则大股东的身份应被验证。一般而言，持股5%及以上的股东须进行身份验证。
<br>2.2.4 Identifying the final beneficiary or controlling person of a User is to ascertain who the owner or in ultimate control of the User is, or that the transaction in process is conducted by a person on behalf of the User. In the case of an enterprise, the identity of major shareholders shall be verified. In general, identity of shareholders holding five percent (5%) or more of the total shares of the enterprise must be verified.
<br>3. 监控交易
<br>3. Transaction Surveillance
<br>3.1 我们根据安全性和实际交易情况不时设置和调整日常交易和提币最高限额。
<br>3.1 We set and adjust, from time to time, the maximum amount in value for daily transaction and for withdrawal of digital currencies depending on security requirement and details of actual transactions.
<br>3.2如果交易频繁集中发生在某个注册用户或存在超乎合理的情况，我们将评估并决定相关交易是否可疑。
<br>3.2 If transactions take place frequently and are concentrated with respect to any registered user or if there exists a certain unreasonable situation, we will evaluate the transactions and/or situation and determine whether such transactions are suspicious.
<br>3.3若我们凭借自身的判断认定存在可疑交易情形，我们可能会采取暂停该交易、拒绝该交易等限制性措施，甚至如果可能将尽快逆转该交易，同时向有权机关报告，但不会通知您。
<br>3.3 If, in our sole judgment, we believe that a certain transaction is suspicious, without notice to you we may take such restrictive measures as suspending or declining the transaction or may even reverse the transaction as soon as practicably possible, and report the transaction to competent authorities.
<br>3.4我们有权拒绝来自于不符合国际反洗钱或反恐怖融资标准的法域的人或可被视为政治公众人物的人的注册申请；我们有权随时暂停或终止我们认为可疑的交易；您认可并同意，我们这样做并不违反对您的任何义务和责任。
<br>3.4 We shall have the right to decline any registration by people from a jurisdiction where international anti-money laundering standards or anti-terrorist financing standards are not met or by a person who might be deemed as a public political figure, and to suspend or terminate from time to time any and all transactions which in our sole judgment are suspicious. You hereby acknowledge and agree that none of the foregoing actions by us will constitute default by us on any obligation or duty.
<br>
<br>
<br>
<br>`;

export default React.memo( function( props )
{
	return <View style = { styles.wrapper }>
		<Text style = { styles.overlay } onPress = { props.hide } />
		<View style = { { width: SCREENWIDTH, height: SCREENHEIGHT, backgroundColor: "#eee" } }>
		<WebView
			containerStyle = { { padding: 20 } }
			source = { { html: html } }
		/>
		</View>
	</View>
} );
