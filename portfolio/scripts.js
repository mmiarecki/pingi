var Portfolio = function() {
    var max = portfolioArray.length;
    var onPage = 13;
    var currentPageNr = 1;
    var maxPages = Math.ceil(portfolioArray.length / onPage);
    
    // dodac wyciaganie numeru strony z url po przeladowaniu
    
    this.getNextPageNr = function() {
        if (this.getCurrentPageNr() === this.getMaxPages()) {
            return 1;
        }
        return this.getCurrentPageNr() + 1;
    };
    
    this.getPrevPageNr = function() {
        if (this.getCurrentPageNr() === 1) {
            return this.getMaxPages();
        }
        return this.getCurrentPageNr() - 1;
    };
    
    this.makeNavNotActive = function() {
        jQuery("figure img").addClass("notActive");
    };
    
    this.makeNavActive = function() {
        var navs = jQuery("figure img");
//        navs.removeClass();
        
        var prevNav = jQuery(navs[0]);
        var nextNav = jQuery(navs[1]);
        
        navs.addClass('cursorPointer');
        
        prevNav.on('click',function(event){
            port.setCurrentPageNr(port.getPrevPageNr());
            port.removeOldPortfolio();
            port.takeElementsForPage(port.getCurrentPageNr());
        });
        
        nextNav.on('click',function(event){
            port.setCurrentPageNr(port.getNextPageNr());
            port.removeOldPortfolio();
            port.takeElementsForPage(port.getCurrentPageNr());
        });
    }
    
    this.removeOldPortfolio = function() {
        var figures = jQuery("section figure");
        var max = figures.length;
        for (var i = 1; i < max-1; ++i) {
            jQuery(figures[i]).remove();
        }
    };
    
    this.getMax = function() {
        return max;
    };
    
    this.getOnPage = function() {
        return onPage;
    };
    
    this.setCurrentPageNr = function(newCurrentPageNr){
        currentPageNr = newCurrentPageNr;
    };
    
    this.getCurrentPageNr = function() {
        return currentPageNr;
    };
    
    this.getMaxPages = function() {
        return maxPages;
    };
    
    this.takeElementsForPage = function(page) {
        var indStart = (page - 1) * this.getOnPage();
        var indEnd = (page * this.getOnPage());
        if (indEnd > this.getMax()) {
            indEnd = this.getMax();
        }
        
        var section = jQuery('section');
        var navs = jQuery('section figure');
        var nextNav = jQuery(navs[1]);
        for (var i = indStart; i < indEnd; ++i) {
            //console.log(i);
            var portfolioElement = portfolioArray[i];
            var figure = jQuery('<figure />');
            var img = jQuery('<img />')
                .attr('src', 'i/thumbs/' + portfolioElement.thumb)
                .attr('alt', portfolioElement.caption)
                .attr('id', 'p' + i);
            nextNav.before(figure.append(img));
            img.on('click',function(event){
                console.log(jQuery(this).attr('id'));
                var id = jQuery(this).attr('id');
                port.createDetailedView(id.substr(1, id.length-1));
            });
        }
    };
    
    this.createDetailedView = function(ind) {
        console.log(ind)
        var element = portfolioArray[ind];
        console.log(element);
        if (element.type === "img") {
            this.createImageView(element);
        } else {
            this.createYoutubeView(ind);
        }
    };
    
    this.createYoutubeView = function(element) {
//        if (element[''])
    };
    /*
     
     <iframe id="player" type="text/html" width="640" height="390"
  src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
  frameborder="0"></iframe>
     
     */
    
    this.createImageView = function(element) {
        if (element.img) {
            this.createNewLayer();
            this.createImageOnLayer(element.img,element.caption)
        }
    };
    
    this.createNewLayer = function() {
        var w = jQuery(window).width();
        var h = jQuery(window).height();
        if (jQuery('body').height() > h) {
            h = jQuery('body').height();
        }
        var div = jQuery('<div />')
            .attr('id', 'layer')
            .css('width', w + 'px')
            .css('height', h + 'px');
        jQuery('body').append(div);
    }
    
    this.createImageOnLayer = function(img, alt) {
        var body = jQuery('body');
        var layer = jQuery('div#layer');
        var figure = jQuery('<figure />')
            .addClass('layer')
            .css('width', layer.css('width'))
            .css('height', layer.css('height'));
        figure.on('click',function(event){
            jQuery('div#layer').remove();
            jQuery('figure.layer').remove();
            
        });
        var img = jQuery('<img />')
            .attr('src','i/imgs/' + img)
            .attr('alt', alt);
        body.append(figure.append(img));
    };
};

var port = new Portfolio();

(function(){
    var page = 1;
    if (port.getMax() <= port.getOnPage()) {
        port.makeNavNotActive();
    } else {
        port.makeNavActive();
    }
    port.takeElementsForPage(page);
})();
