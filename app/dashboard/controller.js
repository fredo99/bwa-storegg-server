module.exports = {
    index: async(req, res) =>{
        try {
            const active = 'dashboard';
            res.render('index', {
                active
            });
        } catch (err) {
            console.log(err);
        }
    }
}