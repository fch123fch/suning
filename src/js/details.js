 import $ from './lib/jquery.esm.js';
 import cookie from './lib/cookie.js';
 let id = location.search.split('=')[1];
 //  console.log(id);
 $.ajax({
     type: "get",
     url: "../interface/getdetails.php",
     data: { id },
     dataType: "json",
 }).then(res => {
     let pic = JSON.parse(res.details);
     //  console.log(pic);
     //  console.log(res.picture);
     $('.right-title>h1>li').text(res.title);
     let text = `<span class="mainprice" tabindex="0">
    <i>¥</i>${res.price}.<span>00</span>
 </span>`
     $('.mainprice').html(text);
     $('.imgZoom>a>img').attr('src', res.picture);
     let template = '';
     pic.forEach(el => {
         //  console.log(el.src);
         template += `<p>
       <a href="#"><img src="${el.src}" alt=""></a>
   </p>`
     });
     $('.productDetail').html(template);
     //  点击按钮增加或减少
     $('.color-chose').on('click', '.plus', function(ev) {
         // console.log($(ev.target).prevAll('.minus'));
         console.log(ev.target);
         $($(ev.target).prevAll('.minus')).css('cursor', 'pointer');
         let count = $($(ev.target).prev()).val();
         $($(ev.target).prev()).val(++count);
         // console.log($('.price-now>em').text());
         //  $('.sn-price>em').text($($(ev.target).prev()).val() * parseInt($('.price-now>em').text()))
     });
     $('.color-chose').on('click', '.minus', function(ev) {
         // console.log($(ev.target).prev());
         let count = $($(ev.target).next()).val();
         if (count > 1) {
             $($(ev.target).next()).val(--count);
             //  $('.sn-price>em').text($($(ev.target).next()).val() * parseInt($('.price-now>em').text()))
         } else {
             // $(this).addClass('.disabled')
             $(this).css('cursor', 'no-drop');
             $(this).off();
         }
         // console.log($('.price-now>em').text());
     })
     $('#add').on('click', function() {
         add(res.id, $('#buyNum').val());
     })
 }).catch(xhr => {
     console.log(xhr.status);
 });

 function add(id, num) {
     // 创建一个对象 保存当前商品的id 和 商品数量
     let product = { id, num };
     let shop = cookie.get('shop'); // 从cookie中获取数据
     if (shop) {
         shop = JSON.parse(shop);
         // 当当前id商品已经在cookie中存在时 应该修改cookie中的数量 不是直接添加一条新数据
         if (shop.some(el => el.id === id)) {
             // 查找当前id商品在数组中的索引
             let index = shop.findIndex(elm => elm.id == id);
             // 获得索引对应商品的num数量
             let count = parseInt(shop[index].num);
             // 加上当前数量
             count += parseInt(num);
             //修改数量
             shop[index].num = count;
         } else {
             shop.push(product);
         }
     } else {
         // shop中没数据  则创建个新数组 将数据添加进去
         shop = [];
         shop.push(product);
     }
     // 将数据添加到cookie中
     cookie.set('shop', JSON.stringify(shop));
 }