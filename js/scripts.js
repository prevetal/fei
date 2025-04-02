WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Mini popups
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Close the popup when clicking outside of it
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header').toggleClass('show')

		$('.mob_header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Filter
	$('.filter_btn .btn').click(function(e) {
		e.preventDefault()

		$('.overlay').fadeIn(300)

		$('.filter').addClass('show')
		$('body').addClass('lock')
	})

	$('.filter .close_btn, .filter .cancel_btn, .overlay').click(function(e) {
		e.preventDefault()

		$('.overlay').fadeOut(200)

		$('.filter').removeClass('show')
		$('body').removeClass('lock')
	})

	$('.filter .form .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Fairy info
	if ($('.fairy_info .images').length) {
		const fairyThumbs = new Swiper('.fairy_info .thumbs .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			lazy: true,
			loopAdditionalSlides: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			direction: 'vertical',
			breakpoints: {
				0: {
					spaceBetween: 12
				},
				1280: {
					spaceBetween: 20
				},
				1900: {
					spaceBetween: 23
				}
			}
		})

		new Swiper('.fairy_info .big .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			lazy: true,
			thumbs: {
				swiper: fairyThumbs
			}
		})
	}


	// Fairy phone number
	$('.fairy_info .get_phone_btn').click(function(e) {
		e.preventDefault()

		$(this).hide()
		$('.fairy_info .phone').addClass('show')
	})


	// Fairy reviews
	$('.fairy_reviews .review .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$(this).closest('.review').find('.answer').slideToggle(300)
	})


	// LK - Menu
	$('.mob_lk_menu_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$('.lk_info aside').slideToggle(300)
	})


	$('.lk_menu .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$(this).next().slideToggle(300)
	})


	// LK - Messages
	$('.lk_messages .item .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$(this).closest('.item').toggleClass('open')
	})


	// LK - Send message
	$('.lk_send_message .send_message_btn').click(function(e) {
		e.preventDefault()

		$('.lk_send_message .form').fadeIn(300)

		document.querySelector('.lk_send_message .form').scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		}, 1000)
	})


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)')

	if (selects) {
		selects.forEach(el => {
			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}


	// LK - Fairies
	$('.lk_fairies .item .spoler_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		$(this).toggleClass('active')

		parent.find('.btns.hide, .btns.show').toggleClass('hide show')
		parent.find('.features').toggleClass('show')
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Map
function initMap() {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.755864, 37.617698],
			zoom: 16,
			controls: []
		})

		// Placemark
		let myPlacemark = new ymaps.Placemark([55.755864, 37.617698], {
			balloonContent:
				String() + '<a href="/" class="item">'
							+ '<div class="thumb">'
								+ '<img src="images/tmp/fairies_thumb3.jpg" alt="" loading="lazy">'
							+ '</div>'

							+ '<div class="name">Вика, 23</div>'

							+ '<div class="tags">'
								+ '<div>Инди</div>'
								+ '<div class="sep"></div>'
								+ '<div>Проверено</div>'
								+ '<div class="sep"></div>'
								+ '<div>С видео</div>'
							+ '</div>'

							+ '<div class="price">Ростокино, 10 000 ₽</div>'
						+ '</a>'
		}, {
			hideIconOnBalloonOpen : false,
			balloonShadow : false,
			balloonOffset : [-95, -32]
		})

		myMap.geoObjects.add(myPlacemark)

		// myMap.controls.add('zoomControl', {
		// 	position : {
		// 		right : '20px',
		// 		top   : '20px'
		// 	}
		// })

		myMap.behaviors.disable('scrollZoom')
	})
}