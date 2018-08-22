module.exports = function (grunt) {
    grunt.config.set('browserify', {
        client: {
            files: {
                '.tmp/public/js/React/sell.js': ['.tmp/public/js/React/sell.js'],
                '.tmp/public/js/React/position.js': ['.tmp/public/js/React/position.js'],
                '.tmp/public/js/React/system.js': ['.tmp/public/js/React/system.js'],
                '.tmp/public/js/React/shopCreate.js': ['.tmp/public/js/React/shopCreate.js'],
                '.tmp/public/jsintro/React/Order-customer.js': ['.tmp/public/jsintro/React/Order-customer.js']

            }
        },
    });
    grunt.loadNpmTasks('grunt-browserify');
};