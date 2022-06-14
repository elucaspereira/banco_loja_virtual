const Product = Parse.Object.extend("Product");
Parse.Cloud.define("hello", (request) => {
  const name = request.params.name;
 	return("sonegar é bom " + name + "!, Mas da cadeia F");
 });

Parse.Cloud.define("create-product", async (request) => {
  const stock = request.params.stock;
  const price = request.params.price;
  if(stock == null || stock > 999) throw "Deve ser informando uma quantidade válida para o campo estoque";
  if(stock < 0) throw "Estoque nao pode ser negativo";
  if(price == null || stock < 0) throw "O preço informado é inválido"
  const product = new Product();
  product.set("name", request.params.name); //passando a requisiçao por parametro para adicionar os dados por Json
  product.set("price", request.params.price);
  product.set("stock", request.params.stock );
  product.set("isSelling", request.params.isSelling);
  const savedProduct = await product.save(null, {useMasterKey: true});
  return savedProduct.id
});

//alterar somente campos que for expecificados os demasi ficaram bloqueados
Parse.Cloud.define("change-price", async (request) => {
  const id = request.params.productId;
  const price = request.params.price;
  if(id == null) throw "Informe o ID do produto";
  if(price == null) throw "Prenecha o  Campo Preço"

  const product = new Product();
  product.id = request.params.productId;
  product.set("price", request.params.price);
  const savedProduct = await product.save(null,{useMasterKey:true});
  return savedProduct.get("price");

});
