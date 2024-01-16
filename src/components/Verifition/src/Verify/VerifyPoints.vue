<template>
    <div style="position: relative">
        <div class="verify-img-out">
            <div
                :style="{
                    width: setSize.imgWidth,
                    height: setSize.imgHeight,
                    'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
                    'margin-bottom': vSpace + 'px'
                }"
                class="verify-img-panel"
            >
                <div v-show="showRefresh" class="verify-refresh" style="z-index: 3" @click="refresh">
                    <i class="iconfont icon-refresh"></i>
                </div>
                <img
                    ref="canvas"
                    :src="'data:image/png;base64,' + pointBackImgBase"
                    alt=""
                    style="display: block; width: 100%; height: 100%"
                    @click="bindingClick && canvasClick($event)"
                />

                <div
                    v-for="(tempPoint, index) in tempPoints"
                    :key="index"
                    :style="{
                        'background-color': '#1abd6c',
                        color: '#fff',
                        'z-index': 9999,
                        width: '20px',
                        height: '20px',
                        'text-align': 'center',
                        'line-height': '20px',
                        'border-radius': '50%',
                        position: 'absolute',
                        top: tempPoint.y - 10 + 'px',
                        left: tempPoint.x - 10 + 'px'
                    }"
                    class="point-area"
                >
                    {{ index + 1 }}
                </div>
            </div>
        </div>
        <!-- 'height': this.barSize.height, -->
        <div
            :style="{
                width: setSize.imgWidth,
                color: barAreaColor,
                'border-color': barAreaBorderColor,
                'line-height': barSize.height
            }"
            class="verify-bar-area"
        >
            <span class="verify-msg">{{ text }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
/**
 * VerifyPoints
 * @description 点选
 * */
import { resetSize } from './../utils/util';
import { aesEncrypt } from './../utils/ase';
import { reqGet, reqCheck } from '@/api/login';
import { useI18n } from 'vue-i18n';
import { getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { ComponentInternalInstance } from 'vue';
import { ComponentPublicInstance } from 'vue';

// 定义父组件暴露属性类型
interface ParentComponentInstance extends ComponentPublicInstance {
    clickShow: boolean;
    closeBox: () => void;
}

interface PointType {
    x: number;
    y: number;
}

interface SizeType {
    width: string;
    height: string;
}

interface Props {
    //弹出式pop，固定fixed
    mode: string;
    captchaType: string;
    //间隔
    vSpace: number;
    imgSize: SizeType;
    barSize: SizeType;
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'fixed',
    captchaType: '',
    vSpace: 5,
    imgSize: () => ({ width: '310px', height: '155px' }),
    barSize: () => ({ width: '310px', height: '40px' })
});

const { t } = useI18n();
const { mode, captchaType } = toRefs(props);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
let secretKey = ref(''), //后端返回的ase加密秘钥
    checkNum = ref(3), //默认需要点击的字数
    fontPos = reactive([]), //选中的坐标信息
    checkPosArr = reactive<PointType[]>([]), //用户点击的坐标
    num = ref(1), //点击的记数
    pointBackImgBase = ref(''), //后端获取到的背景图片
    poinTextList = reactive<Array<string>>([]), //后端返回的点击字体顺序
    backToken = ref(''), //后端返回的token值
    setSize = reactive({
        imgHeight: 0,
        imgWidth: 0,
        barHeight: 0,
        barWidth: 0
    }),
    tempPoints = reactive<PointType[]>([]),
    text = ref(''),
    barAreaColor = ref(''),
    barAreaBorderColor = ref(''),
    showRefresh = ref(true),
    bindingClick = ref(true);

const init = () => {
    //加载页面
    fontPos.splice(0, fontPos.length);
    checkPosArr.splice(0, checkPosArr.length);
    num.value = 1;
    getPictrue();
    nextTick(() => {
        let { imgHeight, imgWidth, barHeight, barWidth } = resetSize(proxy);
        setSize.imgHeight = imgHeight;
        setSize.imgWidth = imgWidth;
        setSize.barHeight = barHeight;
        setSize.barWidth = barWidth;
        proxy?.$parent?.$emit('ready', proxy);
    });
};
onMounted(() => {
    // 禁止拖拽
    init();
    // 对于需要赋值，又包含可选链的 可以对不确定的进行类型断言
    (proxy as ParentComponentInstance).$el.onselectstart = function () {
        return false;
    };
});
const canvas = ref<HTMLImageElement>();
const canvasClick = (e: MouseEvent) => {
    checkPosArr.push(getMousePos(canvas.value, e));
    if (num.value == checkNum.value) {
        num.value = createPoint(getMousePos(canvas.value, e));
        //按比例转换坐标值
        let arr = pointTransfrom(checkPosArr, setSize);
        checkPosArr.length = 0;
        checkPosArr.push(...arr);
        //等创建坐标执行完
        setTimeout(() => {
            // var flag = this.comparePos(this.fontPos, this.checkPosArr);
            //发送后端请求
            let captchaVerification = secretKey.value
                ? aesEncrypt(backToken.value + '---' + JSON.stringify(checkPosArr), secretKey.value)
                : backToken.value + '---' + JSON.stringify(checkPosArr);
            let data = {
                captchaType: captchaType.value,
                pointJson: secretKey.value
                    ? aesEncrypt(JSON.stringify(checkPosArr), secretKey.value)
                    : JSON.stringify(checkPosArr),
                token: backToken.value
            };
            reqCheck(data).then(res => {
                if (res.code == 0) {
                    barAreaColor.value = '#4cae4c';
                    barAreaBorderColor.value = '#5cb85c';
                    text.value = t('captcha.success');
                    bindingClick.value = false;
                    if (mode.value == 'pop') {
                        setTimeout(() => {
                            (proxy?.$parent as ParentComponentInstance).clickShow = false;
                            refresh();
                        }, 1500);
                    }
                    proxy?.$parent && proxy.$parent.$emit('success', { captchaVerification });
                } else {
                    proxy?.$parent && proxy.$parent.$emit('error', proxy);
                    barAreaColor.value = '#d9534f';
                    barAreaBorderColor.value = '#d9534f';
                    text.value = t('captcha.fail');
                    setTimeout(() => {
                        refresh();
                    }, 700);
                }
            });
        }, 400);
    }
    if (num.value < checkNum.value) {
        num.value = createPoint(getMousePos(canvas.value, e));
    }
};
//获取坐标
const getMousePos = function (obj: HTMLImageElement | undefined, e: MouseEvent): PointType {
    let x = e.offsetX;
    let y = e.offsetY;
    return { x, y };
};
//创建坐标点
const createPoint = function (pos: PointType) {
    tempPoints.push(Object.assign({}, pos));
    return num.value + 1;
};
const refresh = async function () {
    tempPoints.splice(0, tempPoints.length);
    barAreaColor.value = '#000';
    barAreaBorderColor.value = '#ddd';
    bindingClick.value = true;
    fontPos.splice(0, fontPos.length);
    checkPosArr.splice(0, checkPosArr.length);
    num.value = 1;
    await getPictrue();
    showRefresh.value = true;
};

// 请求背景图片和验证图片
const getPictrue = async () => {
    let data = {
        captchaType: captchaType.value
    };
    const res = await reqGet(data);
    if (res.code == 0) {
        pointBackImgBase.value = res.data.originalImageBase64;
        backToken.value = res.data.token;
        secretKey.value = res.data.secretKey;
        poinTextList = res.data.wordList;
        text.value = t('captcha.point') + '【' + poinTextList.join(',') + '】';
    } else {
        text.value = res.msg;
    }
};
//坐标转换函数
const pointTransfrom = function (pointArr: PointType[], imgSize: typeof setSize): PointType[] {
    let newPointArr = pointArr.map(p => {
        let x = Math.round((310 * p.x) / imgSize.imgWidth);
        let y = Math.round((155 * p.y) / imgSize.imgHeight);
        return { x, y };
    });
    return newPointArr;
};

defineExpose({
    refresh
});
</script>
