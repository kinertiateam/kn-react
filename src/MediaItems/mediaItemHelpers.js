export const optimizeImageNode = function(mediaItem){
  return({
    props: {
      src: mediaItem.is_optimized ? undefined : mediaItem.url,
      children: (
        !isMediaItemOptimized( mediaItem ) ?
          undefined
        :
          constructPictureChildren(
            mediaItem.url,
            mediaItem.optimized_image_urls
          )
      ),
    },
    type: mediaItem.is_optimized ? 'picture' : 'img',
  });
}



export const constructNode = function(mediaItem, props, goBoostPartnersBaseUrl){
  let node;


  if( !goBoostPartnersBaseUrl ){
    goBoostPartnersBaseUrl = 'https://api.goboost.com';
  }


  if( !mediaItem || !mediaItem.mime_type ){
    return;
  } else if( mediaItem.mime_type.includes('image') ){
    node = optimizeImageNode( mediaItem );
  } else if( mediaItem.mime_type.includes('video') ){
    node = {
      props: {
        "data-path": 'props.children.0',
        controls: true,
        children: [
          {
            props: {
              "data-path": "props.children.0.props.children.0",
              src: `${ mediaItem.url }`,
              type: `${ mediaItem.mime_type }`,
            },
            type: "source"
          },
          "Your browser does not support HTML5 video."
        ]
      },
      type: "video"
    }
  } else if( mediaItem.mime_type.includes('audio') ){
    node = {
      props: {
        "data-path": 'props.children.0',
        controls: true,
        children: [
          {
            props: {
              "data-path": "props.children.0.props.children.0",
              src: `${ mediaItem.url }`,
              type: `${ mediaItem.mime_type }`,
            },
            type: "source"
          },
          "Your browser does not support the audio element."
        ]
      },
      type: "audio"
    }
  } else if( mediaItem.mime_type.includes('application') ){
    node = {
      props: {
        "data-path": 'props.children.0',
        children: [
          "DOCUMENT HERE"
        ],
        // href: `${ mediaItem.url }`,
        href: `${ goBoostPartnersBaseUrl }/api/core/media_items/${ mediaItem.id }/download`,
        target: '_blank',
      },
      type: "a"
    }
  }


  node.props['data-if'] = props['data-if'] ? props['data-if'] : undefined;

  if( !isMediaItemOptimized( mediaItem ) ){
    node.props.id = props.id ? props.id : undefined;
    node.props.style = props.style ? props.style : undefined;
    node.props.className = props.className ? props.className : undefined;
    node.props.alt = props.alt ? props.alt : undefined;
    node.props.loading = props.loading ? props.loading : undefined;
  }


  return node;
}



export const hasChildren = function( nodeChildren ) {
  const nodeChildrenText = (
    nodeChildren && nodeChildren.props && Object.keys( nodeChildren.props ).includes('text') && !nodeChildren.props.children ?
      nodeChildren.props.text
    :
      null
  );

  const isTextEmpty = text => (
    typeof text === 'string' &&
    (
      !text ||
      text.trim() === '\u00B6'
    )
  );

  if(
    !nodeChildren ||
    isTextEmpty( nodeChildrenText ) ||
    isTextEmpty( nodeChildren )
  ){
    return false;
  } else if( Array.isArray( nodeChildren ) ){
    return Boolean( nodeChildren.filter(c => c && c != "\u00B6" ).length );
  } else {
    return true;
  }
}



export const isMediaItemOptimized = function(mediaItem){
  return mediaItem && mediaItem.is_optimized;
}



export const FILE_SIZES = [
  {
    imageWidthPixels: 400,
    screenWidthPixels: 480
  },
  {
    imageWidthPixels: 640,
    screenWidthPixels: 770
  },
  {
    imageWidthPixels: 1000,
    screenWidthPixels: 1024
  },
  {
    imageWidthPixels: 1280,
    screenWidthPixels: 100000
  },
];



export const parseMediaItemUrl = function(url){
  const urlMatch = url.match(/^https:\/\/storage\.googleapis\.com\/([^\/]+)\/(.+)$/);

  if( urlMatch ){
    const filename = urlMatch[2].split('/').slice(-1)[0];

    return ({
      gcsBucket: urlMatch[1],
      gcsFilepath: urlMatch[2],
      filename,
      fileExtension: filename.split('.').slice(-1)[0]
    })
  }

  return null
}



export const createSrcSet = function(parsedUrl, intendedExtension){
  const filenameWithoutExtension = parsedUrl.filename.replace(new RegExp(`\\.${ parsedUrl.fileExtension }$`), '');

  const pathWithoutFile = parsedUrl.gcsFilepath.replace(new RegExp(`\/${ parsedUrl.filename }$`), '');
  const basePath = `https://storage.googleapis.com/${parsedUrl.gcsBucket}/${pathWithoutFile}`;

  let srcSet = '';
  let sizes = '';

  FILE_SIZES.forEach((s, i) => {
    srcSet += `${ basePath }/${ filenameWithoutExtension }_resized_${ s.imageWidthPixels }.${ intendedExtension } ${ s.imageWidthPixels }w`;

    if( i !== FILE_SIZES.length-1 ){
      srcSet += `, `;
      sizes += `(max-width: ${ s.screenWidthPixels }px) ${ s.imageWidthPixels }px, `;
    } else {
      sizes += `${ s.imageWidthPixels }px`;
    }
  });

  const compressedImageUrl = `${ basePath }/${ filenameWithoutExtension }_compressed.${ intendedExtension }`;

  return { srcSet, sizes, compressedImageUrl };
}



export const constructPictureChildren = function(mediaItemUrl, optimizedImageUrls){
  const compressedUrls = optimizedImageUrls.split(',').filter(u => u.includes('_compressed.'));

  // We use the `picture` tag with children `source` and `img`
  // tags for image optimization. We do not need to recognize
  // the browser because the browser will render the first image
  // it "recognizes" and meet the qualifications
  const optimizedImageTypes = [
    {
      type: 'image/webp',
      extension: '.webp',
    },
    {
      type: 'image/jpg2',
      extension: '.jpeg2000',
    }
  ];

  optimizedImageTypes.forEach(
    t => t['url'] = compressedUrls.find(u => u.endsWith( t.extension ))
  );

  const children = optimizedImageTypes.map(
    (t, i) => ({
      type: "source",
      key: i,
      props: {
        type: t.type,
        srcSet: t.url,
      }
    })
  )

  children.push({
    type: "img",
    key: optimizedImageTypes.length,
    props: {
      srcSet: mediaItemUrl,
    }
  });


  return children
}