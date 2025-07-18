const TRACKING_CONFIG = {
  FACEBOOK_PIXEL_ID: '',
  TIKTOK_PIXEL_ID: '',
  GTM_ID: '',
};

const injectScript = (src, async = true, isModule = false) => {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement('script');
  script.src = src;
  script.async = async;
  if (isModule) script.type = 'module';
  document.head.appendChild(script);
};

const injectInlineScript = (id, content) => {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.innerHTML = content;
  document.head.appendChild(script);
};

const injectGtmBodyScript = (gtmId) => {
    if (document.getElementById(`gtm-body-${gtmId}`)) return;
    const noscript = document.createElement('noscript');
    noscript.id = `gtm-body-${gtmId}`;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.prepend(noscript);
};

export const initTracking = () => {
  const { FACEBOOK_PIXEL_ID, TIKTOK_PIXEL_ID, GTM_ID } = TRACKING_CONFIG;

  if (GTM_ID) {
    injectInlineScript('gtm-script', `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `);
    injectGtmBodyScript(GTM_ID);
  }

  if (FACEBOOK_PIXEL_ID) {
    injectInlineScript('facebook-pixel-script', `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FACEBOOK_PIXEL_ID}');
      fbq('track', 'PageView');
    `);
  }

  if (TIKTOK_PIXEL_ID) {
    injectInlineScript('tiktok-pixel-script', `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
        ttq.load('${TIKTOK_PIXEL_ID}');
        ttq.page();
      }(window, document, 'ttq');
    `);
  }
};

export const trackRegistration = () => {
  if (window.fbq) {
    window.fbq('track', 'CompleteRegistration');
  }
  if (window.ttq) {
    window.ttq.track('CompleteRegistration');
  }
  if (window.dataLayer) {
    window.dataLayer.push({ 'event': 'complete_registration' });
  }
};

export const trackPurchase = (value, currency) => {
  const purchaseData = { value, currency };
  if (window.fbq) {
    window.fbq('track', 'Purchase', purchaseData);
  }
  if (window.ttq) {
    window.ttq.track('CompletePayment', {
      content_type: 'product',
      quantity: 1,
      price: value,
      value: value,
      currency: currency,
    });
  }
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'purchase',
      'ecommerce': {
        'purchase': {
          'actionField': { 'id': new Date().getTime(), 'revenue': value },
          'products': [{ 'id': 'plan', 'price': value, 'quantity': 1 }]
        }
      }
    });
  }
};