module.exports = function (grunt) {
    grunt.config.set('browserify', {
        client: {
            files: {
                '.tmp/public/js/React/bsell.js': ['.tmp/public/js/React/sell.js'],
                '.tmp/public/js/React/bposition.js': ['.tmp/public/js/React/position.js'],
                '.tmp/public/js/React/bsystem.js': ['.tmp/public/js/React/system.js'],
                '.tmp/public/js/React/bshopCreate.js': ['.tmp/public/js/React/shopCreate.js']
            }
        },
    });
    grunt.loadNpmTasks('grunt-browserify');
};