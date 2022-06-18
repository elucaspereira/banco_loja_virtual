const Product = Parse.Object.extend("Product");
Parse.Cloud.define("create-product", async (request) => {
  const stock = request.params.stock;
  const price = request.params.price;
  if(stock == null || stock.length == 0) throw "Deve ser informando uma quantidade válida para o campo estoque";
  if(stock < 0) throw "Estoque nao pode ser negativo";
  if(price == null || price < 0) throw "O preço informado é inválido";
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
  if(id == null || id == '') throw "Informe o ID do produto";
  if(price == null || price == '') throw "Prenecha o  Campo Preço";

  const product = new Product();
  product.id = request.params.productId;
  product.set("price", request.params.price);
  const savedProduct = await product.save(null,{useMasterKey:true});
  return savedProduct.get("price");

});

//funçao para atualizar todas as informaçoes dde um produto 
Parse.Cloud.define("update-products", async (request) => {
  const id = request.params.productId;
  if(id == null || id == '') throw "Deve ser informado o id do produto";

  const product = new Product();
  product.id = request.params.productId;
  product.set("name", request.params.name);
  product.set("price", request.params.price);
  product.set("stock", request.params.stock);
  product.set("isSelling", request.params.isSelling);
  const savedProduct = await product.save(null, {useMasterKey: true});
  return "O Pruduto foi atualizado"; 
});

//deletar um produto
Parse.Cloud.define("delete-product", async (request) => {
  if(request.params.productId == null) throw "Produto invalido";
  if(request.params.productId == '') throw "Deve ser informado o Id do produto";
  const product = new Product();
  product.id = request.params.productId

  await product.destroy({useMasterKey: true});
  return "Pruduto excluído com sucesso";
});

//criando usuario
const User = Parse.Object.extend("User");
Parse.Cloud.define("new-user", async (request) =>{
  const username = request.params.username;
  const email = request.params.email;
  const password = request.params.password;
  if(username == null || username == "") throw "O campo username deve ser preenchido";
  if(email == null || email == "") throw "O campo email deve ser preenchido";
  if(password== null || password == "") throw "O campo password deve ser preenchido";

  const user = new User();
  user.set("username", request.params.username);
  user.set("email", request.params.email);
  user.set("password", request.params.password);
  const savedUser = await user.save(null, {useMasterKey: true});
  return "Usuário criado com sucesso"
}); 