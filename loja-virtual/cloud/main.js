const Product = Parse.Object.extend("Product");
Parse.Cloud.define("hello", (request) => {
  const name = request.params.name;
 	return("sonegar é bom " + name + "!, Mas da cadeia F");
 });

Parse.Cloud.define("create-product", async (request) => {
  const product = new Product();
  product.set("name", "Placa Mãe asus h410-m");
  product.set("price", 1800);
  product.set("stock", 20);
  product.set("isSelling",true);
  const savedProduct = await product.save(null, {useMasterKey: true});
  return savedProduct
});
