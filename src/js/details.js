 import $ from './lib/jquery.esm.js';
 let id = location.search.split('=')[1];
 console.log(id);
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
     <!-- 判断是否预约文本价 --> <i>¥</i>${res.price}.<span>00</span>
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
 }).catch(xhr => {
     console.log(xhr.status);
 });