
const inquirer = require("inquirer");

const mysql = require("mysql");

const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function(err){
    if(err){
        console.error("error connecting: " +err);
    }
    createItems();
})


function createItems() {
    connection.query("SELECT * FROM productions ", (err, res) => {
        if (err) throw err;
        else console.table(res);
        promptDisplay(res);
    });
}




function promptDisplay(res) {


    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "Which product ID number would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

        // {
        //     name: "quantity",
        //     type: "input",
        //     message: "How many would you like to buy?",
        //     validate: function (value) {
        //         if (isNaN(value) === false) {
        //             return true;
        //         }
        //         return false;
        //     }
        // },



        //});
    ]).then(function(val){
        var choiceId = parseInt(val.choice);
        var product = checkInventory(choiceId,res);
        
        if(product){
            promptCustomerForQuanity(product);
        }
        else{
            console.log("\n The item is not in the inventory");
        }
    })
    function checkInventory(choiceId, inventory){
        console.log("inside checkInvetory function")
        for(var i=0; i < res.length; i++){
            if(res[i].item_id === choiceId){
                console.log("inventory: Item #"+res[i].item_id);
                return res[i];
            }
        }
        return null;
    }

function promptCustomerForQuanity(product){
    inquirer.prompt([
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(val){
        var quantity = parseInt(val.quantity);
        if(quantity > product.stock_quantity){
            console.log("\n Insufficent Quantity, pick another amount please.");
            promptCustomerForQuanity(product)
        }
        else{
            makePurchase(product, quantity);
        }


    })

}

function makePurchase(product, quantity){
    connection.query("UPDATE productions SET stock_quantity = stock_quantity - ?  WHERE ?",


                [

                    quantity 
                    ,

                    { item_id: product.item_id }

                ],
                function(err, res){
                    console.log("\n Successfull purchased Item #" + quantity + "\n This cost $" + product.price +" each"
                    + "\n Your total is: $" + quantity * product.price + "\n Thank you for shopping at Bamazon®" + "\n \n \n" );
                    createItems();
                }


            )
}

    



//         .then(
//             //check quantity()
//             //if/else
            
//             //if
            
//             function (user_response) {
//             connection.query("UPDATE productions SET stock_quantity = stock_quantity - ?  WHERE ?",


//                 [

//                     user_response.quantity 
//                     ,

//                     { item_id: user_response.choice }

//                 ],


//             )
          
//             checkForInventory();
//         }
//         //else run prompt again
//         )


// }


// //promptDisplay();

}

