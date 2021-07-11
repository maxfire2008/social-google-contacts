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
		}
	}
}
document.onload = setTimeout(updateContactFieldsInViewMode,1000);
//document.onload = updateContactFieldsInViewMode();