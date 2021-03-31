const express = require('express');
const router = express.Router();
const validateDiscountInput = require('../../validation/discount');
const Discount = require('../../models/Discount');

router.post('/discount-add', (req, res) => {
    const { errors, isValid } = validateDiscountInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { title, image, imagePublicId, link, creator} = req.body;
    const newDiscount = new Discount({
        title: title,
        image: image,
        imagePublicId: imagePublicId,
        link: link,
        creator: creator,
    });
    newDiscount
    .save()
    .then(discount => {
        return res.status(200).json({message: 'Discount added successfully.'})
    }).catch(err => console.log(err));
});

router.get('/discounts', (req, res) => {
    Discount.find({}).then(discount => {
        if (discount) {
            return res.status(200).send(discount);
        }
    });
});

router.post('/discount-delete', (req, res) => {
    Discount.deleteOne({ _id: req.body._id}).then(discount => {
        if (discount) {
            return res.status(200).json({message: 'Discount deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/user-update', (req, res) => {
    const { errors, isValid } = validateUpdateUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    User.findOne({ _id }).then(user => {
        if (user) {
            if (req.body.password !== '') {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                    });
                });
            }
            let update = {'name': req.body.name, 'email': req.body.email, 'password': user.password};
            User.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update user.' });
                } else {
                    return res.status(200).json({ message: 'User updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now user found to update.' });
        }
    });
});

module.exports = router;
