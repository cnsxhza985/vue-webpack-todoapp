const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    mode: 'development' ,
    plugins: [
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {
                test: /.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
}