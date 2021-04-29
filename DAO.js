//producto
//clade de producto
//precio
//clasificacion
//cantidad de exsistencia
//exsistencia minima
//exsistencia maxima

class Product{
    constructor(product_id, description, price, type, 
            count, max_count, min_count){
        this.product_id = product_id;
        this.description = description;
        this.price = price;
        this.type = type;
        this.count = count;
        this.min_count = min_count;
        this.max_count = max_count;
    }
    get product_id(){
        return this._product_id
    }
    set product_id(product_id){
        this._product_id = product_id;
    }
    get description(){
        return this._description;
    }
    set description(description){
        this._description = description;
    }
    get price(){
        return this._price;
    }
    set price(price){
        this._price = price;
    }
    get type(){
        return this._type;
    }
    set type(type){
        this._type = type;
    }
    get count(){
        return this._count;
    }
    set count(count){
        this._count = count;
    }
    get min_count(){
        return this._min_count;
    }
    set min_count(min_count){
        this._min_count = min_count;
    }
    get max_count(){
        return this._max_count;
    }
    set max_count(max_count){
        this._max_count = max_count;
    }
}

class abarrotesDAO{
    constructor(){
        this.products = [];
    }
    get products(){
        return this._products;
    }
    set products(products){
        this._products = products;
    }
    add(id,description,price,type,count,max_count,min_count){
        var product = new Product(id,description,price,type,count,max_count,min_count);
        this.products.push(product);
    }
    remove(id){
        let index = products.findIndex((product)=>{
            return product.product_id == id;
        });
        if(index>=0){
            placeholder = this.products[this.products.length-1];
            this.products[index] = placeholder;
            this.products.pop();
        }
    }
    search(func){
        return this.products.filter(func);
    }

}



const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('data.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let julia = new abarrotesDAO();
    counter = 0;
    let datos = [];
    for await (const line of rl) {
        counter++;
        datos.push(line);
        if(counter%7==0){
            julia.add(Number(datos[0]),datos[1],Number(datos[2]),datos[3],
                Number(datos[4]),Number(datos[5]),Number(datos[6]));
            datos = [];
        }
        //console.log(`Line from file: ${line}`);
    }
    let a = julia.search((value)=>{
        return value.count > 20;
    });
    console.log("Número de productos con existencia mayor a 20: " + a.length);
    let b = julia.search((value)=>{
        return value.count < 15;
    });
    console.log("Número de productos con existencia menos a 15: " + b.length);
    let c = julia.search((value)=>{
        return (value.price > 15.50) && (value.type === 'otro');
    });
    console.log("Lista de productos con la misma clasificación y precio mayor 15.50");
    console.log(c);
    let d = julia.search((value)=>{
        return (value.price < 45.00) && (value.price > 20.30);
    });
    console.log("Lista de productos con precio mayor a 20.30 y menor a 45.00");
    console.log(d);
    console.log("Número de productos agrupados por su clasificació");
    let e = [];
    e.push(julia.search((value)=>{
        return value.type == "papas";
    }).length);
    e.push(julia.search((value)=>{
        return value.type == "chile";
    }).length);
    e.push(julia.search((value)=>{
        return value.type == "fruta";
    }).length);
    e.push(julia.search((value)=>{
        return value.type == "otro";
    }).length);
    console.log(e);
    //console.log(julia);
}

processLineByLine();