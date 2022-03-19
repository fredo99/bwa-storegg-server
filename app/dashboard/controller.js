module.exports = {
    index: async(req, res) =>{
        try {
            const active = 'dashboard';
            res.render('index', {
                active,
                name: req.session.user.name,
                title: 'Halaman Dashboard'
            });
        } catch (err) {
            console.log(err);
        }
    }
}