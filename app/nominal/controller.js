const Nominal = require('./model');
module.exports = {
    index: async(req, res) =>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const nominal = await Nominal.find()
            const active = 'nominal'
            res.render('admin/nominal/view_nominal',{
                nominal,
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
            const active = 'nominal'
            res.render('admin/nominal/create', {active});
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/nominal')
        }
    },
    actionCreate: async (req, res) =>{
        try {
            const {coinQuantity, coinName, price} = req.body

            let nominal = await Nominal({coinQuantity, coinName, price})
            await nominal.save();

            req.flash('alertMessage', 'Berhasil tambah nominal')
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/nominal')
        }
    },
    viewEdit: async(req, res) =>{
        try {
            const {id} = req.params
            const active = 'nominal'
            let nominal = await Nominal.findOne({_id: id,})
            res.render('admin/nominal/edit', {
                nominal,
                active
            });
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/nominal')
        }
    },
    actionEdit: async(req, res) =>{
        try {
            const {id} = req.params
            const{coinQuantity, coinName, price} = req.body
            const nominal = await Nominal.findOneAndUpdate({
                _id: id,
            }, {coinQuantity, coinName, price})
            
            req.flash('alertMessage', 'Berhasil Edit Nominal')
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/nominal')
        }
    },
    actionDelete: async(req,res) =>{
        try {
            const {id} = req.params
            const nominal = await Nominal.findOneAndDelete({_id: id})
            
            req.flash('alertMessage', 'Berhasil Menghapus nominal')
            req.flash('alertStatus', 'success')
            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `$(err.message)`)
            req.flash('alertStatus', 'danger')
            req.redirect('/nominal')
        }
    }
}