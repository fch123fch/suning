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
            template += ` <div class="td-chk">
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
       <em>￥${(el.price * current[0].num).toFixed(2)}</em></b>
            </div>
            <div class="td-op">
                <a href="#">移入关注</a>
                <a href="#" class="remove" data-id="${el.id}">删除</a>
            </div>
        </div>`
        });
        $('.item-main').html(template);
        $('.remove').on('click', function() {
            let res = shop.filter(el => el.id != $(this).attr('data-id'));
            console.log(res);
            cookie.set('shop', JSON.stringify(res));
            location.reload();
        })

        $('.item-main').on('click', '.plus', function(ev) {
            console.log($(ev.target).prevAll('.minus'));
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
                $(this).css('cursor', 'no-drop');
                $(this).off();
            }
            // console.log($('.price-now>em').text());

        })
    }).catch(xhr => {
        console.log(xhr.status);
    })