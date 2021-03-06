function updateContactFieldsInViewMode() {
	var contactItems = document.getElementsByClassName("DRlHd");
	for(var i = 0; i < contactItems.length; i++) {
		//custom_field = contactItems[i].getElementsByClassName("JuD4Cc VKOTgd")[0];
		//console.log(contactItems[i]);
		displayField = contactItems[i].getElementsByClassName("VKOTgd")[0].children[0];
		typeField = contactItems[i].getElementsByClassName("VKOTgd")[0].children[1];
		if (typeField.textContent == "  • net.maxstuff.social-google-contacts.mcjava") {
			mcuseruuid = displayField.textContent;
			//https://namemc.com/search?q=f2457b72-a46a-4795-b340-cc0b8b49e794
			displayField.textContent = "Pending";
			typeField.textContent = "  • Minecraft Java Edition";
			fetch("https://api.ashcon.app/mojang/v2/user/"+mcuseruuid).then(response => response.json()).then(data => {
					displayField.innerHTML = "<a href='https://namemc.com/search?q="+mcuseruuid+"'>"+data["username"]+"</a>";
				});
		} else if (typeField.textContent == "  • net.maxstuff.social-google-contacts.instagram") {
			//chrome.runtime.sendMessage({contentScriptQuery: "queryInstagramUsername", userID: "9712378716"}, response => console.log(response));
			instagramid = displayField.textContent;
			displayField.textContent = "Pending";
			typeField.textContent = "  • Instagram";
			chrome.runtime.sendMessage({contentScriptQuery: "queryInstagramUsername", userID: instagramid}, response => {
					displayField.innerHTML = "<a href='https://www.instagram.com/"+response+"'>"+response+"</a>";
				});
		}
	}
}

function addSearchButtons() {
	minecraftJavaEditionSearchButton = document.createElement("button");
	minecraftJavaEditionSearchButton.textContent = "Search Minecraft Java Edition";
	minecraftJavaEditionSearchButton.onclick = searchMinecraftJavaEdition;
	document.getElementsByClassName("gb_Fe")[0].appendChild(minecraftJavaEditionSearchButton);
	
	instagramSearchButton = document.createElement("button");
	instagramSearchButton.textContent = "Search Instagram";
	instagramSearchButton.onclick = searchInstagram;
	document.getElementsByClassName("gb_Fe")[0].appendChild(instagramSearchButton);
	
	document.getElementsByClassName("gb_Te")[0].style.display = "inline-block";
	document.getElementsByClassName("gb_Te")[0].style.width = "70%";
}

function searchMinecraftJavaEdition() {
	userToSearch = document.getElementsByClassName("Ax4B8 ZAGvjd")[0].value;
	try {
		fetch("https://api.ashcon.app/mojang/v2/user/"+userToSearch).then(response => response.json()).then(data => {
			userUUID = data["uuid"];
			searchURL="https://contacts.google.com/search/"+userUUID;
			window.location=searchURL;
		});
	} catch {
		alert("Minecraft Java Edition username \""+userToSearch+"\" does not exist!");
	}
}

function searchInstagram() {
	userToSearch = document.getElementsByClassName("Ax4B8 ZAGvjd")[0].value;
	var instagramUserID = null;
	chrome.runtime.sendMessage({contentScriptQuery: "queryInstagramUserID", username: userToSearch}, response => {
		instagramUserID = response;
		if (instagramUserID != null) {
			searchURL="https://contacts.google.com/search/"+instagramUserID;
			window.location=searchURL;
		} else {
			alert("Instagram username \""+userToSearch+"\" does not exist!");
		}
	});
}

if (window.location.host == "contacts.google.com") {
	setInterval(updateContactFieldsInViewMode,500);
	document.onload = setTimeout(addSearchButtons,1000);
}