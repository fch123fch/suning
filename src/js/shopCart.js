import $ from './lib/jquery.esm.js';
import cookie from './lib/cookie.js';
//从cookie中拿到在详情页中存储的商品 id 和 商品 num
let shop = cookie.get('shop');
shop = JSON.parse(shop);
//获得所有的id 
let idList = shop.map(el => el.id).join();
// 通过ajax请求 请求到商品数据 进行页面渲染
$.ajax({
        type: "get",
        url: "../interface/getShop.php",
        data: { idList },
        dataType: "json",
    })
    .then(res => {
        // console.log(res);
        let template = '';
        res.forEach(el => {
            let current = shop.filter(elm => elm.id === el.id);
            template += ` 
            <div class="item-main">
            <div class="td-chk">
            <div class="cart-checkbox">
                <input type="checkbox" class="check">
                <label for=""></label>
            </div>
        </div>
        <div class="td-item">
            <div class="item-pic">
                <img src="${el.picture}">
            </div>
            <div class="item-info">
                <a class="item-title">
        ${el.title}
      </a>
            </div>
            <div class="td-specs">
                <div class="specs-line">
                    <p tabindex="0">型号颜色：小米手环6【NFC版】</p>
                </div>
            </div>
            <div class="td-price">
                <div class="specs-line">
                    <span class="price-now">
          <i>¥</i><em>${(+el.price).toFixed(2)}</em>
        </span>
                    <div class="price-line">
                        <span class="icon-promo-price">促销价</span>
                    </div>
                </div>
                <div class="td-amount">
                    <div class="item-amount">
                        <a href="#" class="minus">-</a>
                        <input type="text" class="ui-text text-amount" autocomplete="off" data-max="98" data-min="1" value="${current[0].num}" maxlength="2">
                        <a href="#" class="plus">+</a>
                    </div>
                </div>
            </div>
            <div class="td-sum">
                <b class="sn-price">
       <em class="sum">${(el.price * current[0].num).toFixed(2)}</em></b>
            </div>
            <div class="td-op">
                <a href="#">移入关注</a>
                <a href="#" class="remove" data-id="${el.id}">删除</a>
            </div>
        </div>
        </div>
        `
        });
        $('.item').html(template);
        // 实现删除 
        // 通过判断当前商品id在shop中的id 筛选中 不是当前id的商品
        $('.remove').on('click', function() {
            let res = shop.filter(el => el.id != $(this).attr('data-id'));

            // 将筛选后的商品结果 重新设置到cookie中
            cookie.set('shop', JSON.stringify(res));

            // 刷新 实现  筛选商品的渲染  从而删除当前需要删除的商品
            location.reload();
        })

        //计算结算的总价


        $('.check').on('click', function() {
            // 获得当前结算位置的价格
            let sum = parseInt($('.total').text());
            // 判断是否有select class属性
            if ($(this).parents('.item-main').hasClass('select')) {
                $(this).parents('.item-main').removeClass('select')
                sum -= parseInt($(this).parents('.item-main').find('.sum').text());
                console.log(parseInt($(this).parents('.item-main').find('.sum').text()));
            } else {
                $(this).parents('.item-main').addClass('select');
                sum += parseInt($(this).parents('.item-main').find('.sum').text());
                console.log(parseInt($(this).parents('.item-main').find('.sum').text()));
            }

            // 结算价格
            $($('.zprice').next()).text(sum)
        })

        //  点击按钮增加或减少
        $('.item-main').on('click', '.plus', function(ev) {

            //获得当前选中的需要结算的商品的价格
            let sum1 = parseInt($('.total').text());

            // 判断当前这个商品是否被选中
            if ($(ev.target).parents('.item-main').hasClass('select')) {

                // 叠加当前需要结算商品的总价格
                sum1 += parseInt($(ev.target).parents('.item-main').find('.price-now>em').text());

                // 设置当前结算的价格
                $($('.zprice').next()).text(sum1)
            }

            // 设置当前 减少 按钮从禁止点击 到可以点击
            $($(ev.target).prevAll('.minus')).css('cursor', 'pointer');

            // 获得当前商品已添加的数量
            let count = $($(ev.target).prev()).val();

            // 点击增加按钮后 增加数量 改变当前数量的显示
            $($(ev.target).prev()).val(++count);

            //小计价格
            $(ev.target).parents('.td-price').next().find('em').text($($(ev.target).prev()).val() * parseInt($(ev.target).parents('.td-amount').prev().find('em').text()))
        });

        // 点击减少 按钮
        $('.item-main').on('click', '.minus', function(ev) {

            //获得当前选中的需要结算的商品的价格
            let sum1 = parseInt($('.total').text());
            if ($(ev.target).parents('.item-main').hasClass('select')) {
                // 判断当前需要结算的价格是否小于等于 0  小于等于0时 则不能继续减少当前总结算价格
                if (sum1 <= 0) {
                    sum1 = 0;
                }
                sum1 -= parseInt($(ev.target).parents('.item-main').find('.price-now>em').text());
                $($('.zprice').next()).text(sum1)
            }
            //获得当前商品在购物车中的数量
            let count = $($(ev.target).next()).val();

            // 当商品数量大于1时 进行 右边小计的计算
            if (count > 1) {
                $($(ev.target).next()).val(--count);
                $(ev.target).parents('.td-price').next().find('em').text($($(ev.target).next()).val() * parseInt($(ev.target).parents('.td-amount').prev().find('em').text()));
            } else {

                // 设置当前 减少按钮 禁用图标显示 不可以在被点击
                $(this).css('cursor', 'no-drop');
                $(this).off();
            }
        })

        // 全选
        $('.AllCheckBox').on('click', function() {

            //全选后计算 结算价格  先trigger后有效果 不先执行的话 复选框没有勾选显示
            $('.check').trigger('click');

            //  通过全选按钮的 选中状态 为所有选项框 添加 选中对应的选中状态 实现全选和不全选
            $('.item').children().find('.check').prop('checked', $(this).prop('checked'));
            $('.AllCheckBox').prop('checked', $(this).prop('checked'));

            //已选商品的数量显示
            //判断是否全选
            if ($('.AllCheckBox').prop('checked')) {

                // 全选则 显示已勾选的商品总数
                $('.select-goods>b').text($('.check').length);
            } else {

                //不全选 则为0
                $('.total').text('0.00');
                $('.select-goods>b').text('0');
            }
        });

        // 一个未选中 取消全选的勾选状态
        $('.item').on('click', '.check', function() {
            // 点击勾选 进行 已选商品的数量显示
            $('.select-goods>b').text($('.select').length);
            $('.AllCheckBox').prop('checked', allCheck());
        })

        // 判断当前所有的复选框是否都被选中 是则返回true 
        function allCheck() {
            let items = $('.item').children().find('.check');
            let res = Array.from(items);
            return res.every(el => $(el).prop('checked'));
        }

    }).catch(xhr => {
        console.log(xhr.status);
    })


// 导航栏二级菜单下拉

$('.hover-box').on('mouseenter', function() {
    $(this).children('div').delay(100).show(100);
    $(this).children('a').addClass('header-active-hover');
})
$('.hover-box').on('mouseleave', function() {
    $(this).children('div').delay(100).hide(100);
    $(this).children('a').removeClass('header-active-hover');
})