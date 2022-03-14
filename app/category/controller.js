const Category = require('./model');
module.exports = {
    index: async(req, res) =>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const category = await Category.find()
            const active = 'category'
            res.render('admin/category/view_category',{
                category,
                alert,
                active
            });
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
        }
    },
    viewCreate: async(req, res) =>{
        try {
            const active = 'category'
            res.render('admin/category/create', {active});
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/category')
        }
    },
    actionCreate: async (req, res) =>{
        try {
            const {name} = req.body

            let category = await Category({name})
            await category.save();

            req.flash('alertMessage', 'Berhasil tambah kategori')
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/category')
        }
    },
    viewEdit: async(req, res) =>{
        try {
            const active = 'category'
            const {id} = req.params
            let category = await Category.findOne({_id: id,})
            res.render('admin/category/edit', {
                category,
                active
            });
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/category')
        }
    },
    actionEdit: async(req, res) =>{
        try {
            const {id} = req.params
            const{name} = req.body
            const category = await Category.findOneAndUpdate({
                _id: id,
            }, {name})
            
            req.flash('alertMessage', 'Berhasil Edit kategori')
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/category')
        }
    },
    actionDelete: async(req,res) =>{
        try {
            const {id} = req.params
            const category = await Category.findOneAndDelete({_id: id})
            
            req.flash('alertMessage', 'Berhasil Menghapus kategori')
            req.flash('alertStatus', 'success')
            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/category')
        }
    }
}