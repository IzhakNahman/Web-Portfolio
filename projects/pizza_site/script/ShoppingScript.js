	
		function displayForm2(){
			document.getElementById("form2").style.display = "block";
		}
		function displayForm3(){
			document.getElementById("form3").style.display = "block";
		}
		
		
			var pizzaPriceValue=0;
			var drinksPriceValue=0;
			var pizzaAddsValue=0;
			var pizzaAddsCounter=0;
			var total=0;
			var totalAfterDiscount=0;
			var discountNum=0;
			
			function drinksPriceFunction(){
				//alert("pizzaPriceFunction");
				console.log("drinksPriceFunction");
				
				if(document.getElementById("drinkSize1").checked){
					document.getElementById("drinksPrice").innerHTML = "&nbsp; (1$)";
					drinksPriceValue=1;
				}
				if(document.getElementById("drinkSize2").checked){
					document.getElementById("drinksPrice").innerHTML = "&nbsp; (2$)";
					drinksPriceValue=2;
				}

				
				total=pizzaPriceValue+pizzaAddsValue+drinksPriceValue;
				totalShow();
			}
			
			function pizzaPriceFunction(){
				//alert("pizzaPriceFunction");
				console.log("pizzaPriceFunction");
				
				if(document.getElementById("pizzaXL").checked){
					document.getElementById("pizzaPrice").innerHTML = "&nbsp; (20$)";
					pizzaPriceValue=20;
				}
				if(document.getElementById("pizzaL").checked){
					document.getElementById("pizzaPrice").innerHTML = "&nbsp; (16$)";
					pizzaPriceValue=16;
				}
				if(document.getElementById("pizzaM").checked){
					document.getElementById("pizzaPrice").innerHTML = "&nbsp; (13$)";
					pizzaPriceValue=13;
				}
				if(document.getElementById("pizzaXS").checked){
					document.getElementById("pizzaPrice").innerHTML = "&nbsp; (11$)";
					pizzaPriceValue=11;
				}
				
				total=pizzaPriceValue+pizzaAddsValue+drinksPriceValue;
				totalShow();
			}
			function totalShow(){
				if(discountNum>0){
					document.getElementById("totalPrice").innerHTML = "Total: &nbsp;"+total+"$";
					document.getElementById("totalPrice").classList.add('myClass');
					//totalAfterDiscount=(Number)totalAfterDiscount;
					document.getElementById("totalPriceAfterDiscount").innerHTML = "Total after Discount: &nbsp;"+(Number(totalAfterDiscount).toFixed(2))+"$";
					
				}else
					document.getElementById("totalPrice").innerHTML = "Total: &nbsp;"+total+"$";
			}
			
			function checkCode(){
				var num=document.getElementById("discountNumber").value;
				
				if(num=="12345" || num=="54321" ){
					if(num=="12345"){
						discountNum=0.2;
					}
					if(num=="54321"){
						discountNum=0.1;
					}
					
					totalAfterDiscount=totalAfterDiscount=total*(1-discountNum);
					totalShow();
					
					
				}
				
			}
			
			function pizzaAddsFunction(){
				console.log("pizzaAddsFunction");
				var num=0;
				pizzaAddsCounter=0;
				if(document.getElementById("addOlives").checked){
					num+=2;
					pizzaAddsCounter++;
				}
				if(document.getElementById("addMushrooms").checked){
					num+=2;
					pizzaAddsCounter++;
				}
				if(document.getElementById("addCorn").checked){
					num+=2;
					pizzaAddsCounter++;
				}
				if(document.getElementById("addOnion").checked){
					num+=2;
					pizzaAddsCounter++;
				}
					
					document.getElementById("addsPrice").innerHTML = "&nbsp; ("+num+"$)";
					pizzaAddsValue=num;
					total=pizzaPriceValue+pizzaAddsValue+drinksPriceValue;
					
					totalShow();
			}
			