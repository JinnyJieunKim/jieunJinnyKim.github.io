

$(window).on('load',(function(){
	// visual scroll down button effect
	$('.btn-go-down').click(function(){
		$('html, body').animate({
			scrollTop: $('.about').offset().top
		}, 1000);
	})

	// skill
	var skillBar = $('.skill ul li');
	skillBar.each(function(){
		var skillPercent = $(this).find('span').text();
		$(this).find('span').css('width',skillPercent);
		//console.log(skillPercent);
	});	

	// portfolio more buttom effect
	var windowWidth = $(document).width();
	var portfolioList = $('.portfolio .site-list.on li');
	var listLength = portfolioList.length;
	if(windowWidth<=780 && windowWidth>=460){
		var loadingListno = 3;
		var startNo = 9;
	} else if (windowWidth>=320 && windowWidth<=780) {
		var loadingListno = 4;
		var startNo = 6;
	} else {
		var loadingListno = 4;
		var startNo = 8;
	}
	var n = startNo-1;
	var btnMore = $('.btn-more');
	var btnPopEtc = $('.btn-pop-etc');
	if($('#siteListD li').length<=8) {
		btnMore.hide();
		btnPopEtc.show();
	} else {
		btnMore.show();
		btnPopEtc.hide();
	}
	btnMore.find('a').click(function(){
		var portfolioList = $('.portfolio .site-list.on li');
		var listLength = portfolioList.length;
		for (i=1;i<=loadingListno;i++)
		{
			n++;
			portfolioList.eq(n).show(500);
			if(n>=listLength-1){
				btnMore.hide().addClass('end');
				btnPopEtc.show();
			}
		}
		//console.log('running',i,n);
		return false;
	});
	btnPopEtc.find('a').click(function(){
		$('html, body').animate({
			scrollTop: $('.tab-menu').offset().top
		}, 1000);
	});
	//console.log('listLength=',listLength);


	// tab menu
	$(".tab-content").hide();
	$("ul.tab-menu>li:first").addClass("active").show(); 	
	$(".tab-content:first").addClass('on').show();

	$("ul.tab-menu>li").click(function(e) {
		n = startNo-1;
		//console.log('n은:',n)
		i = $(this);
		iNo = i.index();
		if(($('.tab-content:eq('+iNo+') li').length)<=8 || $('.tab-content:eq('+iNo+')').hasClass('v2')) {
			//console.log('listLength=',$('.tab-content:eq('+iNo+') li').length);
			btnMore.hide();
			btnPopEtc.hide();
			$('.end-txt').show();
			//console.log('처음')
		} else if (btnMore.hasClass('end')) {
			btnMore.hide();
			btnPopEtc.show();
			$('.end-txt').hide();
			//console.log('둘째')
		} else {
			btnMore.show();
			btnPopEtc.hide();
			$('.end-txt').hide();
			//console.log('셋째')
		}
		//console.log('listLength=',$('.tab-content:eq('+iNo+') li').length);
		
		e.preventDefault();
		
		$("ul.tab-menu>li").removeClass("active");
		$(this).addClass("active");
		$(".tab-content").removeClass('on');	
		$(".tab-content").eq(iNo).addClass('on');	
		$(".tab-content").hide();		
		
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;

		$('.ul').bind('touchstart touchend', function(e) {
			e.preventDefault();
			$(this).toggleClass('hover_effect');
		});
	});
	
	$('.btn-nav').click(function(){
		$('nav').show();
		$('.btn-close').show();
		$(this).hide();
		return false;
	});

	$('.btn-close').click(function(){
		$('.btn-nav').show();
		$('nav').hide();
		$(this).hide();
		return false;
	});

	/////*going to page when click nav menu*//////
	var btn_q=$('nav li')
	var contents=$('.division')
	btn_q.click(function(e){
		e.preventDefault();
		var j=$(this);
		var i=j.index();
		var section=contents.eq(i);
		var h=section.offset().top;
		$('html,body').stop().animate({scrollTop:h});
		$('.btn-nav').show();
		$('nav').hide();
		$('.btn-close').hide();
	});

	// portfolio list 
	$('.portfolio .site-list li').each(function(){
		$(this).click(function(){
			$(this).find('h3').show();
			
		});
	});
}));


// visual typing effect
var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
	this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = this.txt+'<span class="bar"></span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
	delta = this.period;
	this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
	this.isDeleting = false;
	this.loopNum++;
	delta = 500;
	}

	setTimeout(function() {
	that.tick();
	}, delta);
};

window.onload = function() {
	var elements = document.getElementsByClassName('typing-txt');
	for (var i=0; i<elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
};

