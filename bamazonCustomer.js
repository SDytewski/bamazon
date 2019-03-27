
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


function createItems() {
    connection.query("SELECT * FROM productions ", (err, res) => {
        if (err) throw err;
        else console.table(res);
        promptDisplay();
    });
}

createItems();

function promptDisplay() {


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


        },

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
        },



        //});
    ]).then(function (user_response) {
        connection.query("UPDATE productions SET stock_quantity = stock_quantity - ?  WHERE ?",
        
      
   

        [ 
            
          user_response.quantity
            ,
            
          {   item_id : user_response.choice }
            
          ],

     
      
        
        )
        

    })

}
        

//promptDisplay();


