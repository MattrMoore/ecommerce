const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  through: {
    foreignKey: 'category_id',
  },
});

Category.hasMany(Product, {
  foreignKey: 'product_id',
  onDelete: "CASCADE",
});

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  }, as: "product_tags"
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  }, as: "tag_products",
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};