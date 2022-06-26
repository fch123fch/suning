import $ from './lib/jquery.esm.js';
// import $ from './lib/jquery.min.js';
$(function() {
    $('.hover-box').on('mouseenter', function() {
        $(this).children('div').delay(100).show(100);
        $(this).children('a').addClass('header-active-hover');
    })
    $('.hover-box').on('mouseleave', function() {
        $(this).children('div').delay(100).hide(100);
        $(this).children('a').removeClass('header-active-hover');
    })

    // index 数据渲染
    $.ajax({
            type: "get",
            url: "../interface/getIndex.php",
            dataType: "json",
        }).then(res => {
            // console.log(res);
            // console.log($('.tab-content>ul').children());
            // const arr = $('.tab-content>ul').children();
            // console.log(arr);
            // arr.map(() => {
            let template = '';
            res.forEach(el => {
                // let picture = el.picture;
                // let title = el.title;
                // let price = el.price;
                // arr.map(() => {
                //     $('.tab-content>ul>li>a>img').attr('src', picture);
                //     $('.tab-content>ul>li>a>.title').text(title);
                //     $('.price-box>.price>em').text(price);
                // })
                template += `<li>
               <a href="./details.html?id=${el.id}">
                   <img src="${el.picture}" alt="">
                   <p class="title">
                       ${el.title}
                   </p>
                   <p class="price-box">
                       <span class="price">
                           <i>￥</i>
                           <em>${el.price}</em>
                       </span>
                       <span class="reprice">
                           <i>￥</i>
                           <em>29999</em>
                       </span>
                   </p>
                   <p class="cx-icon">
                       <span>大聚惠</span>
                       <span>包邮</span>
                       <span>领券999减30</span>
                   </p>
               </a>
           </li>`
            });
            $('.tab-content>ul').html(template);
            // });
        })
        .catch(xhr => {
            console.log(xhr.status);
        });
    // })

    // 苏宁左边楼梯   
    $('.float-list>li>a').on('click', function() {
        let target = $('#' + $(this).attr('data-id'));
        // console.log(target);
        let top = target.offset().top;
        // console.log(top);
        $('html,body').animate({
            scrollTop: top
        }, 600)

    });
    $(window).on('scroll', function() {
        let scrollTop = $(document).scrollTop();
        // console.log(scrollTop);
        if (scrollTop > 500) {
            $('.floatbar').css('display', 'block');
        } else {
            $('.floatbar').css('display', 'none');
        }
        let index = Math.round((scrollTop - 200) / 1000);
        $('.float-list>li').removeClass('on');
        $('.float-list>li:eq(' + index + ')').addClass('on');
    })
})