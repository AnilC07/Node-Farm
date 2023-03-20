module.exports = (temp, product) => {

    let output = temp.replaceAll(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replaceAll(/{%IMAGE%}/g, product.image);
    output = output.replaceAll(/{%FROM%}/g, product.from);
    output = output.replaceAll(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replaceAll(/{%QUANTITY%}/g, product.quantity);
    output = output.replaceAll(/{%PRICE%}/g, product.price);
    output = output.replaceAll(/{%DESCRIPTION%}/g, product.description);
    output = output.replaceAll(/{%ID%}/g, product.id);

    if (!product.organic){
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;}else{output = output.replace(/{%NOT_ORGANIC%}/g, "");
  return output;}
};