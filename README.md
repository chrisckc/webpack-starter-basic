# webpack-starter-basic

This was created from the following repo:
https://github.com/lifenautjoe/webpack-starter-basic

The instructions in the repo readme were followed, specifically:

```sh
 npm install 
 npm run kickstart
```

I then modified the webpack configs to use an output.publicPath so that the content can be served from some sub-path off the root of a domain. I also replaced url-loader with file-loader to simplify for testing.

However, when using a public path of '/app' (without a trailing slash) it causes the file-loader plugin to concatenate the options.publicPath with the value of options.name without using a '/' path separator.

To observe this run the following command (uses webpack.dev.js)
```sh
npm start
```

Open up Chrome dev tools > Source and notice that the file 
`logo-on-dark-bg.png` has been placed under an incorrect  path of 'appsrc/assets'.

The correct path should be 'app/src/assets'

To fix the issue either correct the publicPath to '/app/' or uncomment the `//publicPath: baseUrl` on line 70 in the webpack config

The issue is detailed here:
https://github.com/webpack-contrib/file-loader/issues/286

This repo was created for demonstration and testing purposes.


