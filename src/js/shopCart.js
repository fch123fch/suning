import $ from './lib/jquery.esm.js';
import cookie from './lib/cookie.js';

let shop = cookie.get('shop');
shop = JSON.parse(shop);
console.log(shop);
let idList = shop.map(el => el.id).join();

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
                <input type="checkbox">
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
        $('.remove').on('click', function() {
                let res = shop.filter(el => el.id != $(this).attr('data-id'));
                console.log(res);
                cookie.set('shop', JSON.stringify(res));
                location.reload();
            })
            //  点击按钮增加或减少
        $('.item-main').on('click', '.plus', function(ev) {
            // console.log($(ev.target).prevAll('.minus'));
            $($(ev.target).prevAll('.minus')).css('cursor', 'pointer');
            let count = $($(ev.target).prev()).val();
            $($(ev.target).prev()).val(++count);
            // console.log($('.price-now>em').text());
            $('.sn-price>em').text($($(ev.target).prev()).val() * parseInt($('.price-now>em').text()))
        });
        $('.item-main').on('click', '.minus', function(ev) {
                // console.log($(ev.target).prev());
                let count = $($(ev.target).next()).val();
                if (count > 1) {
                    $($(ev.target).next()).val(--count);
                    $('.sn-price>em').text($($(ev.target).next()).val() * parseInt($('.price-now>em').text()))
                } else {
                    // $(this).addClass('.disabled')
                    $(this).css('cursor', 'no-drop');
                    $(this).off();
                }
                // console.log($('.price-now>em').text());
            })
            //计算结算的总价
        let sum = 0;
        $('.cart-checkbox>input').on('click', function() {
            // $('.collect-sj-right>p>b').text($('.sn-price>em').val());
            if ($(this).parents('.item-main').hasClass('select')) {
                $(this).parents('.item-main').removeClass('select')
                sum -= parseInt($(this).parents('.item-main').find('.sum').text());
            } else {
                $(this).parents('.item-main').addClass('select');
                sum += parseInt($(this).parents('.item-main').find('.sum').text());
            }
            $($('.zprice').next()).text(sum)
        })
    }).catch(xhr => {
        console.log(xhr.status);
    })


// 导航栏二级菜单
$('.hover-box').on('mouseenter', function() {
    $(this).children('div').delay(100).show(100);
    $(this).children('a').addClass('header-active-hover');
})
$('.hover-box').on('mouseleave', function() {
    $(this).children('div').delay(100).hide(100);
    $(this).children('a').removeClass('header-active-hover');
})