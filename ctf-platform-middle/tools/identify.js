function identify(ctx) {
    if(ctx.session.id == undefined) {
        throw 'Login First';
    }
}

module.exports = identify;