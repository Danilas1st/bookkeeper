


let $body,
	windowHeight,
	windowWidth,
	degree = 0.0174532925,
	mediaPoint1 = 1024,
	mediaPoint2 = 768,
	mediaPoint3 = 480,
	mediaPoint4 = 320,
	devStatus = window.productionStatus === 'development';
	const win = document.body

$(document).ready(function ($) {
	$body = $('body');
	if(devStatus) {
		pageWidget(['index']);
		pageWidget(['policy']);
		pageWidget(['about']);
		pageWidget(['servicepage']);
		pageWidget(['contacts']);
		getAllClasses('html', '.elements_list');
	}
});

$(window).on('load', function () {
	updateSizes();
	loadFunc();
	checkSubmenu();
	highlightActiveMenuItem();
	if($('.hero_main_tab')) {
		tabs('.tab_list--link>li', '.tabcontent');
	}
});

$(window).on('resize', function () {
	resizeFunc();
});

$(window).on('scroll', function () {
	scrollFunc();
});

function loadFunc() {
	calcViewportHeight();
}

function resizeFunc() {
	updateSizes();

	calcViewportHeight();
}

function scrollFunc() {}

function calcViewportHeight() {
	if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');
	}
}

function updateSizes() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
}

if ('objectFit' in document.documentElement.style === false) {
	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(
			document.querySelectorAll('img[data-object-fit]'),
			function (image) {
				(image.runtimeStyle || image.style).background =
					'url("' +
					image.src +
					'") no-repeat 50%/' +
					(image.currentStyle
						? image.currentStyle['object-fit']
						: image.getAttribute('data-object-fit'));

				image.src =
					"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" +
					image.width +
					"' height='" +
					image.height +
					"'%3E%3C/svg%3E";
			}
		);
	});
}

function succes(success) {
	$(success).toggleClass('active');
		setTimeout(function() {
			$(success).removeClass('active')
		}, 3000)
}

function failed(failed) {
	$(failed).toggleClass('active');
		setTimeout(function() {
			$(failed).removeClass('active')
		}, 3000)
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}



$(document).ready(function() {
	const btns = document.querySelectorAll('.btn')

	btns.forEach(el => {
			el.addEventListener('click', function(e) {
					let
							size = Math.max(this.offsetWidth, this.offsetHeight),
							x = e.offsetX - size / 2,
							y = e.offsetY - size / 2,
							wave = this.querySelector('.wave')
	
					// Create an element if it doesn't exist
					if (!wave) {
							wave = document.createElement('span')
							wave.className = 'wave'
					}
					wave.style.cssText = `width:${size}px;height:${size}px;top:${y}px;left:${x}px`
					this.appendChild(wave)
			})
	})
})




$(document).ready(function()  {

	var inputsTel = document.querySelectorAll('input[type="tel"]');
	Inputmask({
		"mask": "+7 (999) 999-99-99",
		showMaskOnHover: false
	}).mask(inputsTel);
})



async function maps(street, city, size) {

	function init() {
		const geocoder = ymaps.geocode(`${street} ${city}`);
		geocoder.then(
			async function (res) {
				var myMapMobile = await new ymaps.Map('map', {
						center: res.geoObjects.get(0).geometry.getCoordinates(),
						zoom: 16,
					}, {
						searchControlProvider: 'yandex#search'
					}),
					myPlacemark = new ymaps.Placemark(myMapMobile.getCenter(), {
						balloonContent: `${street} ${city}`
					}, {
						iconLayout: 'default#image',
						iconImageHref: '/i/global/map.svg',
						iconImageSize: size,
						iconImageOffset: [-5, -38]
					});

				myMapMobile.geoObjects
					.add(myPlacemark)
				myMapMobile.behaviors.disable('scrollZoom')
			}
		);
	}
	await ymaps.ready(init);

}



function checkSubmenu() {
  const menuItems = document.querySelectorAll('.header_nav>ul>li');

  menuItems.forEach((menuItem) => {
    const subMenus = menuItem.querySelectorAll('.sub-menu');
    if (subMenus.length > 0) {
			menuItem.querySelector('a').classList.remove('remove')
			console.log(subMenus)
      let hasIconSubmenu = false;

      menuItem.childNodes.forEach((node) => {
        if (node.classList && node.classList.contains('icon-submenu')) {
          hasIconSubmenu = true;
        }
      });

      if (!hasIconSubmenu) {
        const icon = document.createElement('div');
        icon.className = 'icon-submenu';
        menuItem.appendChild(icon);

        icon.addEventListener('click', (e) => {
          const target = e.target.parentElement;

          if (target.classList.contains('current-children-item')) {
            target.classList.remove('current-children-item');
          } else {
            target.classList.add('current-children-item');
          }
        });
      }
    }
  });
}



const menuLinks = document.querySelectorAll('header_nav>li>a');
function highlightActiveMenuItem() {
const scrollPosition = window.scrollY;
menuLinks.forEach((link) => {
	const targetElement = document.querySelector(link.hash);
	if (targetElement.offsetTop <= scrollPosition + 200 && targetElement.offsetTop + targetElement.offsetHeight > scrollPosition + 200) {
		link.closest('li').classList.add('active');
	} else {
		link.closest('li').classList.remove('active');
	}
});
}

window.addEventListener('load', highlightActiveMenuItem);
window.addEventListener('scroll', highlightActiveMenuItem);

function smoothScrollTo(target) {
const startPosition = window.pageYOffset;
const targetPosition = target.offsetTop;
const distance = targetPosition - startPosition;
const duration = 500;
let start = null;

function step(timestamp) {
	if (!start) start = timestamp;
	const progress = timestamp - start;
	const scrollY = startPosition + distance * (progress / duration);
	window.scrollTo(0, scrollY);
	if (progress < duration) window.requestAnimationFrame(step);
}


window.requestAnimationFrame(step);
}
$(document).ready(function() {
	menuLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();
			const target = document.querySelector(link.hash);
			smoothScrollTo(target);
		});
	});
})



// tabs
function tabs(link, block) {
	let linkSelector = $(link),
		blockSelector = $(block);

	$(linkSelector).on('click', function (e) {
		e.preventDefault();

		let $this = $(this),
			currentData = $(this).data('tab');

		$(blockSelector).removeClass('active_tab');
		$(linkSelector).removeClass('active_tab');

		$(block + '[data-tab="' + currentData + '"]').addClass('active_tab');
		$this.addClass('active_tab');

	});
}