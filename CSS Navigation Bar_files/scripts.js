//set HTML element global variables
var header		 = document.getElementById('header'),
	main		 = document.getElementById('main-div'),
	cta			 = document.getElementById('cta'),
	click		 = document.getElementById('clickthru'),
	product		 = document.getElementById('product'),
	badgeWrap	 = document.getElementById('badges'),
	hpLogo	 	 = document.getElementById('hp-logo'),
	productText	 = document.getElementById('productTextContainer'),
	productImage = document.getElementById('productImageContainer'),
	intelCopy 	 = document.getElementById('intelCopy'),
	globalData,

	Ad = {
		globalIndex : 0,

		animate : function() {
			var combinedSKUs = [];

			if(Feed.data.length >= 2){
				callAnimation(Feed.data);
			} else {
    			TweenMax.to('.stage', 0.5, {autoAlpha : 1});
			    TweenMax.set(".slash", { transformOrigin: "50% 50%", rotation: -15 });
				document.querySelector('.scrubber').style.display = 'none';
				document.querySelector('.scrubber-bg').style.background = 'none';
				document.querySelector('.scrubber-bg').style.borderTop = '1px solid '+ myFT.instantAds.specialCopy_txt_size_color_bg_lineHex_xy.split('|')[3];
			}

			for(t in Feed.data){
				combinedSKUs.push(Feed.data[t]._id);
			}

			myFT.stateTrackingEvent(combinedSKUs.join());
		},

		build : function(data, num) {
			var badgeImage = new Image();

			productImage.appendChild(Feed.createImage(data, num));
			productText.appendChild(Feed.createItem(data, num));

			badgeImage.src = data.badge_image;//Feed.determineBadge(data.pc_processor);
			badgeImage.classList.add('productbadge-'+ parseInt(Number(num) + 1));
			badgeWrap.appendChild(badgeImage);
		},

		clickTags : function(){
			myFT.applyClickTag(click, 1, myFT.instantAds.clickTag1);

			productText.addEventListener('click', function() {
				Feed.data[Ad.globalIndex].buy_url ? myFT.clickTag(2, Feed.data[Ad.globalIndex].buy_url) : myFT.clickTag(2, myFT.instantAds.clickTag2);
			});

			productImage.addEventListener('click', function() {
				Feed.data[Ad.globalIndex].buy_url ? myFT.clickTag(2, Feed.data[Ad.globalIndex].buy_url) : myFT.clickTag(2, myFT.instantAds.clickTag2);
			});

			cta.addEventListener('click', function() {
				Feed.data[Ad.globalIndex].buy_url ? myFT.clickTag(3, Feed.data[Ad.globalIndex].buy_url) : myFT.clickTag(3, myFT.instantAds.clickTag2);
			});
		},

		error : function(error){
			console.error(error);
			main.innerHTML = '';
			myFT.stateTrackingEvent('default');
			myFT.applyClickTag(document.body, 1);
			document.querySelector('#main-div').style.backgroundImage = 'url(' + myFT.instantAds.failSafeIMG + ')';
			document.querySelector('#main-div').style.backgroundRepeat = 'no-repeat';
			document.querySelector('#main-div').style.backgroundColor = 'transparent';
			document.querySelector('#main-div').style.backgroundPosition = '-1px -1px';
		},

		initialize : function(){
			if(Feed.data.length){
				var img = new Image();

				Ad.setColors();
				Ad.clickTags();
				cta.innerHTML = myFT.instantAds.cta_txt;
				header.innerHTML = myFT.instantAds.specialCopy_txt;
				intelCopy.innerHTML = myFT.instantAds.footerCopy_txt;
				img.src = myFT.instantAds.hp_logoIMG;
				hpLogo.appendChild(img);
				Ad.resizeCopy();
				Ad.animate();
			}else{
				Ad.error('No products to show');
			}
		},

		resizeCopy : function() {
			var products 	 = productText.querySelectorAll('.product'),
				descriptions = productText.querySelectorAll('.description');

			for(var p = 0; p < products.length; p++){
				myFT.resizeText(products[p]);
				descriptions[p].style.fontSize = myFT.instantAds.processorCopy_fontSize_hex_xy.split('|')[0] + "px";
			}
		},

		setColors : function(){
			header.style.fontSize 		 = myFT.instantAds.specialCopy_txt_size_color_bg_lineHex_xy.split('|')[0] + 'px';
			header.style.color 	 		 = myFT.instantAds.specialCopy_txt_size_color_bg_lineHex_xy.split('|')[1];
			header.style.backgroundColor = myFT.instantAds.specialCopy_txt_size_color_bg_lineHex_xy.split('|')[2];
			header.style.borderColor 	 = myFT.instantAds.specialCopy_txt_size_color_bg_lineHex_xy.split('|')[3];
			header.style.left 			 = myFT.instantAds.specialCopy_txt_size_color_bg_lineHex_xy.split('|')[4].split(',')[0] + 'px';
			header.style.top 	 		 = myFT.instantAds.specialCopy_txt_size_color_bg_lineHex_xy.split('|')[4].split(',')[1] + 'px';

			document.querySelector('#main-div').style.backgroundImage = 'url(' + myFT.instantAds.backgroundIMG + ')';
			document.querySelector('#main-div').style.backgroundRepeat = 'no-repeat';
			document.querySelector('#main-div').style.backgroundColor = myFT.instantAds.background_border_hex.split(',')[0];
			document.querySelector('#main-div').style.backgroundPosition = '-1px -1px';
			myFT.richLoads.iRichload.frame.style.border = '1px solid '+ myFT.instantAds.background_border_hex.split(',')[1];
			
			cta.style.backgroundColor 	= myFT.instantAds.ctaButton_BG_font_hex_size_xy.split('|')[0];
			cta.style.color 			= myFT.instantAds.ctaButton_BG_font_hex_size_xy.split('|')[1];
			cta.style.fontSize 			= myFT.instantAds.ctaButton_BG_font_hex_size_xy.split('|')[2] + 'px';
			cta.style.left 				= myFT.instantAds.ctaButton_BG_font_hex_size_xy.split('|')[3].split(',')[0] + 'px';
			cta.style.top 				= myFT.instantAds.ctaButton_BG_font_hex_size_xy.split('|')[3].split(',')[1] + 'px';

			intelCopy.style.fontSize 	= myFT.instantAds.footer_fontSize_hex_xy.split('|')[0] + "px";
			intelCopy.style.color 		= myFT.instantAds.footer_fontSize_hex_xy.split('|')[1];
			intelCopy.style.left 		= myFT.instantAds.footer_fontSize_hex_xy.split('|')[2].split(',')[0] + "px";
			intelCopy.style.top 		= myFT.instantAds.footer_fontSize_hex_xy.split('|')[2].split(',')[1] + "px";

			badgeWrap.style.left = myFT.instantAds.product_badges_xy.split('|')[1].split(',')[0] + 'px';
			badgeWrap.style.top  = myFT.instantAds.product_badges_xy.split('|')[1].split(',')[1] + 'px';
		}

	},

	Feed = {

		data : [],
		wait : 0,
		defaultUsed : false,

		connect : function(defaultSKU) {
            var feedParams, ftFeed;

            // set dynamic parameters
            feedParams = new FTFeedParams();
            feedParams.defaultFeedEndpoint = myFT.instantAds.defaultFeedEndpoint;
            feedParams.feedEndpoint = myFT.instantAds.feedEndpoint;
            feedParams.segmentId = myFT.instantAds.segmentID;

            // send connection request
            ftFeed = new FTFeed(myFT, feedParams);
            ftFeed.getFeed(Feed.success, Ad.error);
		},

		createImage : function(data, num){
			var image = new Image(),
				imageContainer = document.createElement('div');

			num = Number(num);

			imageContainer.classList.add('product-wrapper');
			imageContainer.classList.add('product-wrapper'+ parseInt(num+1));
			imageContainer.style.left = myFT.instantAds.product_badges_xy.split('|')[0].split(',')[0] + 'px';
			imageContainer.style.top  = myFT.instantAds.product_badges_xy.split('|')[0].split(',')[1] + 'px';

			image.src = data[myFT.instantAds.feed_image_node];
			image.onerror = function() {
				this.src = myFT.instantAds.hp_logoIMG;
			};
			
			image.classList.add('product-image');
			image.classList.add('product-'+ parseInt(num+1));

			imageContainer.appendChild(image);

			return imageContainer;
		},

		createItem : function(data, num) {
			var item = document.createElement('div'),
				regPrice = data.regular_price.split('.'),
				salePrice = data.sale_price.split('.'),
				hasDot = salePrice[1] ? '.<sup>'+ salePrice[1] +'</sup></div>' : '.<sup>00</sup></div>',
				processor = "with " + data.pc_processor;

			if(processor.length >= 48){
				processor = processor.substring(0, 45) + "...";
			}

			num = Number(num);

			item.classList.add('product-text');
			item.classList.add('producttext-'+ parseInt(num+1));

            item.innerHTML  = '<div class="product text regular" style="position:absolute;color:'+ myFT.instantAds.productName_font_hex_size_xy.split('|')[0] +';font-size:'+ myFT.instantAds.productName_font_hex_size_xy.split('|')[1] +'px;left:'+ myFT.instantAds.productName_font_hex_size_xy.split('|')[2].split(',')[0] +'px;top:'+ myFT.instantAds.productName_font_hex_size_xy.split('|')[2].split(',')[1] +'px;">'+ data.product_name +'</div>';
            item.innerHTML += '<div class="description text light" style="position:absolute;color:'+ myFT.instantAds.processorCopy_fontSize_hex_xy.split('|')[1] +';font-size:'+ myFT.instantAds.processorCopy_fontSize_hex_xy.split('|')[0] +'px;left:'+ myFT.instantAds.processorCopy_fontSize_hex_xy.split('|')[2].split(',')[0] +'px;top:'+ myFT.instantAds.processorCopy_fontSize_hex_xy.split('|')[2].split(',')[1] +'px;">' + processor + '</div>';
            if(data.regular_price !== data.sale_price && myFT.instantAds.show_salePrice_SKU.split('|')[0].toLowerCase() === "true"){
	            item.innerHTML += '<div class="priceslash text regular" style="position:absolute;color:'+ myFT.instantAds.regPrice_fontSize_hex_xy.split('|')[1] +';font-size:'+ myFT.instantAds.regPrice_fontSize_hex_xy.split('|')[0] +'px;left:'+ myFT.instantAds.regPrice_fontSize_hex_xy.split('|')[2].split(',')[0] +'px;top:'+ myFT.instantAds.regPrice_fontSize_hex_xy.split('|')[2].split(',')[1] +'px;">$'+ regPrice[0] +'.<sup>'+ regPrice[1] +'</sup></div>';
	            item.innerHTML += '<div class="slash" style="position:absolute;border-color:'+ myFT.instantAds.regPrice_fontSize_hex_xy.split('|')[1] +';left:'+ Number(Number(myFT.instantAds.regPrice_fontSize_hex_xy.split('|')[2].split(',')[0]) - 2) +'px;top:'+ Number(Number(myFT.instantAds.regPrice_fontSize_hex_xy.split('|')[2].split(',')[1]) + 7) +'px;"></div>';
	        }
            item.innerHTML += '<div class="from text light" style="position:absolute;color:'+ myFT.instantAds.pricePrefix_fontSize_hex_xy.split('|')[1] +';font-size:'+ myFT.instantAds.pricePrefix_fontSize_hex_xy.split('|')[0] +'px;left:'+ myFT.instantAds.pricePrefix_fontSize_hex_xy.split('|')[2].split(',')[0] +'px;top:'+ myFT.instantAds.pricePrefix_fontSize_hex_xy.split('|')[2].split(',')[1] +'px;">'+ myFT.instantAds.pricePrefix_txt +'</div>';
            item.innerHTML += '<div class="price text regular" style="position:absolute;color:'+ myFT.instantAds.salePrice_fontSize_hex_xy.split('|')[1] +';font-size:'+ myFT.instantAds.salePrice_fontSize_hex_xy.split('|')[0] +'px;left:'+ myFT.instantAds.salePrice_fontSize_hex_xy.split('|')[2].split(',')[0] +'px;top:'+ myFT.instantAds.salePrice_fontSize_hex_xy.split('|')[2].split(',')[1] +'px;">$'+ salePrice[0] + hasDot;

            if(myFT.instantAds.show_salePrice_SKU.split('|')[1].toLowerCase() === "true"){
            	item.innerHTML += '<div class="sku text regular" style="position:absolute;color:'+ myFT.instantAds.SKU_fontSize_hex_xy.split('|')[1] +';font-size:'+ myFT.instantAds.SKU_fontSize_hex_xy.split('|')[0] +'px;left:'+ myFT.instantAds.SKU_fontSize_hex_xy.split('|')[2].split(',')[0] +'px;top:'+ myFT.instantAds.SKU_fontSize_hex_xy.split('|')[2].split(',')[1] +'px;white-space:nowrap">SKU# '+ data.retailer_sku.toUpperCase() +'</div>';
            }

            return item;
		},

		//the code below does not work in Safari :(
		//determineBadge : function(processor = '') {
		determineBadge : function(processor) {
			if (processor === undefined) {
    			processor = '';
  			}
			var badge  = true,
				badges = [
					Feed.formatBadge(myFT.instantAds.badge1IMG), 
					Feed.formatBadge(myFT.instantAds.badge2IMG), 
					Feed.formatBadge(myFT.instantAds.badge3IMG), 
					Feed.formatBadge(myFT.instantAds.badge4IMG), 
					Feed.formatBadge(myFT.instantAds.badge5IMG), 
					Feed.formatBadge(myFT.instantAds.badge6IMG), 
					Feed.formatBadge(myFT.instantAds.badge7IMG), 
					Feed.formatBadge(myFT.instantAds.badge8IMG), 
					Feed.formatBadge(myFT.instantAds.badge9IMG), 
					Feed.formatBadge(myFT.instantAds.badge10IMG)
				],
				processorGen = processor.charAt(0) === "4" ? "5" : processor.charAt(0), // generation 4 and 5 are the same image
				processorVer = processor.charAt(processor.search(' Processor')-1);

			/*  
			Badge logic:  badges array contains 10 arrays both with 2 numbers,
			each pertaining to the generation and version of each processor.

			Badge image must be named "badge_core-VERSION_GENERATION-gen.png"
			-----------------------------------------------------------------
			badge[b][0] = badge generation
			badge[b][1] = badge version (ie: i7, but only number is returned)
			badge[b][2] = badge url */

			for(b in badges){
				if(badges[b][0] === processorGen){
					if(badges[b][1] === processorVer){
						badge = badges[b][2];
						break;
					}
				}
			}

			return badge;
		},

		formatBadge : function(badge) {
			var url = badge;
			
			badge = badge.split('-')[1];
			if(badge != undefined){
				badge = badge.substring(0, badge.length - 2);
				badge = badge.slice(1, badge.length);
				badge = badge.split('_');
				badge = badge.reverse();

				badge.push(url); // add url for referencing
			} else {
				badge = ['', '', ''];
			}

			return badge;
		},

		getDefault : function() {
			//Feed.connect('[%PROTOCOL%]fdz.flashtalking.com/services/hp/FBI664_retargeting/get_ids.php?ids='+ myFT.instantAds.deafultBadgeSku +'&numItems=1');
		},

		success : function(feedData, feedUrl) {
            Feed.wait++;
			// build elements
			for(i in feedData){
				if(feedData[i]){
					if(Feed.determineBadge(feedData[i].pc_processor)){
						Feed.data.push(feedData[i]);
						Ad.build(feedData[i], Feed.data.length-1);
					} else {
						if(!Feed.defaultUsed){
							Feed.defaultUsed = true;
							Feed.getDefault(); 
						}
					}
				}
			}

			Ad.initialize();
		}

	};