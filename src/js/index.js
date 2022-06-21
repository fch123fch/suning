// import mySwiper from './swiper.js';
// var mySwiper = new Swiper('.swiper', {
//     direction: 'horizontal', // 垂直切换选项
//     loop: true, // 循环模式选项

//     // 如果需要分页器
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     // 渐变
//     effect: 'fade',
//     // 如果需要前进后退按钮
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     autoplay: {
//         delay: 2000,
//     },

//     // 如果需要滚动条
//     // scrollbar: {
//     //     el: '.swiper-scrollbar',
//     // },
// })

$(function() {
    $('.hover-box').on('mouseenter', function() {
        $(this).children('div').delay(100).show(100);
        $(this).children('a').addClass('header-active-hover');
    })
    $('.hover-box').on('mouseleave', function() {
        $(this).children('div').delay(100).hide(100);
        $(this).children('a').removeClass('header-active-hover');
    })
})