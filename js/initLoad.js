var blogTitle = 'DevEgg';
    // hljs.initHighlightingOnLoad();
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    var open = function (url) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', url, true);

        xhr.onload = function () {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject();
          }
        };

        xhr.onerror = function () {
          reject();
        }

        xhr.send();
      });
    };

    var createLink = function (href, postTitle, postDate) {
      var link = document.createElement('a');
      const postTitleHeading = document.createElement('h4');
      const postDateSpan = document.createElement('span');
      const title = document.createTextNode(postTitle);
      const date = document.createTextNode(postDate);

      postTitleHeading.appendChild(title);
      postDateSpan.appendChild(date);
      postDateSpan.setAttribute('class', 'post__date')

      link.setAttribute('href', href);
      link.setAttribute('class', 'post__link');
      link.appendChild(postTitleHeading);
      link.appendChild(postDateSpan);

      return link;
    }

    var launch = function () {
      const container = document.querySelector('.container');

      // console.dir(main);
      var body = document.querySelector(".container");
      var file = window.location.hash.replace(/#/g, '') + '.md';
      var location = window.location.hash;

      if (location == '' || location == '#home') {
        container.innerHTML = '<h1>Welcome to DevEgg!</h1>';
        console.log(`location: ${location}`);
        console.log(location == '#home');
        const posts = [
          {
            address: '#lorem-ipsum',
            title: 'BEM là cái khỉ gì? 🤔',
            date: 'Published Tuesday, March 17, 2020'
          },
          {
            address: '#third-post',
            title: 'BEM là cái khỉ gì? 🤔',
            date: 'Published Tuesday, March 17, 2020'
          }
        ]

        var linkStub = document.createElement('div');
        linkStub.setAttribute('class', 'posts')
        container.appendChild(linkStub);

        const postBlock = document.createElement('div');
        postBlock.setAttribute('class', 'post');
        linkStub.appendChild(postBlock);


        posts.forEach(post => {
          const postBlock = document.createElement('div');
          var link = createLink(post.address, post.title, post.date);
          postBlock.appendChild(link);
          
        postBlock.setAttribute('class', 'post');
        linkStub.appendChild(postBlock);
        })
      }




      if (body != undefined) {
        open('./posts/' + file).then(function (data) {
          if (data != '') {
            var lines = data.split('\n');
            var title = blogTitle;
            if (lines.length > 0) title = lines[0].replace(/#/g, '') + ' | ' + blogTitle;
            body.innerHTML = marked(data);
            document.title = title;
          }
        });
      }
    };

    var startup = function () {
      launch();
    };