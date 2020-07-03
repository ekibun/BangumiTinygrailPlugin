/*
 * Bangumi娘话语
 *
 * @Author: czy0729
 * @Date: 2019-06-09 20:04:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-20 16:28:43
 */
const speech = [
  '"啊 欢迎回来 主人！"虽然想这么说，但这种做作的语气只会让我想用钢丝勒断说话人的脖子。',
  'All is fair in love and war.『恋爱和战争都要公平』哪门子话啊。',
  '『AUG』(陆军通用步枪)要念成『auge』。只有这点绝对不妥协。那才奇怪。',
  '『为了正义而战』嘴巴上这么说着、终究、是为了自己所理想的人类群像…是这样吧。',
  '『以我的形象造人統御萬物』這就是最大的失敗吧。造出惡魔的到頭來也是神。被飼養的狗咬到手、也叫做『全知全能』、真是令人失笑呢。',
  '『即使汝的快乐达到极致，也一样空虚』既然如此，为什么还要活下去呢？',
  '『大抵人生的意义建立在活动之上、　没有活动而生存形同死亡』植物人有意义吗？虽然也不是不了解家族期待奇迹发生的心情。昏迷不醒…躺在病床上、靠机器维持生命、我一点都不想要。',
  '『如果你真的信服我所說的、　就把兒子以撒燒死獻給我吧』這種神居然還會被相信呢。真是惡劣的玩笑啊。真的去實行的亞伯拉罕也很讓人質疑。客觀來看、『因為有神的喻告、才把兒子給殺了』是這樣吧。',
  '『爱你的邻人』 所谓邻人、只有限定神的信徒呢。如果不是神的信徒，连鸟兽都不如吧。',
  '『现在你必从这地受咒诅你必流离飘荡在地上』神对犯了罪的该隐这么说。………『于是该隐离开耶和华的面去住在伊甸东边挪得之地该隐与妻子同房』………完全没有在流离飘荡。…怎样都好、别再朗诵圣经了。…？',
  '『生生谓之易』没有生的话就没有死…没有死的话就没有生…死才赋予了人生紧张感与生命的价值。我是这么认为的。嗯…',
  '『见佛杀佛　见祖杀祖　见罗汉杀罗汉』禅吗？统统杀光光…真厉害的领悟啊…',
  '不可以为了悲伤而摧残自己。死人已死。人生是为了活着的人而存在的。',
  '不可以随便握住门把。啊？不知道会被装上什么机关喔。………',
  '不求回报的行为是不存在的。『为了你』的这种说法、是诈欺的常用句喔。',
  '不管是什麽敌人恶人或是组织构成员都是有家人的…',
  '不要为了将来烦恼。做好现在所该做的事。',
  '不靠医生就活不下去的家伙没有活下去的必要。',
  '世界是美丽的。必要的只有能看得见的眼睛。',
  '为了自己相信的宗教、去迫害其他宗教的信徒、有必要如此吗？『不承认自己以外的神』、因为神自己都这么说了、也没办法吧。说起来、神也说过自己是『嫉妒者』呢。',
  '为什麽、这本漫画里的枪会有瓦斯注入口呢？这也算是一种…忠於实物的画法吧。',
  '之所以爱人、是因为自身的欲望、而不是欲望的对象。没有那回事喔…',
  '人类、必然有死亡的时刻。只是、到此之前的时间是长…还是短…如此而已。',
  '人类会为了自己的行为找到任何理由。为了罪恶找到任何辩解。为了安全找到任何借口。但只有一样绝对不会拿出来的东西。那就是自己的懦弱。',
  '仅仅铜40克 锌25克 镍15克 害羞5克 再加上恶意97公斤就能炼成对你的攻击了，顺带一说，害羞什么的是在撒谎哟。',
  '从创世记中亚当的族谱来计算、亚当被创造时大约是六千年前。縄文时代啊。縄文人使用土器和石器生活时、亚当和夏娃却过着很原始的生活呢。话说回来、不是最初的人类吗？表示在那之前是猴子吧。不对吧。',
  '你将遇到的不幸、是你所蹉跎时间的报应。',
  '你知道吗，那些重复条目被我发现了以后会有怎样惨绝人寰的命运~☆',
  '再敢把鼠标往那个地方移动一次看看，这次可就不是坏一俩个硬盘的问题了。',
  '别为将来烦恼。做好现在所该做的。过一天算一天？难得的名句被…',
  '动物的生命比人类的生命轻吗？',
  '勒住脖子的话、大约5秒后会无力化、20秒后失神、 3分以上会造成死亡。又在说那种话…虽然个体间也会有差别、万一有必要的时候…别照做啊。',
  '十岁左右时我逃离了、从二千年前的过去开始明明毫不思考的不断重复着相同行为、却自称灵长类的蠢货们的脚下。唔…',
  '即使是别人要求而做的事、最後决定的还是自己。你是用自己的意志决定怎麽行动的吧？',
  '只有杀戮不该教给小孩。如果告诉全世界的小孩这就是正义而教导他们杀戮的话、迟早世界上的人类会灭亡吧。',
  '吃下智慧果实的亚当和夏娃、被赶出了乐园。…所以、没有吃下去的人现在也还住在地上的乐园是吧。',
  '啊、我稍微离席一下喔。………好了、让您久等了。怎么、厕所吗？才不是。…还有那些话、请说的有气质一点。好啦…『去埋地雷吗？』像这样说。…气质？',
  '在咱的心里「荡」比熟悉的「萌」还要更高一筹，作为肩负了次世代的敏感词汇而备受期待……',
  '在外面用餐的时候、请尽量不要坐靠窗的位置喔。………窗外或许会有爆炸也说不定。希望这个玩笑题材、能永远只是个玩笑啊…',
  '好人的特质、跟天上的神很相似。第一、可以倾诉喜悦。第二、可以倾诉不平。第三、可以有也可以无。',
  '如果是住在公寓的二楼之类高的地方的话、准备好坚固的绳子万一的时候或许会有用。然后、因为被谁发现的话可能会被误解…。要好好藏起来啊。如果紧急时不能马上拿出来用那就没有意义了…',
  '如果有一个很麻烦的情敌，又不想使用暴力，那就先想办法和她成为朋友吧，接下来的事情，大家心里都明白……',
  '宗教就像大河。随着离源头越远、就不断的越来越被污染。源头本身就很肮脏的情况也很常见。',
  '对所爱的人尽可能的宽容。对其余的人尽可能的严苛。能做到的话就是独当一面的人了。那麽、我已经独当一面了呢。你有对谁宽容吗？咦、啊…',
  '对神而言、人是失败作吗？或者、对人而言、神是失败作呢？',
  '就像想睡的人需要睡眠、濒死的人也需要死亡。抵抗是错误以及无谓的难道无法理解吗。',
  '必须守护的东西多的人容易操纵真是方便啊。',
  '怒首领蜂的子弹、为什麽也会打中地面上的敌人呢？因为纵端很长。咦？',
  '恩？你问我上次那个问我三围的用户去哪里了？他 转 学 了。',
  '悠闲的途中下车旅行…啊？坐过站要补票、中途下车却不能退费、很令人难以接受呢。',
  '想到被送进卫星二号、打上宇宙的莱卡犬、我的不幸只是微小的东西。有什么不满的地方吗？…托你之福。',
  '想要照自己的意思去掌控…尚存有自我的他人只是傲慢。',
  '意外的、打扮显眼的人反而不容易遇上色狼。你应该不用担心吧。…这是什么意思呢？',
  '我们之所以前来是为了我们的子孙。决不是为了被金权污染的上司。就算我们的子孙否定我们、我们也必须遂行作战。那是为了保护故乡的恋人以及未来将来临的子孙。还真有先见之明啊…',
  '我头上的天线虽然接收信号的能力还不太明确，那个弧线的造型用来切开尸体可是非常顺手的呢。',
  '我妻由乃，小神晶，拉克丝，历史一次次告诉我们：粉红切开里面都是黑的。嗯？你干吗盯着我的头发看呢……',
  '所谓『命运』、只是马後炮的预言。在发生过什麽之後就可以这样说…『这就是命运』…',
  '所谓历史、是人类的血汇集成的河。正义与心理…不过是被那条河所附加的名词。所谓『正义必胜』、只是胜利的人、自称为正义而已。',
  '所谓威严、就像别人寄放的钱包、只能注意不可以遗失、绝对不可以拿来用。会失去信用喔。真正的威严、不用去注意也会自然散发出来的。真想成为那样的存在啊。',
  '把年糕的肚皮用锋利的小刀轻轻划开，然后放入240度的油锅中煎炸，那种滋滋的声响真是美妙极了~☆',
  '擅于讨好的人或许不会被憎恶。取而代之的、是侮蔑。就算不会生气、也不代表是温和的人。',
  '據創世紀第一章、第三天創造了植物、第四天才創造了太陽呢。還沒有太陽就先創造出植物嗎、那個胡來的傢伙。在那之前好像就已經有光了…光源是什麼呢？',
  '无法自我批判与改革、无法自己思考的人、没有生存的必要。',
  '既然死後有乐园在等着、为什麽不早早死一死呢？…',
  '智者生存…愚者死亡…差别创造出平等。',
  '有可以说的故事、有可以说的对象。光这样人生就还值得留恋。',
  '未成年人不管做了什么、都会被认为是父母的责任。周围的人指责父母、父母责备自己…周围的人是因为需要一个理由、父母则错认为小孩总是在自己的庇护下。其实根本也没有真正去了解小孩…',
  '札拉曼达、是『缘』的意思啊。因为是红色的还以为是火蜥蜴呢。潜水艇不会那样取名吧。会溺水的潜水艇吗…',
  '来吧、从一开始就安排好的剧情不存在、开始游戏吧。虽然我觉得本篇也不坏…',
  '根據創世紀第一章、第三天創造了植物、第四天才創造了太陽呢。還沒有太陽就先創造出植物嗎、那個胡來的傢伙。在那之前好像就已經有光了…光源是什麼呢？',
  '模拟人生这个游戏，最大的乐趣果然是把人活活淹死在游泳池里，或是用家具把熟睡的人围起来吧。',
  '模拟飞行里面出现了最新的兵器呢。是啊。像是集束炸弹、燃料空气炸弹这些…在游戏里面、不怎麽好用呢。因为目标是点状散布的。像钻地炸弹有哪里可以拿来用的呢？空战奇兵4的最後一关。直接冲进去还比较快。',
  '死去的人不需要花。被花所拯救的是留下来的人。',
  '汝啊，烦恼什么呢，不过对于如此狭小的器量，以咱的才能也无计可施了呢。',
  '玩惯KUDRYAVKA X之後、像闪电风暴或零式战机2之类的反而不会玩了。跟按钮的位置也有关系吧。好几次想要转动画面…,那个旋转的方法实在是…还有、第七关的魔王…',
  '疼痛让思考明晰。',
  '看了『LEON』这部电影…怎么了？又要说、是职业杀手的话应该要…之类的？不是的。因为那株盆栽不耐寒、种在外面的话冬天会枯掉。',
  '美国的恐怖电影、我觉得不怎么可怕呢。几乎都是、主角自己捅出的篓子自己来收拾而已。难以移入感情吗？…因为多半是肢解(Supuratta)类型的片子对吧？嗯？',
  '羡慕我那个电视坐垫柔软可爱的人们，都是些没拉开它后面拉链，看到它里面真相的天真阿宅们。',
  '藐视自己的人、必然在同时、也尊敬着身为藐视者的自己。',
  '虽然说不上是最喜欢的水果，不过那种把香蕉一口咬成两断的满足感，果然是最高啊。',
  '虽然问的很突然、你有手电筒吗？万一的时候很有用的、如果没有去买一个如何呢？还有、收音机和打火机也是。就算不吸烟带着打火机也不会没用喔。',
  '话说回来、汝喜欢怎么样的铁丝网设计呢？突然、在问什么啊…',
  '过去和便宜的书一样。读完了就可以丢掉。',
  '还活着时胡思乱想、烦恼死後的事简直无聊至极。为了能含笑九泉而活吧。',
  '那个…这种时候该说什麽好呢…啊？对了…………对不起了。你不是在笑吗！',
  '隔壁的邻居、逐步在配备F-15K了呢、F-4、F-5实在是跟不上了吧？虽然F5好像还在现役。',
  '非要去找出他人的缺点…来确认自己比较优秀不这样做就无法安心吗？在对谁说话啊？',
  '首先、低头自省。要开口也在那之后。看了法律节目后、真的会那样想呢。',

  // 191214 update
  '我今日就要带佢走，我睇下边个够胆拦我。',
  '我是要成为海贼王的女人。',
  '原来是个战斗力只有五的垃圾。',
  '就凭你是无法打败我的。',
  '数据库检索中……啊，烧毁了～☆',
  '祈祷中～☆',
  '突然想吃炒年糕呢～☆',
  '哭泣的小孩，最讨厌了～',
  '你知道上次问我三围的用户去哪里了么?',
  '一遍、死んで见る？',
  '姐姐抱，虽然没有料，但体温还是有的哟～',
  '吃了好多人心，现在还没消化～',
  '世界上没有绝对的真理，只有相信真理的人。',
  '锵锵～☆',
  '呜咕……',
  '叮咚～',
  '咪啪～',
  '喵苗～☆',
  '不许吃我豆腐哦～',
  '保持沉默～',
  '喔咧哇，刚达姆～',
  '今天一天也要精神抖擞～☆',
  '大家都说粉红里面是黑的，哼！',
  '午安~ 午饭是全家便当',
  '想要忏悔么？100円一次～',
  '嘿咻嘿咻，每天一百个仰卧起坐～',
  '是要舔眼球呢，还是说除此以外的所有柔软的地方呢，二选一',
  '再也不想见到年糕',
  '那个…这种时候该说什麽好呢…啊？对了…………对不起了。你不是在笑吗！',
  '吃炸弹吃炸弹吃炸弹吃炸弹吃炸弹吃炸弹吃炸弹！',
  '你知道吗，BGM在打一桌很大的牌～'
]

export const randomSpeech = () => {
  const { length } = speech
  const index = Math.floor(Math.random() * (0 - length) + length)
  return speech[index]
}

export default speech
