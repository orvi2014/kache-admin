const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DiscountSchema = new Schema({    
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String
        },
        imagePublicId: {
            type: String,
        },
        link: {
            type: String,
        },
        creator: {
          type: String,
          required: true,
        },
        view: {
            type: Number,
        }
      },
      {
        timestamps: true,
      }
);

DiscountSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

DiscountSchema.set('toJSON', {
    virtuals: true
});

module.exports = Discounts = mongoose.model("discount", DiscountSchema);
